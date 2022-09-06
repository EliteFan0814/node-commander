import { homedir } from "os";
import path from "path";
import fs from "fs";
const dbPath = path.join(homedir(), ".todo");

export const read = (path = dbPath) => {
  return new Promise((resolve, reject) => {
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
export const add = (title: string) => {
  fs.readFile(dbPath, { flag: "a+" }, (err, data) => {
    if (err) throw err;
    let list;
    try {
      list = JSON.parse(data.toString());
    } catch (dataErr) {
      list = [];
    }
    const task = {
      title,
      done: false,
    };
    list.push(task);
    const string = JSON.stringify(list);
    fs.writeFile(dbPath, string + "\n", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
};
