module.exports = function isUnidentified() {
  this.item.isIdentified =
    !!this.blocks.lineMatch(this.i18n("Unidentified")) || undefined;
};
