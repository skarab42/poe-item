const i18n = require("./i18n");
const Item = require("./Item");
const ItemBlocks = require("./ItemBlocks");

class ItemParserBase {
  constructor(raw) {
    this.modules = {};
    this.i18n = i18n.__;
    this.init();
    this.item = new Item();
    this.blocks = new ItemBlocks(raw);
  }

  init() {}

  bindModule(name, callback) {
    this.modules[name] = callback.bind(this);
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
