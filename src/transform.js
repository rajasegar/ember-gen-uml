const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const debug = require('debug')('ember-gen-uml');

function transform(code) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: [['decorators-legacy', { decoratorsBeforeExport: false }]],
  });

  let umlData = '';

  let memberDefs = [];
  let serviceDefs = [];
  let extendDefs = [];
  let className = '';
  traverse(ast, {
    ExportDefaultDeclaration(p) {
      debugger;
      if (p.node.declaration.type === 'ClassDeclaration') {
        className = p.node.declaration.id.name;

        // Disabling extensions since it is verbose
        //const superClass = p.node.declaration.superClass.name;
        //let extension = `${superClass} <|-- ${className}`;
        //extendDefs.push(extension);

        let props = p.node.declaration.body.body;

        memberDefs = props
          .filter(prop => !prop.decorators)
          .map(prop => {
            let keyName = prop.key.name;
            const scope = keyName.startsWith('_') ? '-' : '+';
            if (t.isClassProperty(prop)) {
              return `${scope}${keyName}`;
            } else if (t.isClassMethod(prop)) {
              return `${scope}${keyName}()`;
            }
          });

        props.forEach(prop => {
          if (prop.decorators) {
            const [decorator] = prop.decorators;
            if (decorator.expression.type === 'Identifier') {
              switch (decorator.expression.name) {
                case 'service':
                  {
                    let serviceDef = `class ${prop.key.name} << (S, #FF7700) >>\n`;
                    serviceDef += `${className} ..> ${prop.key.name} : service`;
                    serviceDefs.push(serviceDef);
                  }
                  break;

                case 'attr':
                  memberDefs.push(`+${prop.key.name}`);
                  break;

                default:
                  debug('Unknown decorator: ', decorator.expression.name);
              }
            } else {
              const decoratorName = decorator.expression.callee.name;
              const argValue = decorator.expression.arguments[0].value;
              switch (decoratorName) {
                case 'attr':
                  memberDefs.push(`+${prop.key.name}: ${argValue}`);
                  break;

                case 'belongsTo':
                  {
                    let aggregation = `${argValue} o-- "belongsTo" ${className} `;
                    extendDefs.push(aggregation);
                    memberDefs.push(`+${prop.key.name}`);
                  }
                  break;

                case 'hasMany':
                  {
                    let composition = `${argValue} *-- "hasMany" ${className} `;
                    extendDefs.push(composition);
                    memberDefs.push(`+${prop.key.name}`);
                  }
                  break;

                default:
                  debug('Unknown decorator: ', decorator.expression.callee.name);
              }
            }
          }
        });
      }
    },
  });
  umlData = `
@startuml
${extendDefs.length > 0 ? extendDefs.join('\n') : ''}
${serviceDefs.length > 0 ? serviceDefs.join('\n') : ''}
class ${className} {
  ${memberDefs.join('\n  ')}
}

@enduml`;

  return umlData;
}

module.exports = transform;
