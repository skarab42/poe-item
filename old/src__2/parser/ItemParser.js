const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    this.bindModule("isCorrupted", require("./modules/isCorrupted"));
    this.bindModule("isIdentified", require("./modules/isIdentified"));
    this.bindModule("isAbyssal", require("./modules/isAbyssal"));
    this.bindModule(
      "IsMetamorphSample",
      require("./modules/IsMetamorphSample")
    );
    this.bindModule("getRarity", require("./modules/getRarity"));
    this.bindModule("getName", require("./modules/getName"));
    this.bindModule("getType", require("./modules/getType"));
    this.bindModule("getLevel", require("./modules/getLevel"));
    this.bindModule("getQuality", require("./modules/getQuality"));
    this.bindModule("getSockets", require("./modules/getSockets"));
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
