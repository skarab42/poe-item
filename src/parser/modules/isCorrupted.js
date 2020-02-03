module.exports = function isCorrupted() {
  this.item.isCorrupted =
    !!this.blocks.lineMatch(this.i18n("Corrupted")) || undefined;
};
