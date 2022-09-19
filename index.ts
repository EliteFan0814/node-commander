import { homedir } from "os";
const path = require("path");
// import * as fs from "fs";
import inquirer from "inquirer";
import { TodoList, Actions } from "types/index";
import { reset, read, write } from "./db";
const dbPath = path.join(homedir(), ".todo");
// 创建新任务
const createNewTask = (list: TodoList): void => {
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
};
//
const markAsDone = (list: TodoList, taskIndex: number): void => {
  list[taskIndex].done = true;
  write(list);
};
const markAsUnDone = (list: TodoList, taskIndex: number): void => {
  list[taskIndex].done = false;
  write(list);
};
const deleteTask = (list: TodoList, taskIndex: number): void => {
  list.splice(taskIndex, 1);
  write(list);
};
const editTask = (list: TodoList, taskIndex: number): void => {
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
};
// 操作已有任务
const operateExistTask = (list: TodoList, taskIndex: number) => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "请选择要执行的操作",
      choices: [
        { name: "退出", value: "quit" },
        { name: "标记为完成", value: "markAsDone" },
        { name: "标记为未完成", value: "markAsUnDone" },
        { name: "修改", value: "editTask" },
        { name: "删除", value: "deleteTask" },
      ],
    })
    .then((answers2: { action: string }) => {
      const actions: Actions = {
        markAsDone,
        markAsUnDone,
        editTask,
        deleteTask,
      };
      const action = actions[answers2.action];
      action && action(list, taskIndex);
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
const startTodo = async () => {
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
      const taskIndex = Number(answers.taskValue);
      if (taskIndex === -1) {
        // 退出
      } else if (taskIndex === -2) {
        // 创建新任务
        createNewTask(list);
      } else {
        operateExistTask(list, taskIndex);
      }
    });
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
  startTodo,
  show,
};
