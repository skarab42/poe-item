export default function getLevel() {
  const level = this.blocks.prop("Item Level");

  if (!level) {
    return null;
  }

  this.item.level = parseInt(level.value);
}
