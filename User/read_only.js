const User = require("./user");

class ReadOnly extends User {
  constructor(userName, password) {
    super(userName, password);
    this.role = "readOnly";
  }
}

module.exports = ReadOnly; 