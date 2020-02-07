module.exports = function isCorrupted() {
  if (this.blocks.lineMatch(this.i18n("Corrupted"))) {
    this.item.isCorrupted = true;
  }
};
