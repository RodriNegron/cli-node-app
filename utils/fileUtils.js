const fs = require("fs");

function writeFile(fileName, files, users) {
  fs.writeFile( `${fileName}.json`, JSON.stringify([files, users], null, 2), "utf8", function (err) {
      if (err) {
        console.log("Error while writing file.");
        return console.log(err);
      }
    }
  );
}

module.exports = writeFile;
