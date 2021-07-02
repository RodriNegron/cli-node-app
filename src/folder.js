const File = require("./file");

class Folder {
  constructor(name) {
    this.name = name;
    this.files = [];
  }

  createDirectory(name) {
    let newDirectory = new Folder(name);
    this.files.push(newDirectory); 
  }

  findIndex(targetDirectory) {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name == targetDirectory) {
        return i;
      }
    }
  }

  changeDirectory(targetDirectory) {
    targetDirectory = this.files[this.findIndex(targetDirectory)];
    return targetDirectory;
  }

  createFile(name, content) {
    let newFile = new File(name, content);
    this.files.push(newFile);
  }

  showFile(fileName) {
    return this.files.find((file) => file.name === fileName);
  }

  showMeta(fileName) {
    return this.files.find((file) => file.name === fileName);
  }

  listDirectory() {
    this.files.forEach((file) => {
      console.log(file.name);
    });
  }

  delete(fileName) {
    return this.files.filter((file) => file.name != fileName);
  }

  //TODO
  moveBack(path) {
    if(path.length > 1){
      path.pop();
      return path;
    } else {
      return console.log("you can not go backwards")
    }
  }
}

module.exports = Folder;
