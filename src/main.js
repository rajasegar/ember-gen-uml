const walkSync = require('walk-sync');

const transform = require('./transform');

const fs = require('fs');
const path = require('path');

function generate(inputDir, outDir, pods) {

  const paths = walkSync(inputDir, { globs: ['**/*.js'], directories: false});

  console.log(`Processing ${paths.length} files...`);

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

    let componentName = '';
    const capitalize = n => n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
    if(pods) {
      componentName = path.dirname(f).split('/').map(capitalize).join('_');
    } else {
      componentName = capitalize(path.basename(f, '.js'));
    }


    const code = fs.readFileSync(`${inputDir}/${f}`, 'utf-8');
    const umlData = transform(code, componentName);
    const data = new Uint8Array(Buffer.from(umlData));
    fs.mkdir(path.dirname(outFile), { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(outFile, data, (err) => {
        if (err) throw err;
      });
    });

  });

  console.log('All done.');

}

module.exports = generate;


