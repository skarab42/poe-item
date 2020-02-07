module.exports = function getRarity() {
  const block = this.blocks.block(1);

  if (!block) {
    this.unableToFindItemProp("Rarity");
  }

  const line = block.line(1);

  if (!line) {
    this.unableToFindItemProp("Rarity");
  }

  const rarity = line.prop("Rarity");

  if (!rarity.value) {
    this.unableToFindItemProp("Rarity");
  }

  this.item.rarity = rarity.value;
};
