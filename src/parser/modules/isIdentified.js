module.exports = function isIdentified() {
  this.item.identified = !this.blocks.lineMatch(this.i18n("Unidentified"));
};
