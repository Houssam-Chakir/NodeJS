import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
import genRandomNum from "./utils.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

//Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(genRandomNum());

async function requestListener(req, res) {
  console.log(req);

  const url = req.url;
  const method = req.method;

  try {
    if (method === "GET") {
      let filepath;

      if (url === "/404") {
        filepath = path.join(__dirname, "public", "404.html");
      } else if (url === "/") {
        filepath = path.join(__dirname, "public", "index.html");
      } else if (url === "/about") {
        filepath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Page loading error");
      }

      const data = await fs.readFile(filepath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
      
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });

    res.write(
      JSON.stringify({
        message: `error handling your request: ${error}`,
      })
    );
    return res.end();
  }
}

const server = http.createServer(requestListener);

server.listen(PORT, () => console.log("server up and running"));
