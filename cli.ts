import { Command } from "commander";
import api from "./index";
const program = new Command();
program.name("任务清单").description("一个简单的任务清单。").version("0.0.1");
program.option("-l,--list", "列出所有任务");

program
  .command("clear")
  .description("清空所有任务")
  .action((source, destination) => {
    api.clear();
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
program.parse(process.argv);
