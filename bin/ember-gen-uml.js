#!/usr/bin/env node

const program = require('commander');

program
.version('1.0.1')
.usage('[path...] [options]')
.description(
  'A CLI to generate PlantUML compatible UML diagrams for Ember Components'
)
.option('-o, --out <path>', 'Store uml assets (.pu files) in <path>')
.option('--pods', 'Enable support for POD style components')
.arguments('<path>')
.parse(process.argv);

const generate = require('../src/main');
generate(program.args[0], program.out, program.pods)


