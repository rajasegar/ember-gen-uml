const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const debug = require('debug')('ember-gen-uml');
const oldTransform = require('./oldTransform');

function transform(code, componentName) {
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
      debug('Declaration Type: ', p.node.declaration.type);
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
                    // PlantUML throws error if name has a dash
                    const _argValue = argValue.replace('-', '');
                    let aggregation = `${_argValue} o-- "belongsTo" ${className} `;
                    extendDefs.push(aggregation);
                    memberDefs.push(`+${prop.key.name}`);
                  }
                  break;

                case 'hasMany':
                  {
                    // PlantUML throws error if name has a dash
                    const _argValue = argValue.replace('-', '');
                    let composition = `${_argValue} *-- "hasMany" ${className} `;
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
      } else {
        const defs = oldTransform(p.node, componentName);
        memberDefs = defs.memberDefs;
        serviceDefs = defs.serviceDefs;
        extendDefs = defs.extendDefs;
        className = defs.className;
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
