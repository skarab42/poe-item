import ItemParserBase from "./ItemParserBase";
import modules from "./modules/";

export default class ItemParser extends ItemParserBase {
  init() {
    this.bindModules(modules);
  }

  parse(raw) {
    this.setup(raw);
    this.runAllModules();
    return this.item;
  }
}
