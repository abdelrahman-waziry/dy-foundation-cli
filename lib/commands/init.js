const chalk = require('chalk');
const shell = require('shelljs')
const ora = require('ora');

module.exports = function(name){
    console.log(chalk.bgBlue(`Your project is being initialized, that might take a couple of minutes, go and grap a coffee`))
    const cloneLoading = ora(`Cloning project into ${name}`).start()
    shell.exec(`git clone https://DigitalyardTeam@dev.azure.com/DigitalyardTeam/Foundation%20Components/_git/ReactComponent ${name}`, {silent: true}, (code, stdout, stderr) => {
        cloneLoading.succeed(`Cloned project into ${name}`)
        shell.cd(name)
        const installLoading = ora('Installing required dependencies').start()
        shell.exec('npm install', {}, () => {
            installLoading.succeed('Installed required dependencies')
            console.log(chalk.yellow('Your project has been successfully initialized'))
        })
    })
}