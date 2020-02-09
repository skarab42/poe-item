import removeParentheses from "../helpers/removeParentheses";

export default function getQuality() {
  const quality = this.blocks.block(2).prop("Quality");

  if (!quality) {
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
}
