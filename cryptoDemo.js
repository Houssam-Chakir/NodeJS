import crypto from "crypto";

const hash = crypto.createHash("sha256");
hash.update("password1234");
// hash.digest("hex");
console.log(hash.digest("hex"));
