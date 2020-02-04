const ItemBlockBase = require("./ItemBlockBase");
const ItemBlockLine = require("./ItemBlockLine");

class ItemBlock extends ItemBlockBase {
  constructor(raw) {
    super(raw);
    this.lines = this.raw.split(/\r?\n/);
    this.lines = this.lines.map(line => new ItemBlockLine(line));
  }

  line(num) {
    return this.lines[num - 1];
  }
}

module.exports = ItemBlock;
