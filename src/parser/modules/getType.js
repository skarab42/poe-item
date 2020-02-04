module.exports = function getType() {
  const type = this.blocks.block(1).line(3);

  this.item.type = (type && type.toString()) || this.item.name;

  if (this.item.rarity === this.i18n("Normal") || this.item.isUnidentified) {
    const superior = this.i18n("Superior");
    const regexp = new RegExp(`${superior}`, "i");
    this.item.type = this.item.name.replace(regexp, "").trim();
    this.item.subType = this.item.name.match(regexp) ? superior : undefined;
  }

  if (!this.item.type) {
    this.unableToFindItemProp("Type");
  }
};
