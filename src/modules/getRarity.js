export default function getRarity() {
  const rarity = this.blocks
    .block(1)
    .line(1)
    .prop("Rarity");

  if (!rarity) {
    this.undefinedProp("Rarity");
  }

  this.item.rarity = rarity.value;
}
