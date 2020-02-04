module.exports = function getName() {
  // long name
  const name = this.blocks.block(1).line(2);

  if (!name) {
    this.unableToFindItemProp("Name");
  }

  this.item.name = name.toString();

  // base name
  const baseName = this.blocks.block(1).line(3);
  this.item.baseName = (baseName && baseName.toString()) || this.item.name;

  if (this.item.rarity === this.i18n("Normal") || !this.item.isIdentified) {
    const superior = this.i18n("Superior");
    const regexp = new RegExp(`${superior}`, "i");
    this.item.baseName = this.item.name.replace(regexp, "").trim();
  } else if (this.item.rarity === this.i18n("Magic")) {
    // TODO: extract base name from name
    // TODO: parse affixs first ?
  }

  if (!this.item.baseName) {
    this.unableToFindItemProp("Base name");
  }
};
