import { Command } from "commander";
import api from "./index";
const program = new Command();
// 设置任务
program.name("任务清单").description("一个简单的任务清单。").version("0.0.1");

program
  .command("clear")
  .description("清空所有任务")
  .action((source, destination) => {
    api.clear();
  });
program
  .command("show")
  .description("展示所有任务")
  .action((source, destination) => {
    api.show();
  });

program
  .command("add <source>")
  .description("添加一个任务")
  .action((source, destination) => {
    api.add(source);
  });

program
  .command("init")
  .description("初始化")
  .action(() => {
    api.testlist();
  });
program.option("-l,--list", "列出所有任务");
program.parse(process.argv);

// 执行
// 如果存在 command 则就不能单独使用 option了
// const options = program.opts();
// if (options.list) {
//   api.show();
// }
