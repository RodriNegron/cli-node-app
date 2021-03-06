#!/usr/bin/env node
const userManager = require("./user/userManager");
const readline = require("readline");
const Folder = require("./src/folder");
const UserList = require("./user/usersList");
const writeFile = require("./utils/fileUtils");
const fs = require("fs");
const File = require("./src/file");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  try {
    let users = new UserList();
    let root = new Folder("root", []);
    let path = [root];
    let saveOption = process.argv[2];
    let fileName = process.argv[3];
    let currentDirectory = root;

    if (saveOption && fileName) {
      fs.access(`${fileName}.json`, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("File does not exist, system will create a new file");
          users.createUser("admin", "admin", "super");
        } else {
          fs.readFile(`${fileName}.json`, function (err, data) {
            if (err) {
              console.log("Error while reading file.");
              return console.log(err);
            } else {
              obj = JSON.parse(data);
              root = new Folder(obj[0].name, obj[0].files);
              currentDirectory = root;
              users.userList = obj[1].userList;
            }
          });
        }
      });
      users.loggedUser = null;
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

      if (command.toLowerCase() === "exit") {
        console.log("\n Finished \n");
        process.exit(0);

      }

      userManager(users, command, argument1, argument2, argument3);

      if (users.loggedUser) {

        if (
          users.loggedUser.role === "super" ||
          users.loggedUser.role === "regular"
        ) {
          if (command.toLowerCase() === "create_folder") {
            currentDirectory.create(argument1, Folder);

          } else if (command.toLowerCase() === "create_file") {
            currentDirectory.create(argument1, File, argument2);

          } else if (command.toLowerCase() === "destroy") {
            currentDirectory.delete(argument1);
          }
        }

        if (command.toLowerCase() === "cd") {
          if (argument1 === "..") {
            path.length > 2
              ? (currentDirectory = path[path.length - 2])
              : (currentDirectory = root);

            path.length > 1
              ? path.pop()
              : console.log("you can not go backwards");
          } else {
            response = currentDirectory.changeDirectory(argument1);
            if (response) {
              currentDirectory = new Folder(response.name, response.files);
              path.push(currentDirectory);
            }
          }

        } else if (command.toLowerCase() === "show") {
          currentDirectory.showFile(argument1);

        } else if (command.toLowerCase() === "metadata") {
          currentDirectory.showMeta(argument1);

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
        }

      } else {
        console.log("You need to log in before use commands");
      }

      if (saveOption === "-persisted") writeFile(fileName, root, users);

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
