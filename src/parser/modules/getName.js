module.exports = function getName() {
  const name = this.blocks.block(1).line(2);

  if (!name) {
    this.unableToFindItemProp("Name");
  }

  this.item.name = name.toString();
};
