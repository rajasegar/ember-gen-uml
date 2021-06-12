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
        const superClass = p.node.declaration.superClass.name;

        let extension = `${superClass} <|-- ${className}`;
        extendDefs.push(extension);

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
