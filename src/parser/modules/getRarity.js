module.exports = function getRarity() {
  const rarity = this.blocks
    .block(1)
    .line(1)
    .prop("Rarity");

  if (!rarity.value) {
    this.unableToFindItemProp("Rarity");
  }

  this.item.rarity = rarity.value;
};
