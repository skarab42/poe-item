module.exports = function isAbyssal() {
  const block = this.blocks.block(2);
  const line = block && block.line(1);
  const pattern = this.i18n("Abyss");

  if (line && line.lineMatch(pattern)) {
    this.item.isAbyssal = true;
  }
};
