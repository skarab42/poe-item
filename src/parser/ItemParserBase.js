const i18n = require("./i18n");
const Item = require("./Item");
const ItemBlocks = require("./ItemBlocks");

class ItemParserBase {
  constructor(raw) {
    this.modules = {};
    this.modulesQueue = [];
    this.i18n = i18n.__;
    this.init();
    this.item = new Item();
    this.blocks = new ItemBlocks(raw);
  }

  init() {}

  bindModule(name, callback) {
    this.modulesQueue.push(name);
    this.modules[name] = callback.bind(this);
  }

  runAllModules() {
    this.modulesQueue.forEach(moduleName => {
      this.modules[moduleName]();
    });
  }

  unableToFindItemProp(propName) {
    throw new Error(
      i18n.__('Unable to find item "{{propName}}".', {
        propName: i18n.__(propName)
      })
    );
  }

  parse() {
    throw new Error(i18n.__('You have to implement the method "parse"!'));
  }
}

module.exports = ItemParserBase;
