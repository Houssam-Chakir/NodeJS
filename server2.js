import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const users = [
  { id: 1, name: "Jhon Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jimn Doe" },
];

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-type", "application/json");
  if (url === "/api/users" && method === "GET") {
    res.write(JSON.stringify(users));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ error: "Page not found" }));
  }
  res.end();
});

server.listen(PORT, () => console.log("server up and running"));
