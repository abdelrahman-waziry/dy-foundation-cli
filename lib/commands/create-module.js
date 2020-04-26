const routes = require('../stubs/routes')
const reducer = require('../stubs/reducer')
const actions = require('../stubs/actions')
const classStub = require('../stubs/classComponent')
const {createDir, createFile, getDirectories} = require('../utils')
const path = './src/modules'

module.exports = function(name){
    let module_base_path = `${path}/${name}`
    createDir(module_base_path, () => {
        createDir(`${module_base_path}/store`, () => {
            createFile(`${module_base_path}/reducer.js`, reducer)
            createFile(`${module_base_path}/actions.js`, actions)
        })
        createDir(`${module_base_path}/components`, () => {})
        createDir(`${module_base_path}/views`, () => {})
        createFile(`${module_base_path}/routes.js`, routes)
        createFile(`${module_base_path}/index.js`, classStub)
        createFile(`${module_base_path}/services.js`, '')
        console.log('Module created successfully.')
    })
}