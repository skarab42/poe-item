export default function getUses() {
  const uses = this.blocks.prop("Uses");

  if (!uses) {
    return null;
  }

  this.item.uses = uses.value;
}
