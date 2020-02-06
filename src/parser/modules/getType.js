const escapeRegExp = require("../escapeRegExp");
const i18n = require("../i18n");
const categories = {
  us: require("../../../locales/us/items.json"),
  br: require("../../../locales/br/items.json"),
  ru: require("../../../locales/ru/items.json"),
  th: require("../../../locales/th/items.json"),
  de: require("../../../locales/de/items.json"),
  fr: require("../../../locales/fr/items.json"),
  es: require("../../../locales/es/items.json"),
  kr: require("../../../locales/kr/items.json")
};

function ucFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function cleanType(self) {
  if (self.item.subCategory) {
    const type = self.item.type.replace(self.item.subCategory, "");
    self.item.type = ucFirst(type.trim());
  }
}

module.exports = function getType() {
  const line = this.blocks.block(1).line(3);
  const locale = i18n.getLocale();
  const search = (line && line.toString()) || this.item.name;

  let categoryFound = null;

  Object.entries(categories[locale]).find(([category, items]) => {
    return items.find(item => {
      if ([item.name, item.type].includes(search)) {
        this.item.category = this.i18n(category);
        this.item.subCategory = item.subCategory;
        this.item.type = item.type;
        categoryFound = category;
        cleanType(this);
        return true;
      }

      let regexp = new RegExp(`(.*)(${escapeRegExp(item.type)})(.*)`, "i");
      let matches = search.match(regexp);

      if (matches) {
        const type = matches[2];
        const subType1 = matches[1];
        const subType2 = matches[3];
        this.item.category = this.i18n(category);
        this.item.subCategory = item.subCategory;
        this.item.type = item.type;
        this.item.subType = ucFirst([subType1, subType2].join("").trim());
        categoryFound = category;
        cleanType(this);
        return true;
      }
    });
  });

  if (categoryFound === "Weapon") {
    const weapon = this.blocks.block(2).line(1);
    this.item.hands = weapon.match(this.i18n("Two Handed")) ? 2 : 1;
  }
};
