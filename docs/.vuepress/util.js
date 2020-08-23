const fs = require("fs");

function getFilesOf(base, directory) {
  let ret = [];

  fs.readdirSync(`${base}/${directory}`).reduce((refineFiles, fileName) => {
    let file = `${directory}/${fileName}`;

    ret.push(file);
  }, []);

  return ret;
}

module.exports = { getFilesOf };
