import http from "http";
import fs from "fs";
const server = http.createServer();

server.on("request", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  // 使用流来返回数据，内存占用很少
  const stream = fs.createReadStream("./big_file.txt");
  console.log(stream);
  stream.pipe(response);
  // 一次性返回，内存占用很大
  // fs.readFile("./big_file.txt", (error, data) => {
  //   if (error) throw error;
  //   response.end(data);
  //   console.log("done");
  // });
});

server.listen(8888);
