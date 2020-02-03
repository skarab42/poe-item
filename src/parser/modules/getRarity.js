module.exports = function getRarity() {
  const rarity = this.blocks
    .block(1)
    .line(1)
    .prop("Rarity").value;

  if (!rarity) {
    this.unableToFindItemProp("Rarity");
  }

  this.item.rarity = rarity;
};
