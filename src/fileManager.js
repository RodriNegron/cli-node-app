const Folder = require("./folder");

function fileManager(currentDirectory, command, argument1, argument2, path) {
  
  if (command.toLowerCase() === "exit") {
    console.log("\nExiting!\n");
    process.exit(0);

  } else if (command.toLowerCase() === "create_folder") {
    argument1
      ? currentDirectory.createDirectory(argument1)
      : console.log(`Error: folder name can not be empty`);

      //FIX
  } else if (command.toLowerCase() === "cd") {
    if (
      currentDirectory.changeDirectory(argument1) &&
      currentDirectory.showFile(argument1) instanceof Folder
    ) {

      currentDirectory.changeDirectory(argument1);

      path.push(currentDirectory);
      console.log("current dirrr", currentDirectory)

    } else {
      console.log(`Error: ${argument1} not a valid directory`);
    }

  } else if (command.toLowerCase() === "create_file") {
    argument1
      ? currentDirectory.createFile(argument1, argument2)
      : console.log(`Error: file name can not be empty`);

  } else if (command.toLowerCase() === "ls") {
    console.log("current dirrrectory LS", currentDirectory)

    currentDirectory.files.length != 0
      ? currentDirectory.listDirectory()
      : console.log(`${currentDirectory.name.toUpperCase()} folder is empty`);

  } else if (command.toLowerCase() === "show") {
   currentDirectory.showFile(argument1);
  
  } else if (command.toLowerCase() === "metadata") {
    currentDirectory.showMeta(argument1);
   
  } else if (command.toLowerCase() === "destroy") {
    currentDirectory.delete(argument1)

  } else if (command.toLowerCase() === "whereami") {
    let builder = "~";
    path.forEach((directory) => (builder += "/" + directory.name));
    console.log(builder);

    //TODO
  } else if (command.toLowerCase() === "..") {
    console.log("******++++", currentDirectory.moveBack(path));
  }

}

module.exports = fileManager;
