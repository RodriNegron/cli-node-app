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

  createFile(name, content) {
    let newFile = new File(name, content);
    this.files.push(newFile);
  }

  showFile(fileName) {
    let fileToShow;
    this.files.find((file) => {
      if (file.name === fileName && file instanceof File) fileToShow = file;
    });
    fileToShow ? console.log(fileToShow.name) : console.log("Not a file");
  }

  showMeta(fileName) {
    let fileToShow;
    this.files.find((file) => {
      if (file.name === fileName && file instanceof File) fileToShow = file;
    });
    fileToShow ? console.log(fileToShow.meta) : console.log("Not a file");
  }

  listDirectory() {
    this.files.forEach((file) => {
      console.log(file.name);
    });
  }

  delete(fileName) {
    this.files.forEach((file) => {
      file.name === fileName;
      this.files = this.files.filter((file) => file.name != fileName);
    });
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

  //TODO
  moveBack(path) {
    if (path.length > 1) {
      path.pop();
      return path;
    } else {
      return console.log("you can not go backwards");
    }
  }
}

module.exports = Folder;
