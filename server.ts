import * as http from "http";
import fs from "fs";
import path from "path";
import url from "url";
const publicDir = path.resolve(__dirname, "public");
const server = http.createServer();
const cacheAge = 60 * 60 * 24 * 15;
server.on("request", (request, response) => {
  const { method, url: route, headers } = request;
  response.setHeader("x-fpc", "hahaha");
  const routeObj = url.parse(route || "");
  const fileName = routeObj.pathname?.substring(1);
  if (method === "GET") {
    fs.readFile(
      path.resolve(publicDir, fileName || "index.html"),
      (error, data) => {
        if (error) {
          console.log(error);
          if (error.errno === -4058) {
            response.statusCode = 404;
            fs.readFile(
              path.resolve(publicDir, "404.html"),
              (error1, data1) => {
                if (error1) {
                  response.end();
                } else {
                  response.end(data1);
                }
              }
            );
          } else if (error.errno === -4068) {
            response.statusCode = 403;
            response.end();
          } else {
            response.statusCode = 500;
            response.end();
          }
        } else {
          response.setHeader("Cache-Control", `public, max-age=${cacheAge}`);
          response.end(data);
        }
      }
    );
  } else if (method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      const res = JSON.parse(body);
      console.log(res);
      if (fileName === "form") {
        if (res.phone.length > 11) {
          response.writeHead(400, {
            "Content-Type": "application/json",
            Trailer: "Content-MD5",
          });
          response.write(JSON.stringify({ code: 1, msg: "手机号格式错误！" }));
          response.end();
        } else {
          response.writeHead(200, {
            "Content-Type": "application/json",
            Trailer: "Content-MD5",
          });
          response.write(JSON.stringify({ code: 0, msg: "提交成功！" }));
          response.end();
        }
      }
    });
  }
});

server.listen(8888);
