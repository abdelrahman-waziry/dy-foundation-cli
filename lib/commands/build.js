const shell = require('shelljs')
module.exports = function(){
    shell.exec(`npm run build`)
}