function userManager(userList, command, argument1, argument2, argument3) {

  if (command.toLowerCase() === "create_user") {
    userList.loggedUser && userList.loggedUser.role == "super"
      ? userList.createUser(argument1, argument2, argument3)
      : console.log("you don't have permission to access this method");

  } else if (command.toLowerCase() === "login") {
    userList.checkCredentials(argument1, argument2);

  } else if (command.toLowerCase() === "logout") {
    userList.logOut();

  } else if (command.toLowerCase() === "update_password") {
    userList.loggedUser.role === "super" ||
    userList.loggedUser.role === "regular"
      ? userList.updatePassword(argument1, userList.loggedUser.userName)
      : console.log("you don't have permission to access this method");

  } else if (command.toLowerCase() === "destroy_user") {
    userList.loggedUser.role === "super" 
      ? userList.deleteUser(argument1)
      : console.log("you don't have permission to access this method");
      
  } else if (command.toLowerCase() === "whoami") {
    if (userList.loggedUser) {
      console.log("Logged user: ", userList.loggedUser.userName);
    }
  }
}

module.exports = userManager;
