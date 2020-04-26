#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const inquirer = require('inquirer')
const {createComponent} = require('./lib/commands/create-component')
const createModule = require('./lib/commands/create-module')
const init = require('./lib/commands/init')
const build = require('./lib/commands/build')

function version() {
  const packagejson = require('./package.json');
  console.log(packagejson.version);
}

program.command('version')
        .alias('v')
        .description('Displays dy-foundation-cli version')
        .action(() => {
          version()
        })
        
program.command('create-component <name>')
        .alias('cr')
        .option('-s, --store', 'Connect component to redux store')
        .option('-v, --view', 'Create a new view')
        .description('Creates a new component')
        .action((name, args) => {
          createComponent(name, args.view)
        })

program.command('create-module <name>')
        .alias('cm')
        .description('Creates a new module')
        .action((name) => {
          createModule(name)
        })

program.command('init <name>')
        .alias('i')
        .description('Initializes a new foundation project')
        .action((name) => {
          init(name)
        })

program.command('build <version>')
        .alias('b')
        .description('Creates a new build of a foundation based project')
        .action((version) => {
          try {
            build(version)
          } catch (error) {
            inquirer.prompt([{type: 'list', name: 'version', message: 'Please select a version type', choices: ['major', 'minor', 'patch']}]).then((answers) => {
              build(answers.version)
            })
          }
        })
program.parse(process.argv);