import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const users = [
  { id: 1, name: "Jhon Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jimn Doe" },
];

//f/ Middlewear

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next(req, res);
};

const createUserHandler = (req, res) => {
  let body = '';
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.statusCode = 201;
      res.write(JSON.stringify(newUser));
      res.end();

    } catch (error) {
      console.log('error handling post request for new user');
      res.statusCode = 400
      res.write(JSON.stringify({'error': 'post new user unsuccessful'}))
    }
  });
};

const requestListener = function (req, res) {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-type", "application/json");
  if (url === "/api/users" && method === "GET") {
    res.write(JSON.stringify(users));
  } else if (url === "/api/users" && method === "POST") {
    createUserHandler(req, res);
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ error: "Page not found" }));
  }
  res.end();
};

//* SERVER /////////////////////////////////
const server = createServer((req, res) => {
  logger(req, res, requestListener);
});

server.listen(PORT, () => console.log("server up and running"));
