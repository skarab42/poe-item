module.exports = function isUnidentified() {
  this.item.isUnidentified =
    !!this.blocks.lineMatch(this.i18n("Unidentified")) || undefined;
};
