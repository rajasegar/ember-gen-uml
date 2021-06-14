const t = require('@babel/types');
const debug = require('debug')('ember-gen-uml');

function transform(node, name) {

  let memberDefs = [];
  let serviceDefs = [];
  let extendDefs = [];
  const componentName = node.declaration.callee.object.name || name;

  const args = node.declaration.arguments;

  if (args) {
    const len = args.length;

    // extending other components or mixins
    if (len > 1) {
      const parentClasses = args.slice(0, len - 1);
      parentClasses.forEach(parent => {
        let extension = `${parent.name} <|-- ${componentName}`;
        extendDefs.push(extension);
      });
    }

    let props = args[len - 1].properties || [];

    if(node.declaration.callee.object.name === 'Component') {
    memberDefs = props
      .map(prop => {
        let keyName = prop.key.type === 'StringLiteral' ? prop.key.value : prop.key.name;
        const scope = keyName.startsWith('_') ? '-' : '+';
        if (t.isObjectProperty(prop)) {
          return `${scope}${keyName}`;
        } else if (t.isObjectMethod(prop)) {
          return `${scope}${keyName}()`;
        }
      });
    }

    props.forEach(prop => {
      if (
        prop.value &&
        prop.value.type === 'CallExpression' &&
        prop.value.callee.name === 'service'
      ) {
        let serviceDef = `class ${prop.key.name} << (S, #FF7700) >>\n`;
        serviceDef += `${componentName} ..> ${prop.key.name} : service`;
        serviceDefs.push(serviceDef);
      }

      const isValueCallExpression = prop.value && prop.value.type === 'CallExpression';
      const isDSMethod = isValueCallExpression && prop.value.callee.object && prop.value.callee.object.name === 'DS';

      if( isValueCallExpression ) {

        const args = prop.value.arguments;
        const argValue = args[0] && args[0].value;
        const propValueName = isDSMethod ? prop.value.callee.property.name : prop.value.callee.name;
        switch (propValueName) {
          case 'attr':
            if(argValue) {
              memberDefs.push(`+${prop.key.name}: ${argValue}`);
            } else {
              memberDefs.push(`+${prop.key.name}`);
            }
            break;

          case 'belongsTo':
            {
              let aggregation = `${argValue} o-- "belongsTo" ${componentName} `;
              extendDefs.push(aggregation);
              memberDefs.push(`+${prop.key.name}`);
            }
            break;

          case 'hasMany':
            {
              let composition = `${argValue} *-- "hasMany" ${componentName} `;
              extendDefs.push(composition);
              memberDefs.push(`+${prop.key.name}`);
            }
            break;

          default:
            debug('Unknown DS method: ', propValueName);
        }
      }

    });
  }

  return {
    className: componentName,
    memberDefs,
    serviceDefs,
    extendDefs,
  };
}

module.exports = transform;
