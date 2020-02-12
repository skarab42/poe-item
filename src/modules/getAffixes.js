import stats from "../../locales/stats.js";
import escapeRegExp from "../helpers/escapeRegExp.js";
import removeParentheses from "../helpers/removeParentheses.js";

const plusPattern = "(?:\\+?)";
const numberPattern = `${plusPattern}?[0-9]+(?:\\.[0-9]+)?`;
const typePattern = "(?: )\\([^\\)]+\\)";

const localStats = {
  stat_1062208444: ["armour"], // #% increased Armour
  stat_3484657501: ["armour"], // # to Armour
  stat_3321629045: ["armour", "energyShield"], // #% increased Armour and Energy Shield
  stat_2451402625: ["armour", "evasionRating"], // #% increased Armour and Evasion
  stat_3523867985: ["armour", "evasionRating", "energyShield"], // #% increased Armour, Evasion and Energy Shield
  stat_4052037485: ["energyShield"], // # to maximum Energy Shield
  stat_4015621042: ["energyShield"], // #% increased Energy Shield
  stat_1940865751: ["physicalDamage"], // Adds # to # Physical Damage
  stat_53045048: ["evasionRating"], // # to Evasion Rating
  stat_124859000: ["evasionRating"], // #% increased Evasion Rating
  stat_1999113824: ["evasionRating", "energyShield"], // #% increased Evasion and Energy Shield
  stat_210067635: ["attacksPerSecond"], // #% increased Attack Speed
  stat_691932474: ["criticalStrikeChance"], // # to Accuracy Rating
  stat_709508406: ["fireDamage"], // Adds # to # Fire Damage
  stat_1037193709: ["coldDamage"], // Adds # to # Cold Damage
  stat_3336890334: ["lightningDamage"], // Adds # to # Lightning Damage
  stat_2223678961: ["chaosDamage"], // Adds # to # Chaos Damage
  stat_3885634897: ["chaosDamage", "physicalDamage"] // #% chance to Poison on Hit
};

function normalizeStat(stat, localWord) {
  const clone = { ...stat };
  const isLocalStatPattern = new RegExp(` \\(${localWord}\\)$`);
  clone.isLocal = clone.text.match(isLocalStatPattern);

  if (clone.isLocal) {
    clone.text = clone.text.replace(isLocalStatPattern, "");
  }

  return clone;
}

function findAffix(block, stat) {
  const pattern = escapeRegExp(stat.text).replace(/#/g, `(${numberPattern})`);
  const matches = block.matchAll(`^${pattern}(${typePattern})?$`);
  return matches.length ? matches : null;
}

function normalizeValues(stat, values) {
  values = [...values];
  let text = values.shift();
  let type = values.pop();
  let augments = undefined;
  let priority = 0;
  if (type) {
    priority = 1;
    text = text.replace(type, "");
    type = removeParentheses(type);
  } else if (stat.isLocal) {
    priority = 2;
    type = "local";
    stat.ids.local = Object.values(stat.ids)[0];
    augments = localStats[stat.ids.local];
  } else {
    type = "explicit";
  }
  let id = stat.ids[type];
  values = values.map(parseFloat);
  return { type, id, augments, text, values, priority };
}

export default function getAffixes() {
  let affixes = [];

  stats[this.item.locale].forEach(stat => {
    stat = normalizeStat(stat, this.__("Local"));

    const matches = findAffix(this.blocks, stat);

    if (!matches) {
      return null;
    }

    matches.forEach(values => {
      const affix = normalizeValues(stat, values);
      const index = affixes.findIndex(a => a.text === affix.text);

      if (index !== -1) {
        const found = affixes[index];

        if (found.priority > affix.priority) {
          return null;
        }

        affixes.splice(index, 1);
      }

      affixes.push(affix);
    });
  });

  const affixesCount = affixes.length;

  if (affixesCount) {
    this.item.affixesCount = affixesCount;
    this.item.affixes = affixes.map(affix => {
      delete affix.priority;
      return affix;
    });
  }
}
