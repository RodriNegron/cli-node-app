const User = require("./user");

class Super extends User {
  constructor(userName, password) {
    super(userName, password);
    this.role = "super";
  }
}

module.exports = Super;