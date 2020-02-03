const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    this.bindModule("isCorrupted", require("./modules/isCorrupted"));
    this.bindModule("isIdentified", require("./modules/isIdentified"));
    this.bindModule("getRarity", require("./modules/getRarity"));
  }

  parse() {
    // this.modules.isCorrupted();
    // this.modules.isIdentified();
    // this.modules.getRarity();
    this.runAllModules();

    console.log(this);

    return this.item;
  }
}

module.exports = ItemParser;
