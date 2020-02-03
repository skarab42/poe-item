const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    this.bindModule("isCorrupted", require("./modules/isCorrupted"));
    this.bindModule("isIdentified", require("./modules/isIdentified"));
  }

  parse() {
    this.modules.isCorrupted();
    this.modules.isIdentified();

    console.log(this);

    return this.item;
  }
}

module.exports = ItemParser;
