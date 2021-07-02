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
    
    users.createUser("admin","admin", "super");
    

    rl.prompt();
    rl.on("line", (cliComand) => {

      let inputs = cliComand.split(" ");
      let command = inputs[0];
      let argument1 = inputs[1];
      let argument2 = inputs[2];
      let argument3 = inputs[3];

      userManager(users, command, argument1, argument2, argument3);

      //fileManager(root, command, argument1, argument2, path);

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
