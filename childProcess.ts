import childProcess from "child_process";
const { exec } = childProcess;

const streams = exec("ls");

// process.stdout.pipe(streams.stdout);
// console.log(streams.stdout);

streams.stdout?.pipe(process.stdout);
