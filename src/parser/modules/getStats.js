const removeParentheses = require("../removeParentheses");

const numberPattern = "[0-9]+(?:\\.[0-9]+)?";
const typePattern = "\\([^\\)]+\\)";
const numberRegExp = new RegExp(
  `^(${numberPattern})(%)?(?: (${typePattern}))?$`
);

function getRange(line) {
  let subParts = line.trim().split(" ");
  let minMax = subParts[0].split("-");
  let type = subParts[1];

  if (type) {
    type = removeParentheses(type);
  }

  return {
    min: parseInt(minMax[0]),
    max: parseInt(minMax[1]),
    unit: "integer",
    type
  };
}

function getState(self, block, label) {
  const prop = block.prop(label);

  if (!prop.value) {
    return null;
  }

  if (!self.item.stats) {
    self.item.stats = {};
  }

  const propName = prop.name.toLowerCase().replace(/ +/g, "-");
  const matches = prop.value.match(numberRegExp);

  if (matches) {
    const value = parseFloat(matches[1]);
    const unit = matches[2] ? "percent" : "float";
    let type = matches[3];

    if (type) {
      type = removeParentheses(type);
    }

    self.item.stats[propName] = { value, unit, type };

    return null;
  }

  const parts = prop.value.split(",");

  if (parts.length === 1) {
    self.item.stats[propName] = getRange(parts[0]);
  } else {
    self.item.stats[propName] = [];

    parts.forEach(part => {
      const state = getRange(part);
      self.item.stats[propName].push(state);
    });
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
  getState(this, block, "Attacks per Second");
  getState(this, block, "Critical Strike Chance");
};
