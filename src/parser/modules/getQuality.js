module.exports = function getQuality() {
  const quality = this.blocks.block(2).prop("Quality");

  if (!quality.value) {
    return null;
  }

  let parts = quality.value.split(" ");
  let augmented = parts[1].replace(/^\(|\)$/g, "");

  this.item.quality = {
    value: parseInt(parts[0]),
    [`${augmented}`]: !!parts[1],
    source: quality.extra
  };
};
