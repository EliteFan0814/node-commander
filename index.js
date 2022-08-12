const { Command } = require('commander')
const program = new Command()

program.option('-l,--list', '列出所有菜单').option('-r,--recent', '最近吃的饭').option('-b,--ban', '拉黑的饭')

program.parse()
