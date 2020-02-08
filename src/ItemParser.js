import ItemParserBase from "./ItemParserBase";

export default class ItemParser extends ItemParserBase {
  init() {
    console.log("init...");
  }

  parse(raw) {
    this.setup(raw);
    this.runAllModules();
    console.log(this.blocks.prop("Rarity"));
    return this.item;
  }
}
