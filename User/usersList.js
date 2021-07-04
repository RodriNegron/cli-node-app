const Super = require("./super");
const Regular = require("./regular");
const Read_only = require("./read_only");

class UserList {
  constructor() {
    this.userList = [];
    this.loggedUser;
  }

  createUser(userName, password, role) {
    let newUser;
    switch (role) {
      case "super":
        newUser = new Super(userName, password, role);
        break;
      case "regular":
        newUser = new Regular(userName, password, role);
        break;
      case "read_only":
        newUser = new Read_only(userName, password, role);
        break;
      default:
        console.log("Invalid parameters");
        break;
    }
    if (newUser) this.addUser(newUser);
  }

  addUser(user) {
    let createdUser = false;
    this.userList.forEach((element) => {
      if (element.userName === user.userName) {
        createdUser = true;
      }
    });
    !createdUser
      ? this.userList.push(user)
      : console.log("user already exists");
  }

  checkCredentials(userName, password) {
    this.userList.forEach((user) => {
      if (user.userName === userName) {
        user.password === password
          ? (this.loggedUser = user)
          : console.log("Invalid credentials");
      }
    });
  }

  logOut() {
    this.loggedUser = null;
  }

  updatePassword(newPassword, userName) {
    let pos;
    this.userList.forEach((user, i) => {
      if (user.userName === userName) pos = i;
    });
    this.userList[pos].password = newPassword;
  }

  deleteUser(userName) {
    let ok;
    this.userList.forEach((user) => {
      if (user.userName === userName) {
        ok = true;
        this.userList = this.userList.filter(
          (user) => user.userName != userName
        );
      }
    });
    if (!ok) console.log(`user ${userName} not found`);
  }
}

module.exports = UserList;
