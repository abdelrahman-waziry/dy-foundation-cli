const classStub = require('../stubs/classComponent')
const functionStub = require('../stubs/functionComponent')
const inquirer = require('inquirer')
const createModule = require('../commands/create-module')
const {createDir, createFile, getDirectories} = require('../utils')
const path = './src/modules'

module.exports = {
    createComponent: function (name, isView){
        inquirer.prompt([
          {type: 'list', name: 'type', message: 'Please select a component type', choices: ['Class Component', 'Function Component']},
          {type: 'rawlist', name: 'module', message: 'select a module', choices: getDirectories().concat('Create new module...')}
        ]).then((answers) => {
          var template = answers.type === 'Class Component' ? classStub(name) : functionStub(name)
          if(answers.module === 'Create new module...'){
            inquirer.prompt([
              {type: 'input', name: 'new_module', message: 'Enter new module name'}
            ]).then((answers) => {
              createModule(answers.new_module)
            })
          }
          else {
            let componentDirPath = `${path}/${answers.module}/${isView ? 'views' : 'components'}/${name}`
            createDir(componentDirPath, () => {
              let componentPath = `${path}/${answers.module}/${isView ? 'views' : 'components'}/${name}/${name}.js`
              createFile(componentPath, template)
            })
          }
        }).then(() => {
          console.log('Component created successfully.')
        })
    }
}