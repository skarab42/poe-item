module.exports = function isUnidentified() {
  if (this.blocks.lineMatch(this.i18n("Unidentified"))) {
    this.item.isUnidentified = true;
  }
};
