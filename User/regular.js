const User = require("./user");

class Regular extends User {
  constructor(userName, password) {
    super(userName, password);
    this.role = "regular";
  }
}

module.exports = Regular;