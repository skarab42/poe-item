module.exports = function isAbyssal() {
  this.item.isAbyssal =
    !!this.blocks
      .block(2)
      .line(1)
      .lineMatch(this.i18n("Abyss")) || undefined;
};