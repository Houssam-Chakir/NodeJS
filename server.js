import http from "http";
import fs from "fs";
import genRandomNum from "./utils.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

console.log(genRandomNum());

function requestListener(req, res) {
  console.log(req);

  const url = req.url;
  const method = req.method;

  try {
    if (method === "GET") {
      if (url === "/404") {
        // res.setHeader('Content-Type', 'text/plain')
        // res.statusCode = 404
        res.writeHead(404, { "Content-Type": "application/json" });

        res.write(
          JSON.stringify({
            message: "error handling your request!!!!!",
          })
        );
        res.end();
      } else if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <form action='/message' method='POST'>
            <h1>Write a message</h1>
            <input type='text' name='msg'>
            <button type='submit'>Send</button>

          </form>`);
        return res.end();
      } else if (url === "/message" && method === "POST") {
        fs.writeFileSync("message.js", "test");

        res.write(`
          <h1>message send</h1>
          <form action='/send' method='GET'>
            <p>${req.msg}</p>
            <button type='submit'>Go</button>
          </form>
          `);
        res.end();
      } else {
        throw new Error("Method not allowed");
      }
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });

    res.write(
      JSON.stringify({
        message: `error handling your request: ${error}`,
      })
    );
    res.end();
  }
}

const server = http.createServer(requestListener);

server.listen(PORT, () => console.log("server up and running"));
