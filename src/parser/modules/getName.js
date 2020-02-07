module.exports = function getName() {
  const block = this.blocks.block(1);

  if (!block) {
    this.unableToFindItemProp("Name");
  }

  const name = block.line(2);

  if (!name) {
    this.unableToFindItemProp("Name");
  }

  this.item.name = name.toString();
};
