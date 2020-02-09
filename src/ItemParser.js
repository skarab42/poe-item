import ItemParserBase from "./ItemParserBase";
import modules from "./modules/";

import us from "../locales/us.json";
import fr from "../locales/fr.json";

export default class ItemParser extends ItemParserBase {
  constructor() {
    super();

    this.i18n.set("us", us);
    this.i18n.set("fr", fr);

    this.i18n.setLocale("us");
  }

  init() {
    this.bindModules(modules);
  }

  parse(raw) {
    this.setup(raw);
    this.runAllModules();
    return this.item;
  }
}
