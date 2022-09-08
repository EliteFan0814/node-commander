import { homedir } from "os";
const path = require("path");
import * as fs from "fs";
import inquirer from "inquirer";
import { type TodoList, type TodoItem } from "types/index";
const dbPath = path.join(homedir(), ".todo");
// 重置文件
const reset = (path = dbPath) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(path, "[]", (err) => {
      if (err) return reject(err);
      resolve();
      console.log("清空成功！");
    });
  });
};
// 读取文件
const read = (path = dbPath) => {
  return new Promise<TodoList>((resolve, reject) => {
    fs.readFile(path, { flag: "a+" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        let list: TodoList;
        try {
          list = JSON.parse(data.toString());
        } catch (dataErr) {
          list = [];
        }
        resolve(list);
      }
    });
  });
};
// 写入文件
const write = (list: TodoList, path = dbPath) => {
  return new Promise<void>((resolve, reject) => {
    const string = JSON.stringify(list);
    fs.writeFile(path, string + "\n", async (err) => {
      if (err) return reject(err);
      resolve();
      console.log("写入成功！");
      // const list = await read(dbPath);
      // console.log(list);
    });
  });
};
const testlist = async () => {
  const list: TodoList = await read(dbPath);
  inquirer
    .prompt({
      type: "list",
      name: "taskValue",
      message: "请选择你想操作的任务?",
      choices: [
        { name: "退出", value: "-1" },
        ...list.map((item, index) => {
          return {
            name: `${item.done ? "[x]" : "[_]"} ${index + 1} - ${item.title}`,
            value: index,
          };
        }),
        { name: "创建新任务", value: "-2" },
      ],
    })
    .then((answers) => {
      const taskIndex = answers.taskValue;
      if (taskIndex === "-1") {
        // 退出
      } else if (taskIndex === "-2") {
        // 创建新任务
        inquirer
          .prompt({
            type: "input",
            name: "title",
            message: "请输入新的任务名",
          })
          .then((answers) => {
            list.push({ title: answers.title, done: false });
            write(list);
          });
      } else {
        inquirer
          .prompt({
            type: "list",
            name: "action",
            message: "请选择要执行的操作",
            choices: [
              { name: "退出", value: "quit" },
              { name: "标记为完成", value: "markAsDone" },
              { name: "标记为未完成", value: "markAsUnDone" },
              { name: "修改", value: "edit" },
              { name: "删除", value: "delete" },
            ],
          })
          .then((answers2) => {
            switch (answers2.action) {
              case "quit":
                break;
              case "markAsDone":
                list[taskIndex].done = true;
                write(list);
                break;
              case "markAsUnDone":
                list[taskIndex].done = false;
                write(list);
                break;
              case "edit":
                inquirer
                  .prompt({
                    type: "input",
                    name: "title",
                    message: "请输入新的任务名",
                    default: list[taskIndex].title,
                  })
                  .then((answers3) => {
                    list[taskIndex].title = answers3.title;
                    write(list);
                  });
                break;
              case "delete":
                list.splice(taskIndex, 1);
                write(list);
                break;
              default:
            }
          });
      }
    });
};

export const add = async (title: string) => {
  try {
    const list = await read(dbPath);
    list.push({ title, done: false });
    await write(list, dbPath);
  } catch (err) {
    console.log("添加失败");
  }
};
export const clear = async () => {
  try {
    await reset(dbPath);
  } catch (err) {
    console.log("清空失败！");
  }
};
export const show = async () => {
  try {
    const list: TodoList = await read(dbPath);
    if (list.length > 0) {
      list.map((item, index) => {
        console.log(
          `${item.done ? "[x]" : "[_]"} ${index + 1} - ${item.title}`
        );
      });
    } else {
      console.log(`当前暂无任务`);
    }
  } catch (err) {
    console.log("加载失败");
  }
};

export default {
  add,
  clear,
  testlist,
  show,
};
