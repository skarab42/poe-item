module.exports = function getLevel() {
  const level = this.blocks.prop("Level");

  if (!level.value) {
    return null;
  }

  this.item.level = parseInt(level.value);
};
