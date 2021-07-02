class File {
  constructor(name, content) {
    this.name = name;
    this.content = content;
    this.meta = {
      createdAt: Date.now()
    };
  }
}

module.exports = File;
