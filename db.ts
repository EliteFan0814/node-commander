import { homedir } from "os";
import * as fs from "fs";
import path from "path";
import { type TodoList, type Actions } from "types/index";

const dbPath = path.join(homedir(), ".todo");

// 重置文件
export const reset = (path = dbPath) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(path, "[]", (err) => {
      if (err) return reject(err);
      resolve();
      console.log("清空成功！");
    });
  });
};
// 读取文件
export const read = (path = dbPath) => {
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
export const write = (list: TodoList, path = dbPath) => {
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
export default {
  reset,
  read,
  write,
};
