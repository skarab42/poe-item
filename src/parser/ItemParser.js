const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    this.bindModule("isUnidentified", require("./modules/isUnidentified"));
    this.bindModule("getRarity", require("./modules/getRarity"));
    this.bindModule("getName", require("./modules/getName"));
    this.bindModule("getType", require("./modules/getType"));
    this.bindModule("getCategory", require("./modules/getCategory"));
  }

  parse() {
    this.runAllModules();
    console.log(this);
    return this.item;
  }
}

module.exports = ItemParser;
