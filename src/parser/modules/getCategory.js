const escapeRegExp = require("../escapeRegExp");
const i18n = require("../i18n");
const items = {
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

module.exports = function getCategory() {
  const locale = i18n.getLocale();

  Object.entries(items[locale]).find(entry => {
    const label = entry[0];
    const items = entry[1];

    console.log(label);

    items.find(item => {
      if (this.item.type === item) {
        console.log(">>", this.item);
        this.item.category = label;
        return true;
      }

      let regexp = new RegExp(`(.*)(${escapeRegExp(item)})(.*)`, "i");
      let matches = this.item.type.match(regexp);

      if (matches) {
        const prefix = matches[1];
        const type = matches[2];
        const suffix = matches[3];

        this.item.category = label;
        this.item.type = type;
        this.item.subType = [prefix, suffix].join(" ").trim();

        return true;
      }
    });
  });

  console.log(this.item.type, this.item.category);
  this.item.type = ucFirst(
    this.item.type.replace(this.item.category, "").trim()
  );

  if (!this.item.category) {
    this.unableToFindItemProp("Category");
  }
};
