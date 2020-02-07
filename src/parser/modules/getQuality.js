const removeParentheses = require("../removeParentheses");

module.exports = function getQuality() {
  const block = this.blocks.block(2);

  if (!block) {
    return null;
  }

  const quality = block.prop("Quality");

  if (!quality.value) {
    return null;
  }

  let parts = quality.value.split(" ");
  let value = parts.shift();
  let type = parts.shift();

  if (type) {
    type = removeParentheses(type);
  }

  this.item.quality = {
    value: parseInt(value),
    source: quality.extra,
    type
  };
};
