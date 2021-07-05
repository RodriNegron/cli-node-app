
class Folder {
  constructor(name, files) {
    this.name = name;
    this.files = files;
  }

  create(name, type, content) {
    let newFile;
    if (name) {
      let createdFile = false;
      this.files.forEach((file) => {
        if (file.name === name) {
          createdFile = true;
        }
      });
      if (!createdFile) {
        content
          ? (newFile = new type(name, content))
          : (newFile = new type(name, []));
        this.files.push(newFile);
      } else {
        console.log("this name already exists in this directory");
      }
    } else {
      console.log("Error: name can not be empty");
    }
  }

  showFile(fileName) {
    let fileToShow;
    this.files.find((file) => {
      if (file.name === fileName) fileToShow = file;
    });
    fileToShow ? console.log(fileToShow.name) : console.log("Not a file");
  }

  showMeta(fileName) {
    let fileToShow;
    this.files.find((file) => {
      if (file.name === fileName && file.meta) fileToShow = file;
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
    if (
      this.files[this.findIndex(targetDirectory)] &&
      this.files[this.findIndex(targetDirectory)].files
    ) {
      return (targetDirectory = this.files[this.findIndex(targetDirectory)]);
    } else {
      console.log(`${targetDirectory} not a valid directory`);
    }
  }
}

module.exports = Folder;
