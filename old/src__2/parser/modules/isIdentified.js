module.exports = function isIdentified() {
  this.item.isIdentified =
    !this.blocks.lineMatch(this.i18n("Unidentified")) || undefined;
};
