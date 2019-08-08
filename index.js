const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

const fs = require('fs');
const path = require('path');

fs.readdir('components', function(err, files) {
  //console.log(files);
  files.filter(f => f !== '.DS_Store')
    .forEach(f => {
      const fileName = `components/${f}`;
      //console.log(fileName);
      const outFile = `output/${path.basename(fileName,'.js')}.pum`;
      const capitalize = n => n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
        const componentName = capitalize(path.basename(fileName, '.js'));
      //console.log(outFile);
      const code = fs.readFileSync(`components/${f}`, 'utf-8');
      const ast = parser.parse(code, {
        sourceType: "module"
      });

      traverse(ast, {
        ExportDefaultDeclaration(path) {

          if(t.isExportDefaultDeclaration(path.node), {
            declaration: {
              callee: {
                object: { name: "Component" },
                property: { name: "extend" }
              }
            }
          }) {
            const args = path.node.declaration.arguments;
            //console.log(path.node.declaration.arguments);
            const len = args.length;
            let props = args[len - 1].properties;
            //console.log(props);
            //let props = path.node.declaration.arguments[0].properties;

            let memberDefs = props.map(p => { 
              if(t.isObjectProperty(p)) {
                return `+${p.key.name}`;
              } else if(t.isObjectMethod(p)) {
                return `+${p.key.name}()`;
              }
            });

            let umlData = `
      @startuml
      class ${componentName} {
      ${memberDefs.join('\n')}
      }
      @enduml`;

            //console.log(umlData);

            const data = new Uint8Array(Buffer.from(umlData));
            fs.writeFile(outFile, data, (err) => {
              if (err) throw err;
              console.log(`The file: ${outFile} has been saved!`);
            });

          }
        }
      });


    });
});





