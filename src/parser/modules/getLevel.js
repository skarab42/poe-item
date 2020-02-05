module.exports = function getLevel() {
  const level = this.blocks.prop("Item Level");

  if (!level.value) {
    return null;
  }

  this.item.level = parseInt(level.value);
};
