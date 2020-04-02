#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk');
const shell = require('shelljs')
const ora = require('ora');
const classStub = require('./lib/stubs/classComponent')
const functionStub = require('./lib/stubs/functionComponent')
const path = './src/admin/modules'

function createFile(filePath, template){
  fs.writeFile(filePath, template, function(err) {
    if(err) {
      console.log(err)
      console.log('this project is not supported yet')
    }
    console.log("The file was saved!");
  });
}

function createDir(dirPath, callback) { 
  fs.mkdir(dirPath, function(err){
    if(err){
      console.log('this project is not supported yet')
      return false
    }
    callback()
  })
}

function getDirectories() {
  return fs.readdirSync(path).filter(function (file) {
    return file
  });
}

function version() {
  const packagejson = require('./package.json');
  console.log(packagejson.version);
}

function createComponent(name, isView){
  inquirer.prompt([
    {type: 'list', name: 'type', message: 'Please select a component type', choices: ['Class Component', 'Function Component']},
    {type: 'rawlist', name: 'module', message: 'select a module', choices: getDirectories().concat('Create new module...')}
  ]).then((answers) => {
    var template = answers.type === 'Class Component' ? classStub(name) : functionStub(name)
    if(answers.module === 'Create new module...'){
      inquirer.prompt([
        {type: 'input', name: 'new_module', message: 'Enter new module name'}
      ]).then((answers) => {
        let modulePath = `${path}/${answers.new_module}`
        createDir(modulePath, () => {
          let componentDirPath = `${path}/${answers.new_module}/${isView ? 'views' : 'components'}/${name}`
          createDir(componentDirPath, () => {
            let componentPath = `${path}/${answers.new_module}/${isView ? 'views' : 'components'}/${name}/${name}.js`
            createFile(componentPath, template)
          })
        })
      })
    }
    else {
      let componentDirPath = `${path}/${answers.module}/${isView ? 'views' : 'components'}/${name}`
      createDir(componentDirPath, () => {
        let componentPath = `${path}/${answers.module}/${isView ? 'views' : 'components'}/${name}/${name}.js`
        createFile(componentPath, template)
      })
    }
  })
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

program.command('init <name>')
        .alias('i')
        .description('Initializes a new foundation project')
        .action((name) => {
          console.log(chalk.bgBlue(`Your project is being initialized, that might take a couple of minutes, go and grap a coffee ☕
          `))
          const cloneLoading = ora(`Cloning project into ${name}`).start()
          shell.exec(`git clone https://github.com/abdelrahman-waziry/react-kit.git ${name}`, {silent: true}, (code, stdout, stderr) => {
              cloneLoading.succeed()
              shell.cd(name)
              const installLoading = ora('Installing required dependencies').start()
              shell.exec('npm install', {}, () => {
                installLoading.succeed()
                console.log(chalk.yellow('Your project has been successfully initialized 🚀'))
              })
          })
        })

program.command('build')
        .alias('b')
        .description('Creates a new build of a foundation based project')
        .action(() => {
          shell.exec(`npm run build`)
        })
program.parse(process.argv);