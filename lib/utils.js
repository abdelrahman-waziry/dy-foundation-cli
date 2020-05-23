const fs = require('fs')
const path = './src/modules'

module.exports = {
    createFile: function(filePath, template){
        fs.writeFile(filePath, template, function(err) {
          if(err) {
            console.log(err)
            console.log('this project is not supported yet')
          }
        });
    },
    createDir: function(dirPath, callback) { 
        fs.mkdir(dirPath, function(err){
          if(err){
            console.log('this project is not supported yet')
            return false
          }
          callback()
        })
    },
    getDirectories: function() {
        return fs.readdirSync(path).filter(function (file) {
          return file
        });
    }
}
  