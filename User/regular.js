class Regular extends User {
  constructor(userName, password) {
    super(userName, password);
    this.role = "regular";
  }
}
