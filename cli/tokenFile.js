const fs = require('fs');
const path = require('path');

const tokenFilePath = path.join("C:/Users/SAI VARSHITH/Desktop/CLI Based Key Value Store/cli", 'token.txt');

function setToken(token) {
  fs.writeFileSync("./token.txt", token, 'utf-8');
}

function getToken() {
  if (fs.existsSync("./token.txt")) {
    return fs.readFileSync("./token.txt", 'utf-8');
  }
  return null;
}

function clearToken() {
  fs.unlinkSync("./token.txt");
}

exports.setToken = setToken
exports.getToken = getToken
exports.clearToken = clearToken