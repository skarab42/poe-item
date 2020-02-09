export default function isCorrupted() {
  if (this.blocks.matchLine(this.__("Corrupted"))) {
    this.item.isCorrupted = true;
  }
}
