import { homedir } from "os";
import path from "path";
import fs from "fs";
import inquirer from "inquirer";

const dbPath = path.join(homedir(), ".todo");

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
  return new Promise<object[]>((resolve, reject) => {
    fs.readFile(path, { flag: "a+" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        let list;
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
const write = (list: object[], path = dbPath) => {
  return new Promise<void>((resolve, reject) => {
    const string = JSON.stringify(list);
    fs.writeFile(path, string + "\n", async (err) => {
      if (err) return reject(err);
      resolve();
      console.log("写入成功！");
      const list = await read(dbPath);
      console.log(list);
    });
  });
};

const testlist = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "theme",
        message: "What do you want to do?",
        choices: [
          "Order a pizza",
          "Make a reservation",
          new inquirer.Separator(),
          "Ask for opening hours",
          {
            name: "Contact support",
            disabled: "Unavailable at this time",
          },
          "Talk to the receptionist",
        ],
      },
      {
        type: "list",
        name: "size",
        message: "What size do you need?",
        choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
        filter(val) {
          return val.toLowerCase();
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));
    });
};
export default {
  add,
  clear,
  testlist,
};
