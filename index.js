const { Command } = require('commander')
const program = new Command()
program.name('吃啥').description('饭点吃啥是一个世界性难题，这个命令行工具用来解决这个世界性难题').version('0.0.1')

program.option('-l,--list', '列出所有菜单').option('-r,--recent', '最近吃的饭').option('-b,--ban', '拉黑的饭').option('-a,--add <dishes>', '添加新菜')

program.parse(process.argv)
const options = program.opts()
if (options.recent) console.log(options)
if (options.Add) console.log(222222)
