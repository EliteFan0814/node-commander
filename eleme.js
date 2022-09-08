// import { Command } from "commander";
const { Command } = require("commander");
const program = new Command();
program
  .name("吃啥")
  .description("饭点吃啥是一个世界性难题，这个命令行工具用来解决这个世界性难题")
  .version("0.0.1");

function handleAdd(dummyValue, previous) {
  console.log(dummyValue, previous);
  return previous + 1;
}

program
  .option("-l,--list", "列出所有菜单")
  .option("-r,--recent", "最近吃的饭")
  .option("-b,--ban", "拉黑的饭")
  // .option('-a,--add <dishes>', '添加新菜',handleAdd,0)
  .option("-a,--add <dishes>", "添加新菜", handleAdd);
program
  .command("add")
  .argument("<first>", "integer argument")
  .argument("[second]", "integer argument")
  .action((first, second) => {
    console.log(222);
  });
program.parse(process.argv);
const options = program.opts();
if (options.recent) {
  console.log(options);
}
if (options.add) {
  console.log(options);
}
