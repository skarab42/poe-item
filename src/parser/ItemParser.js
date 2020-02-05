const ItemParserBase = require("./ItemParserBase");

class ItemParser extends ItemParserBase {
  init() {
    this.bindModule("getRarity", require("./modules/getRarity"));
    this.bindModule("getName", require("./modules/getName"));
    this.bindModule("getType", require("./modules/getType"));
    this.bindModule("getLevel", require("./modules/getLevel"));
    this.bindModule("getRequirements", require("./modules/getRequirements"));
    this.bindModule("getQuality", require("./modules/getQuality"));
    this.bindModule("getSockets", require("./modules/getSockets"));

    this.bindModule("isCorrupted", require("./modules/isCorrupted"));
    this.bindModule("isUnidentified", require("./modules/isUnidentified"));
    this.bindModule("isAbyssal", require("./modules/isAbyssal"));
    this.bindModule(
      "IsMetamorphSample",
      require("./modules/IsMetamorphSample")
    );
  }

  parse() {
    this.runAllModules();
    console.log(this);
    return this.item;
  }
}

module.exports = ItemParser;
