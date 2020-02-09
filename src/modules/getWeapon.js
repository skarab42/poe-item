export default function getWeapon() {
  if (this.item.isWeapon) {
    const line = this.blocks.block(2).line(1);

    if (!line.length) {
      return null;
    }

    const oneHanded = this.__("One Handed");
    const twoHanded = this.__("Two Handed");
    const handsPattern = `${oneHanded}|${twoHanded}`;
    const matches = line.match(`^(${handsPattern})?(?: ?)(.+)$`, "i");
    const hands = matches[1] === twoHanded ? 2 : 1;
    const type = matches[2];

    this.item.weapon = { type, hands };
  }
}
