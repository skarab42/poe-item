function getState(self, block, label) {
  const prop = block.prop(label);

  if (!prop.value) {
    return null;
  }

  if (!self.item.stats) {
    self.item.stats = {};
  }
}

module.exports = function getStats() {
  const block = this.blocks.block(2);

  if (!block) {
    return null;
  }

  // Weapons
  getState(this, block, "Weapon Range");
  getState(this, block, "Physical Damage");
  getState(this, block, "Elemental Damage");
  getState(this, block, "Attacks per Second", "float");
  getState(this, block, "Critical Strike Chance", "percent");
};
