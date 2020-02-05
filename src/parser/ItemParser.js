const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    this.bindModule("getRarity", require("./modules/getRarity"));
    this.bindModule("getName", require("./modules/getName"));
    this.bindModule("getType", require("./modules/getType"));
  }

  parse() {
    this.runAllModules();
    console.log(this);
    return this.item;
  }
}

module.exports = ItemParser;
