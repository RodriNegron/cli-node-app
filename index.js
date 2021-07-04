#!/usr/bin/env node
const userManager = require("./user/userManager");
const readline = require("readline");
const Folder = require("./src/folder");
const Super = require("./user/super");
const UserList = require("./user/usersList");
const ReadOnly = require("./user/read_only");
const Regular = require("./user/regular");
const fileUtils  = require("./utils/fileUtils");
const fs = require("fs");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  try {
    let users = new UserList();
    let root = new Folder("root");
    let path = [root];
    let currentDirectory = root;
    let saveOption = process.argv[2];
    let fileName = process.argv[3];
    users.createUser("admin", "admin", "super");

    console.log("root ", root)

    if(saveOption && fileName){
        fs.access(`${fileName}.json`, fs.constants.F_OK, (err) => {
          if (err) {
            console.error("File does not exist, system will create a new file");
          } else {
            fs.readFile(`${fileName}.json`, function (err, data) {
              if (err) {
                console.log("Error while reading file.");
                return console.log(err);
              } else {
                obj = JSON.parse(data);
                root = obj[0]; //actual root es un objeto de tipo folder y al leer del json no vuelve a ser un objeto folder, al escribir hhay que escribir dentro de un obj folder
                users.userList = obj[1].userList;
                console.log("users2 ", root)
              }
            });
          }
        });
      users.loggedUser = null
    } else {
      users.createUser("admin", "admin", "super");
    }

    rl.prompt();
    rl.on("line", (cliComand) => {

      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];
      let argument3 = inputs[3];

      console.log("users3 ", users)

      userManager(users, command, argument1, argument2, argument3, saveOption, fileName, root); //enviar el userLoged para verificar si puede crear o solo leer
      if (users.loggedUser) {

         (saveOption === "-persisted") ? 
        fileUtils.writeFile(fileName, root, users) 
          : null 
          if (command.toLowerCase() === "exit") {
            
            console.log("\nExiting!\n");
            process.exit(0);
        
          } else
      
        if (command.toLowerCase() === "cd") {
          currentDirectory = currentDirectory.changeDirectory(argument1);
          path.push(currentDirectory);

        } else if (command.toLowerCase() === "show") {
          currentDirectory.showFile(argument1);

        } else if (command.toLowerCase() === "metadata") {
          currentDirectory.showMeta(argument1);
          
        } else if (command.toLowerCase() === "create_folder") {
          currentDirectory.createDirectory(argument1);

        } else if (command.toLowerCase() === "create_file") {
          currentDirectory.createFile(argument1, argument2);

        } else if (command.toLowerCase() === "destroy") {
          currentDirectory.delete(argument1);

        } else if (command.toLowerCase() === "whereami") {
          let builder = "~";
          path.forEach((directory) => (builder += "/" + directory.name));
          console.log(builder);

        } else if (command.toLowerCase() === "ls") {
          currentDirectory.files.length != 0
            ? currentDirectory.listDirectory()
            : console.log(
                `${currentDirectory.name.toUpperCase()} folder is empty`
              );

        }else if (command.toLowerCase() === "..") {
          console.log("******++++", currentDirectory.moveBack(path));
        }
      } else {
        console.log("You need to log in before use commands");
      }

      rl.prompt();
    }).on("close", () => {
      console.log("Exiting");
      process.exit(0);
    });
  } catch (error) {
    console.log("Error", error);
  }
};
main();
