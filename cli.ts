import { Command } from "commander";
import { add } from "./index";
const program = new Command();
program.name("任务清单").description("一个简单的任务清单。").version("0.0.1");
program.option("-l,--list", "列出所有任务");

program
  .command("clone <source> [destination]")
  .description("clone a repository into a newly created directory")
  .action((source, destination) => {
    console.log(source);
    console.log(destination);
  });

program
  .command("clear")
  .description("clear all tasks")
  .action((source, destination) => {
    console.log(source);
  });
program
  .command("add <source...>")
  .description("添加一个任务")
  .action((source, destination) => {
    console.log(source);
    console.log(destination);

    add(source);
  });
program.parse(process.argv);
