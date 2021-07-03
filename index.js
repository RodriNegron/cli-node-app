#!/usr/bin/env node
const fileManager = require("./src/fileManager");
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

    users.createUser("admin", "admin", "super");

    rl.prompt();
    rl.on("line", (cliComand) => {
      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];
      let argument3 = inputs[3];

      userManager(users, command, argument1, argument2, argument3);
      users.loggedUser
        ? fileManager(root, command, argument1, argument2, path) //enviar el userLoged para verificar si puede crear o solo leer
        : console.log("You need to log before use commands");

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
