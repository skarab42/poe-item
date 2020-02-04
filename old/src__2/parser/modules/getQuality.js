module.exports = function getQuality() {
  const quality = this.blocks.block(2).prop("Quality");

  if (!quality.value) {
    return null;
  }

  this.item.quality = {
    value: parseInt(quality.value),
    type: quality.extra
  };
};
