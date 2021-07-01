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

    console.log(currentDirectory);

    rl.prompt();

    rl.on("line", (cliComand) => {

      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];

      console.log(
        "**command, argument1, argument2: ",
        command,
        argument1,
        argument2,
        "** \n"
      );

      if (command.toLowerCase() === "exit") {
        console.log("\nExiting!\n");
        process.exit(0);

      } else if (command.toLowerCase() === "create_folder") {
        currentDirectory.createDirectory(argument1);

      } else if (command.toLowerCase() === "cd") {
        currentDirectory = currentDirectory.changeDirectory(argument1);

      } else if (command.toLowerCase() === "create_file") {
        currentDirectory.createFile(argument1, argument2);

      } else if (command.toLowerCase() === "ls") {
        currentDirectory.showFolder();

        //TODO
      } else if (command.toLowerCase() === "show") {
        let fileToShow = currentDirectory.showFile(argument1);
        fileToShow ? console.log("that file does not exists in this directory") : 
        console.log(fileToShow);
        
        //TODO
      } else if (command.toLowerCase() === "metadata") {
        let fileToShow = currentDirectory.showMeta(argument1);
        console.log(fileToShow);
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
