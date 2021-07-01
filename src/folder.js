const File = require("./file");
class Folder {

    constructor (name) {
        this.name = name;
        this.files = [];
    }

    createDirectory(name){
    let newDirectory = new Folder(name);
    this.files.push(newDirectory);   //crea una nueva carpeta desde la carpeta donde se llama
    }
    
    findIndex(targetDirectory){
        for (let i = 0; i < this.files.length; i++) {
            if(this.files[i].name == targetDirectory){
                return i;
            }
        }
    }

    changeDirectory(targetDirectory){
        targetDirectory = this.files[this.findIndex(targetDirectory)]
        return targetDirectory;
    }

    createFile(name, content){
        let newFile = new File(name, content);
        this.files.push(newFile);
    }

}


module.exports= Folder