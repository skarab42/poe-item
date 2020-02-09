export default function isUnidentified() {
  if (this.blocks.matchLine(this.__("Unidentified"))) {
    this.item.isUnidentified = true;
  } else {
    this.item.isIdentified = true;
  }
}
