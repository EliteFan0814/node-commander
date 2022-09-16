import * as http from "http";
const server = http.createServer();
server.on("request", (request, response) => {
  console.log(Object.keys(request));
  const { method, url, headers } = request;
  console.log(headers);

  const arr: Uint8Array[] = [];
  request.on("data", (chunk) => {
    arr.push(chunk);
  });
  request.on("end", () => {
    const body = Buffer.concat(arr).toString();
    console.log("body", body);
    response.end("hi");
  });
  response.setHeader("x-fpc", "hahaha");
  response.setHeader("Content-Type", "image/png");
  response.write("qweqeqeqe");
  response.end();
});

server.listen(8888);
