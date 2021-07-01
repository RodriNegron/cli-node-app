#!/usr/bin/env node
const Folder = require("./src/folder");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  try {
    let root = new Folder("root");
    let currentDirectory = root; //directorio donde se encuentra el usuario en el momento

    /////////////////////////////////////////////////
    console.log(currentDirectory);
    /////////////////////////////////////////////////

    rl.prompt();

    rl.on("line", (cliComand) => {
      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];

      console.log( "**********command: ", command,  "********: argumento",argument1, "\n");

      if (command.toLowerCase() === "exit") {
        console.log("\nExiting!\n");
        process.exit(0);

      } else if (command.toLowerCase() === "create_folder") {
        currentDirectory.createDirectory(argument1);
        console.log(currentDirectory);

      } else if (command.toLowerCase() === "cd") {
        currentDirectory = currentDirectory.changeDirectory(argument1);
        console.log("cd", currentDirectory);

      } else if (command.toLowerCase() === "create_file") {
        currentDirectory.createFile(argument1, argument2);
        console.log("current dir", currentDirectory);
      }

      rl.prompt();
    }).on("close", () => {
      console.log("Exiting!");
      process.exit(0);
    });

    /* rl.question(" ", function (cliComand) {
            let inputs = cliComand.split(" ");
            let command = inputs[0];
            let argument1 = inputs[1];
            
            console.log("***********command: ->", command);
            
            switch (command) {
                case "create_folder":
                    currentDirectory.createDirectory(argument1);
                    console.log(currentDirectory);
                    break;
                    case "cd":
                        currentDirectory = currentDirectory.changeDirectory("foldi");
                        console.log("cd", currentDirectory);
                        break;
                        case "exit":
                            rl.close();
                            break;
                        }
                    });
                    
                    rl.on("close", function () {
                        console.log("\ncerrando programa");
                        process.exit(0);
                    });
                    */
    //console.log("****************************************** root \n",root)
    //console.log("****************************************** root \n")

    //console.log(findIndex(root,"folder2"))
    /*  File.createFile(root.files[findIndex(root,"folder2")], "file folder2 1", "contenidoo")
                   File.createFile(root.files[findIndex(root,"folder2")], "file folder2 2", "contenidoaao") */
    //console.log("folder 2 \n" ,root.files[findIndex(root,"folder2")])

    /*         let folder2 = exactDirectory.files[exactDirectory.findIndex(exactDirectory,"folder2")]
     */
    //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    //console.log("folder 2 \n" ,folder2)

    /*  folder2.createDirectory("folder3")
                  console.log("222\n", folder2) */

    /*         let folder3 =folder2.files[folder2.findIndex(folder2,"folder3")]
     */
    /*File.createFile(folder3, "file folder3", "conteee")
                 
                 Folder.createFolder("folder4", folder3)
                 
                 console.log(root, folder2, folder3)
                 */
  } catch (error) {
    console.log("Error", error);
  }
};
main();

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
