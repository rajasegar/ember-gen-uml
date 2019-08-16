const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');


function transform(code, componentName) {


  const ast = parser.parse(code, {
    sourceType: "module"
  });

  let umlData = "";

  traverse(ast, {
    ExportDefaultDeclaration(p) {

      if(t.isExportDefaultDeclaration(p.node), {
        declaration: {
          callee: {
            object: { name: "Component" },
            property: { name: "extend" }
          }
        }
      }) {
        const args = p.node.declaration.arguments;
        let memberDefs = [];
        let serviceDefs = [];
        if(args) {
          const len = args.length;
          let props = args[len - 1].properties || [];

          memberDefs = props.map(prop => { 
            let keyName = prop.key.type === 'StringLiteral' ? prop.key.value : prop.key.name;
            const scope = keyName.startsWith("_") ? "-" : "+";
            if(t.isObjectProperty(prop)) {
              return `${scope}${keyName}`;
            } else if(t.isObjectMethod(prop)) {
              return `${scope}${keyName}()`;
            }
          });

          props.forEach(prop => {
            if(prop.value && prop.value.type === "CallExpression" && prop.value.callee.name === "service") {
              let serviceDef =  `class ${prop.key.name} << (S, #FF7700) >>\n`;
              serviceDef += `${componentName} ..> ${prop.key.name} : service`;
              serviceDefs.push(serviceDef);

            }
          });

        }

        umlData = `
@startuml
${serviceDefs.length > 0 ? serviceDefs.join('\n') : ''}
class ${componentName} {
  ${memberDefs.join('\n  ')}
}

@enduml`;


      }
    }
  });

  return umlData;


}

module.exports = transform;


