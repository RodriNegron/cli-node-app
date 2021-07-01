#!/usr/bin/env node

function Folder(name) {
    this.name = name;
    this.files = [];
}

function File(name, content) {
    this.name = name;
    this.content = content;
}

function createFolder(folderName, currentFolder){
    let newFolder = new Folder(folderName);
    currentFolder.files.push(newFolder);
}

function createFile(folder, fileName, fileContent){
    let newFile = new File(fileName,fileContent);
    folder.files.push(newFile);
}

/* function showFile(fileName, folder) {
    folder.folderFiles.forEach(file => {
        if(file.name == fileName){
            console.log(file.name);
        }
    });
}

function showMeta(fileName, array) {
    array.folderFiles.forEach(file => {
        if(file.name == fileName){
            console.log(file);
        }
    });
}

function showFolder(folderName) {
    folderName.folderFiles.forEach(file => {
            console.log(file.name);
    });
} */

//encontrar el indice para acceder al la posicion del array de la carpeta
function findIndex(currentFolder, searchFolder){
    for (let i = 0; i < currentFolder.files.length; i++) {
        if(currentFolder.files[i].name == searchFolder){
            return i;
        }
    }
}

const main = async () => {
    try {
        let root = new Folder("root");
        createFile(root,"file 1", "nuevo content");
        createFile(root,"file 2", "nuevo content");
        createFile(root,"file 3", "nuevo content");
        createFolder("folder2", root);
        //console.log("****************************************** root \n",root)
        //console.log("****************************************** root \n")

        //console.log(findIndex(root,"folder2"))
        createFile(root.files[findIndex(root,"folder2")], "file folder2 1", "contenidoo")
        createFile(root.files[findIndex(root,"folder2")], "file folder2 2", "contenidoaao")
        //console.log("folder 2 \n" ,root.files[findIndex(root,"folder2")])
        let folder2 = root.files[findIndex(root,"folder2")]
        //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        
        //console.log("folder 2 \n" ,folder2)
        createFolder("folder3",folder2)
        let folder3 =folder2.files[findIndex(folder2,"folder3")]
        createFile(folder3, "file folder3", "conteee")

        createFolder("folder4", folder3)
        
        console.log(root, folder2, folder3)


    } catch (error) {
      console.log('Error', error)
    }
  }
  main()
