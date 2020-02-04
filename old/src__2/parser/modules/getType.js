const escapeRegExp = require("../escapeRegExp");
const i18n = require("../i18n");

function translateArray(items) {
  return items.map(item => i18n.__(item));
}

const weaponsTypes = translateArray([
  "One Handed Axe",
  "One Handed Mace",
  "One Handed Sword",
  "Two Handed Axe",
  "Two Handed Mace",
  "Two Handed Sword",
  "Sceptre",
  "Warstaff",
  "Staff",
  "Rune Dagger",
  "Dagger",
  "Claw",
  "Bow",
  "Wand",
  "Fishing Rod"
]);

const twoHandedWeapons = translateArray([
  "Two Handed Axe",
  "Two Handed Mace",
  "Two Handed Sword",
  "Warstaff",
  "Staff",
  "Bow"
]);

const itemTypes = translateArray([
  "Stygian Vise",
  "Rustic Sash",
  "Belt",
  "Amulet",
  "Talisman",
  "Ring",
  "Quiver",
  "Flask"
]);

const beltTypes = translateArray(["Stygian Vise", "Rustic Sash", "Belt"]);
const amuletTypes = translateArray(["Amulet", "Talisman"]);
const selfTypes = translateArray(["Jewel", "Scarab", "Leaguestone"]);
const mapTypes = translateArray(["Shaped", "Elder", "Blighted"]);
const metamorphTypes = translateArray([
  "Eye",
  "Liver",
  "Heart",
  "Lung",
  "Brain"
]);

const shieldTypes = translateArray(["Buckler", "Bundle", "Shield"]);
const gloveTypes = translateArray(["Gauntlets", "Gloves", "Mitts"]);
const bootTypes = translateArray(["Boots", "Greaves", "Slippers"]);
const helmetTypes = translateArray([
  "Bascinet",
  "Burgonet",
  "Cage",
  "Circlet",
  "Crown",
  "Hood",
  "Helm",
  "Helmet",
  "Mask",
  "Sallet",
  "Tricorne",
  "Iron Hat",
  "Leather Cap",
  "Rusted Coif",
  "Wolf Pelt",
  "Ursine Pelt",
  "Lion Pelt"
]);

const armorTypes = [
  ...shieldTypes,
  ...gloveTypes,
  ...bootTypes,
  ...helmetTypes
];

function getWeaponType(self, line) {
  self.item.type = self.i18n("Weapon");

  if (twoHandedWeapons.includes(line)) {
    const twoHanded = self.i18n("Two Handed");
    self.item.subType = line.replace(twoHanded, "").trim();
    self.item.hands = 2;
  } else {
    const oneHanded = self.i18n("One Handed");
    self.item.subType = line.replace(oneHanded, "").trim();
    self.item.hands = 1;
  }
}

function getItemType(self, subType) {
  self.item.type = self.i18n("Item");
  self.item.subType = subType;

  if (beltTypes.includes(subType)) {
    self.item.subType = self.i18n("Belt");
  } else if (amuletTypes.includes(subType)) {
    self.item.subType = self.i18n("Amulet");
  }
}

function ucFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getMapType(self) {
  self.item.type = self.i18n("Map");
  self.item.subType = self.i18n("Unknown");

  const regexp = new RegExp(`${mapTypes.map(escapeRegExp).join("|")}`, "i");
  const matches = self.item.baseName.match(regexp);

  if (matches) {
    self.item.subType = ucFirst(matches[0]);
  }
}

// function getJewelType(self) {
//   self.item.type = self.i18n("Jewel");
//   let subType = self.item.baseName.replace(self.item.type, "");
//   self.item.subType = ucFirst(subType.trim().replace(/ +/, " "));
// }

function getMetamorphSampleType(self) {
  self.item.type = self.i18n("Metamorph Sample");
  self.item.subType = self.i18n("Unknown");

  const regexp = new RegExp(
    `${metamorphTypes.map(escapeRegExp).join("|")}`,
    "i"
  );
  const matches = self.item.baseName.match(regexp);

  if (matches) {
    self.item.subType = ucFirst(matches[0]);
  }
}

function getRawType(self, type) {
  self.item.type = type;
  let subType = self.item.baseName.replace(self.item.type, "");
  self.item.subType = ucFirst(subType.trim().replace(/ +/, " "));
}

function getArmorType(self, type) {
  self.item.type = self.i18n("Armor");
  self.item.subType = type;
}

module.exports = function getType() {
  // weapons
  let line = this.blocks
    .block(2)
    .line(1)
    .toString();

  if (weaponsTypes.includes(line)) {
    return getWeaponType(this, line);
  }

  // items
  let regexp = new RegExp(`${itemTypes.map(escapeRegExp).join("|")}`, "i");
  let matches = this.item.baseName.match(regexp);

  if (matches) {
    return getItemType(this, matches[0]);
  }

  // cards
  regexp = new RegExp(`${escapeRegExp(this.i18n("Map"))}`, "i");
  matches = this.item.baseName.match(regexp);

  if (matches) {
    return getMapType(this);
  }

  // Jewel, Scarab, Leaguestone
  const pattern = selfTypes.map(escapeRegExp).join("|");
  regexp = new RegExp(`${pattern}`, "i");
  matches = this.item.baseName.match(regexp);

  if (matches) {
    return getRawType(this, matches[0]);
  }

  // metamorphe samples
  if (this.item.IsMetamorphSample) {
    return getMetamorphSampleType(this);
  }

  // armours
  regexp = new RegExp(`${armorTypes.map(escapeRegExp).join("|")}`, "i");
  matches = this.item.baseName.match(regexp);

  if (matches) {
    return getArmorType(this, matches[0]);
  }
};
