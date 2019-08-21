#!/usr/bin/env node

const program = require('commander');
const generate = require('../src/main');

program
.version('1.2.0','-v, --version', 'CLI Version')
.usage('[path...] [options]')
.description(
  'A CLI to generate PlantUML compatible UML diagrams for Ember Components'
)
.option('-o, --out <path>', 'Store PlantUML definitions (.pu files) in <path>')
.option('--pods', 'Enable support for POD style components')
.option('--ts', 'Enable support for Typescript components')
.arguments('<path>')
.parse(process.argv);

if(program.args.length > 0) {
  const options = {
    pods: program.pods,
    ts: program.ts
  };
  generate(program.args[0], program.out, options)
} else {
  program.help();
}


