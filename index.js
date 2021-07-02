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
    let path = [root]; //si estas en root si previusD == null no puede mover backwards

    rl.prompt();

    rl.on("line", (cliComand) => {

      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];

      if (command.toLowerCase() === "exit") {
        console.log("\nExiting!\n");
        process.exit(0);

      } else if (command.toLowerCase() === "create_folder") {
        currentDirectory.createDirectory(argument1);

      } else if (command.toLowerCase() === "cd") {
        if(currentDirectory.changeDirectory(argument1)){
          currentDirectory = currentDirectory.changeDirectory(argument1);
          path.push(currentDirectory);
        }else {
          console.log(`${argument1} does not exist in this directory`)
        }

      } else if (command.toLowerCase() === "create_file") {
        currentDirectory.createFile(argument1, argument2);

      } else if (command.toLowerCase() === "ls") {
        currentDirectory.files.length != 0 ? currentDirectory.listDirectory() :
        console.log(`${currentDirectory.name.toUpperCase()} folder is empty`)

      } else if (command.toLowerCase() === "show") {
        let fileToShow = currentDirectory.showFile(argument1);
        fileToShow ? console.log(currentDirectory.showFile(argument1).content) :
        console.log(`${argument1} does not exist in this directory`)
        
      } else if (command.toLowerCase() === "metadata") {
        let fileToShow = currentDirectory.showMeta(argument1);
        fileToShow ? console.log(currentDirectory.showFile(argument1).meta) :
        console.log(`${argument1} does not exist in this directory`)
      
      } else if (command.toLowerCase() === "destroy") {
        currentDirectory.files = currentDirectory.delete(argument1);

      } else if (command.toLowerCase() === "..") {
        currentDirectory.moveBack();

      } else if (command.toLowerCase() === "whereami") {
        let builder= "";
        path.forEach((directory)=>builder+= "/" +directory.name)
        console.log(builder);

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
