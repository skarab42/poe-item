import { i18n, __ } from "./i18n";
import ItemBlocks from "./ItemBlocks";
import Item from "./Item";

import us from "../locales/us.json";
import fr from "../locales/fr.json";

i18n.set("us", us);
i18n.set("fr", fr);

export default class ItemParserBase {
  constructor() {
    this.__ = __;
    this.i18n = i18n;
    this.modules = {};
    this.modulesQueue = [];
    this.modulesDone = [];
    this.blocks = null;
    this.item = null;
    this.setup("");
    this.init();
  }

  init() {
    throw new Error("You have to implement the method!");
  }

  parse() {
    throw new Error("You have to implement the method!");
  }

  setup(raw) {
    this.blocks = new ItemBlocks(raw);
    this.item = new Item();
    this.modulesDone = [];
  }

  bindModule(name, callback) {
    if (this.modulesQueue.includes(name)) {
      throw new Error(`A module can only be bind once: ${name})`);
    }

    this.modulesQueue.push(name);
    this.modules[name] = callback.bind(this);
  }

  bindModules(modules) {
    Object.entries(modules).forEach(module => this.bindModule(...module));
  }

  runModule(name) {
    if (this.modulesDone.includes(name)) {
      throw new Error(`A module can only be run once: ${name})`);
    }

    this.modulesDone.push(name);
    this.modules[name]();
  }

  runAllModules() {
    this.modulesQueue.forEach(name => this.runModule(name));
  }

  undefinedProp(label) {
    throw new Error(__("undefinedProp: {{prop}}", { prop: __(label) }));
  }
}
