const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    // this.bindModule("isCorrupted", require("./modules/isCorrupted"));
  }

  parse() {
    this.runAllModules();
    console.log(this);
    return this.item;
  }
}

module.exports = ItemParser;
