const ts = require('typescript');
const debug = require('debug')('ember-gen-uml');

const filterKinds = [ts.SyntaxKind.PropertyDeclaration, ts.SyntaxKind.MethodDeclaration];

const kindMap = {};

kindMap[ts.SyntaxKind.BooleanKeyword] = 'Boolean';
kindMap[ts.SyntaxKind.StringKeyword] = 'String';

function transform(fileName, code, componentName) {
  let memberDefs = [];
  let serviceDefs = [];
  let extendDefs = [];

  const ast = ts.createSourceFile(fileName, code, ts.ScriptTarget.ES2015, /*setParentNodes */ true);

  //debug(ast);

  traverse(ast);
  const umlData = `
@startuml
${extendDefs.length > 0 ? extendDefs.join('\n') : ''}
${serviceDefs.length > 0 ? serviceDefs.join('\n') : ''}
class ${componentName} {
  ${memberDefs.join('\n  ')}
}

@enduml`;

  return umlData;

  function traverse(node) {
    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration:
        debug(node.heritageClauses[0].types[0].expression.escapedText);
        if (node.heritageClauses[0]) {
          if (node.heritageClauses[0].types[0]) {
            let _extends = node.heritageClauses[0].types[0].expression.text;

            //let extension =  `${parent.name} <|-- ${componentName}`;
            //extendDefs.push(extension);

            if (_extends === 'Component') {
              node.members
                .filter(prop => {
                  debug('Property name: ', prop.name.text);
                  debug('Property kind: ', prop.kind);
                  return filterKinds.includes(prop.kind);
                })
                .forEach(prop => {
                  let keyName = prop.name.text;
                  let isMethod = prop.kind === ts.SyntaxKind.MethodDeclaration;
                  let isService =
                    prop.decorators && prop.decorators[0].expression.text === 'service';
                  const scope = keyName.startsWith('_') ? '-' : '+';
                  if (isMethod) {
                    memberDefs.push(`${scope}${keyName}()`);
                  } else if (isService) {
                    let serviceDef = `class ${prop.name.text} << (S, #FF7700) >>\n`;
                    serviceDef += `${componentName} ..> ${prop.name.text} : service`;
                    serviceDefs.push(serviceDef);
                  } else {
                    let type = prop.type ? kindMap[prop.type.kind] || 'any' : 'any';
                    memberDefs.push(`${scope}${keyName} : ${type}`);
                  }
                });
            }
          }
        }

        break;
    }
    ts.forEachChild(node, traverse);
  }
}

module.exports = transform;
