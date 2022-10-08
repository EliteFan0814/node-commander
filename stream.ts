import fs from "fs";
const stream = fs.createWriteStream("./big_file.txt");
for (let i = 0; i < 10000; i++) {
  stream.write(`这是第${i + 1}行，接着写\n`, "utf-8");
}
stream.end();
console.log("done");
