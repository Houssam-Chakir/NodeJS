// import fs from 'fs'

// fs.readFile('./message.txt', 'utf8', (error, data) => {
//   if (error) throw error
//     console.log(data);
// })

import fs from "fs/promises";

const readFile = async function () {
  try {
    const data = await fs.readFile("./message.txt", "utf8");
    console.log("data: ", data);
  } catch (error) {
    console.log("error: ", error);
  }
};

const writeFile = async function () {
  try {
    fs.writeFile("./message.txt", "writeFile in action");
    console.log("done");
  } catch (error) {
    console.log("error: ", error);
  }
};

const appendFile = async function () {
  try {
    fs.appendFile("./message.txt", "\n appendFile in action");
    console.log("done");
  } catch (error) {
    console.log("error: ", error);
  }
};

writeFile();
appendFile();
readFile();
