const fs = require("fs");
import stream from "stream";
const s = fs.createReadStream("./big_file.txt");
console.log(s);
console.log(stream.Readable);
