import path from "path";
import url from "url";

const filePath = "./dir1/dir2/file.js";

console.log(path.basename(filePath));
console.log(path.extname(filePath));
console.log(path.dirname(filePath));
console.log(path.parse(filePath));

const __filename = url.fileURLToPath(import.meta.url)
console.log('__filename: ', __filename);
const __dirname = path.dirname(__filename)
console.log('__dirname: ', __dirname);

const filePath2 = path.join(__dirname, 'dir1', 'dir2', 'dir3', 'demo.js')
console.log('filePath2: ', filePath2);

const filePath3 = path.resolve(__dirname, 'dir1', 'dir2', 'dir3', 'demo.js')
console.log('filePath3: ', filePath3);
