const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const walkSync = require('walk-sync');

const fs = require('fs');
const path = require('path');

// options
const pods = false;
//const inputDir = '/Users/user/Code/helpkit-ember/app/components';
const inputDir = 'components';
const outDir = 'output';


const paths = walkSync(inputDir, { globs: ['**/*.js'], directories: false});

paths.forEach(f => {
  let outFile = '';

  if(pods) {
    outFile = `${outDir}/${path.dirname(f)}/component.pu`;
  } else {
    if(path.dirname(f) === '.') {
    outFile = `${outDir}/${path.basename(f,'.js')}.pu`;
    } else {

    outFile = `${outDir}/${path.dirname(f)}/${path.basename(f,'.js')}.pu`;
    }
  }
  console.log(outFile);

  let componentName = '';
  if(pods) {
    componentName = path.dirname(f).toUpperCase();
  } else {
    const capitalize = n => n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
    componentName = capitalize(path.basename(f, '.js'));
  }

  const code = fs.readFileSync(`${inputDir}/${f}`, 'utf-8');
  const ast = parser.parse(code, {
    sourceType: "module"
  });

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
        //console.log(path.node.declaration.arguments);
        const len = args.length;
        let props = args[len - 1].properties;
        //console.log(props);
        //let props = path.node.declaration.arguments[0].properties;

        let memberDefs = props.map(prop => { 
          if(t.isObjectProperty(prop)) {
            return `+${prop.key.name}`;
          } else if(t.isObjectMethod(prop)) {
            return `+${prop.key.name}()`;
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
        fs.mkdir(path.dirname(outFile), { recursive: true }, (err) => {
          if (err) throw err;
          fs.writeFile(outFile, data, (err) => {
            if (err) throw err;
            console.log(`The file: ${outFile} has been saved!`);
          });
        });


      }
    }
  });


});




