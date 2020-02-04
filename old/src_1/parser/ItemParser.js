const ItemParserBase = require("./ItemParserBase");
const i18n = require("./i18n");

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

const twoHandedItems = translateArray(["Warstaff", "Staff", "Bow"]);

const weaponsTypesPattern = weaponsTypes.join("|");
const itemTypesPattern = itemTypes.join("|");
// const amuletTypesPattern = amuletTypes.join("|");
// const beltTypesPattern = beltTypes.join("|");

function parseColors(colors) {
  const iterations = {};
  colors.forEach(color => {
    if (!iterations[color]) {
      iterations[color] = 0;
    }
    iterations[color]++;
  });
  return iterations;
}

class ItemParser extends ItemParserBase {
  isIdentified() {
    this.item.identified = !this.blocks.lineMatch(i18n.__("Unidentified"));
  }

  isCorrupted() {
    this.item.corrupted = !!this.blocks.lineMatch(i18n.__("Corrupted"));
  }

  parseRarity() {
    const rarity = this.blocks
      .block(1)
      .line(1)
      .prop("Rarity");

    if (!rarity) {
      this.unableToFindItemProp("Rarity");
    }

    this.item.rarity = rarity;
  }

  parseName() {
    const name = this.blocks.block(1).line(2);

    if (!name) {
      this.unableToFindItemProp("Name");
    }

    this.item.name = name.toString();
  }

  parseBaseName() {
    const baseName = this.blocks.block(1).line(3);
    this.item.baseName = (baseName && baseName.toString()) || this.item.name;

    if (this.item.rarity === i18n.__("Normal") || !this.item.identified) {
      const superior = i18n.__("Superior");
      const regexp = new RegExp(`${superior}`, "i");
      this.item.baseName = this.item.name.replace(regexp, "").trim();
    } else if (this.item.rarity === i18n.__("Magic")) {
      // TODO: extract base name from name
      // TODO: parse affixs first ?
    }

    if (!this.item.baseName) {
      this.unableToFindItemProp("Base name");
    }
  }

  parseQuality() {
    const raw = this.blocks.prop("Quality");

    if (!raw) {
      return null;
    }

    let type = null;
    let value = parseInt(raw[1]);

    if (typeof raw === "string") {
      type = "";
      value = parseInt(raw);
    } else {
      type = raw[0];
      value = parseInt(raw[1]);
    }

    this.item.quality = { value, type };
  }

  parseSockets() {
    let raw = this.blocks.prop("Sockets");

    if (!raw) {
      return null;
    }

    raw = raw.trim();

    let count = 0;
    let links = 0;
    let maxLinks = 0;
    let groupsCount = 0;

    const groups = raw.split(" ").map(group => {
      const colors = group.split("-");
      const colorsCount = parseColors(colors);
      const groupLinks = colors.length - 1;
      maxLinks = Math.max(maxLinks, groupLinks);
      count += colors.length;
      links += groupLinks;
      groupsCount++;
      return { colors, colorsCount, links: groupLinks };
    });

    this.item.sockets = { count, links, maxLinks, groupsCount, groups };
  }

  parseLevel() {
    const raw = this.blocks.prop("Level");

    if (!raw) {
      return null;
    }

    this.item.level = parseInt(raw);
  }

  parseWeapon(weapon) {
    let type = i18n.__("Weapon");
    let subType = null;
    let hands = null;

    const oneHanded = i18n.__("One Handed");
    const twoHanded = i18n.__("Two Handed");
    const gripPattern = `(${oneHanded}|${twoHanded})`;
    const gripMatches = weapon.match(
      new RegExp(`(.*) ${gripPattern}|${gripPattern} (.*)|(.*)`, "i")
    );

    if (!gripMatches) {
      this.unableToFindItemProp("Hands");
    }

    if (gripMatches[5]) {
      subType = gripMatches[5].trim();
    }

    // fr, ...
    else if (gripMatches[1] && gripMatches[2]) {
      subType = gripMatches[1].trim();
      hands = gripMatches[2].trim();
    }

    // en, ...
    else if (gripMatches[3] && gripMatches[4]) {
      subType = gripMatches[4].trim();
      hands = gripMatches[3].trim();
    }

    hands = hands === i18n.__("Two Handed") ? 2 : 1;

    if (twoHandedItems.includes(subType)) {
      hands = 2;
    }

    this.item.type = type;
    this.item.subType = subType;
    this.item.hands = hands;
  }

  parseItem(type) {
    this.item.type = i18n.__("Item");
    this.item.subType = type;

    if (amuletTypes.includes(this.item.subType)) {
      this.item.subType = i18n.__("Amulet");
    } else if (beltTypes.includes(this.item.subType)) {
      this.item.subType = i18n.__("Belt");
    }
  }

  parseType() {
    let raw = this.blocks.block(2).toString();

    // Weapons
    let weapon = this.blocks.lineMatch(weaponsTypesPattern);

    if (weapon) {
      return this.parseWeapon(weapon[0]);
    }

    // Items
    let item = this.blocks.lineMatch(itemTypesPattern);

    if (item) {
      return this.parseItem(item[0]);
    }
  }

  parse() {
    this.isIdentified();
    this.isCorrupted();
    this.parseRarity();
    this.parseName();
    this.parseBaseName();
    this.parseQuality();
    this.parseSockets();
    this.parseLevel();
    this.parseType();

    console.log(this);

    return this.item;
  }
}

module.exports = ItemParser;
