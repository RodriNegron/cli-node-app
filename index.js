#!/usr/bin/env node
const userManager = require("./user/userManager");
const readline = require("readline");
const Folder = require("./src/folder");
const Super = require("./user/super");
const UserList = require("./user/usersList");

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

    users.createUser("admin", "admin", "super");

    rl.prompt();
    rl.on("line", (cliComand) => {
      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];
      let argument3 = inputs[3];

      userManager(users, command, argument1, argument2, argument3); //enviar el userLoged para verificar si puede crear o solo leer
      if (users.loggedUser) {

        if (command.toLowerCase() === "exit") {
          console.log("\nExiting!\n");
          process.exit(0);

        } else if (command.toLowerCase() === "create_folder") {
          argument1
            ? currentDirectory.createDirectory(argument1)
            : console.log(`Error: folder name can not be empty`);

        } else if (command.toLowerCase() === "cd") {
          currentDirectory = currentDirectory.changeDirectory(argument1);
          path.push(currentDirectory);

        } else if (command.toLowerCase() === "create_file") {
          argument1
            ? currentDirectory.createFile(argument1, argument2)
            : console.log(`Error: file name can not be empty`);

        } else if (command.toLowerCase() === "ls") {
          currentDirectory.files.length != 0
            ? currentDirectory.listDirectory()
            : console.log(
              `${currentDirectory.name.toUpperCase()} folder is empty`
            );

        } else if (command.toLowerCase() === "show") {
          currentDirectory.showFile(argument1);

        } else if (command.toLowerCase() === "metadata") {
          currentDirectory.showMeta(argument1);

        } else if (command.toLowerCase() === "destroy") {
          currentDirectory.delete(argument1);
          
        } else if (command.toLowerCase() === "whereami") {
          let builder = "~";
          path.forEach((directory) => (builder += "/" + directory.name));
          console.log(builder);

          //TODO
        } else if (command.toLowerCase() === "..") {
          console.log("******++++", currentDirectory.moveBack(path));
        }
      } else {
        console.log("You need to log before use commands");
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
