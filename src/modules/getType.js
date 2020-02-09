import categories from "../../locales/items.js";
import capitalize from "../helpers/capitalize.js";
import escapeRegExp from "../helpers/escapeRegExp.js";

function cleanType(self) {
  if (self.item.subCategory) {
    const type = self.item.type.replace(self.item.subCategory, "");
    self.item.type = type.length
      ? capitalize(type.trim())
      : self.item.subCategory;
  }
  if (self.item.subType) {
    self.item.subType = self.item.subType
      .split("  ")
      .map(capitalize)
      .join(", ");
  }
}

export default function getType() {
  const locale = this.i18n.getLocale();
  const line = this.blocks.block(1).line(3);
  const search = (line && line.toString()) || this.item.name;

  let usCategory = null;

  Object.entries(categories[locale]).find(([category, items]) => {
    return items.find(item => {
      if ([item.name, item.type].includes(search)) {
        this.item.category = this.__(category);
        this.item.subCategory = item.subCategory;
        this.item.type = item.type;
        delete this.item.subType;
        usCategory = category;
        cleanType(this);
        return true;
      }

      // Other
      const regexp = new RegExp(`(.*)(${escapeRegExp(item.type)})(.*)`, "i");
      const matches = search.match(regexp);

      if (matches) {
        const subType1 = matches[1];
        const subType2 = matches[3];
        this.item.category = this.__(category);
        this.item.subCategory = item.subCategory;
        this.item.type = item.type;
        this.item.subType = capitalize([subType1, subType2].join("").trim());
        usCategory = category;
        cleanType(this);
      }
    });
  });

  if (usCategory) {
    this.item[`is${usCategory.replace(" ", "")}`] = true;
  }
}
