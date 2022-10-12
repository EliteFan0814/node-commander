// import { Writable } from "stream";
// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk);
//     console.log(chunk.toString());
//     callback();
//   },
// });

// process.stdin.pipe(outStream);

// import { Readable } from "stream";
// const inStream = new Readable({
//   read(size) {
//     this.push(String.fromCharCode(this.currentCharCode++));
//     if (this.currentCharCode > 90) {
//       this.push(null);
//     }
//   },
// });
// inStream.currentCharCode = 65;
// inStream.pipe(process.stdout);

import { Transform } from "stream";

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
