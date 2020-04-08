const shell = require('shelljs')

module.exports = function(level){
    shell.exec(`npm version ${level}`)
    shell.exec(`npm run build`)
}