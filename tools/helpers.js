const fs = require("fs");
const path = require("path");

function writeFile(file, data) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(file, data);
  console.log("WRITED:", file);
}

function makeDirOnce(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function format(string) {
  return JSON.stringify(string, null, "  ");
}

function evalFormat(string, key = "__") {
  return new Function(`${string}; return JSON.stringify(${key}, null, "  ")`)();
}

module.exports = { writeFile, makeDirOnce, format, evalFormat };
