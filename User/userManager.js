const Super = require("./super");
const Regular = require("./regular");
const ReadOnly = require("./read_only");

function userManager(userList, command, argument1, argument2, argument3) {
  if (command.toLowerCase() === "exit") {
    console.log("\nExiting!\n");
    process.exit(0);

  } else if (command.toLowerCase() === "create_user") {
    userList.loggedUser && userList.loggedUser.role === "super"
      ? userList.createUser(argument1, argument2, argument3)
      : console.log(`you don't have permission to access this method`);

  } else if (command.toLowerCase() === "login") {
    userList.checkCredentials(argument1, argument2);
  }
}

module.exports = userManager;

