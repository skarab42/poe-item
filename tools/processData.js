const { makeDirOnce, asyncForEach, writeFile, format } = require("./helpers");
const { localesDir, locales, itemCategories } = require("./config");

makeDirOnce(localesDir);

let totalItems = 0;

function replaceNameType(item, key) {
  if (!item[key]) return;

  let regexp = new RegExp(`(${item[key]})(?: (.*))`);
  const matches = item.text.match(regexp);

  if (matches) {
    regexp = new RegExp(`${item[key]} ?`);
    item.text = item.text.replace(regexp, "");
  }
}

function processItems(locale) {
  const items = {};
  const categories = require(`./data/${locale}/items.json`);

  categories.forEach((category, labelIndex) => {
    let categoryLabel = itemCategories[labelIndex];

    if (!categoryLabel) {
      categoryLabel = category.label;
      console.log(">> WARNING: New label ", categoryLabel);
    }

    items[categoryLabel] = [];

    if (locale === 'us') {
      const count = category.entries.length;
      console.log(`- ${categoryLabel} (${count})`);
      totalItems += count;
    }

    category.entries.forEach(item => {
      delete item.flags;
      delete item.disc;

      if (item.type === item.text) {
        delete item.text;
      } else {
        const text = `${item.name} ${item.type}`;
        if (item.text === text) {
          delete item.text;
        } else {
          replaceNameType(item, "name");
          replaceNameType(item, "type");
          if (item.text && item.text[0] === "(") {
            item.text = item.text.slice(1, -1);
          }
        }
      }

      if (["Accessory", "Armour", "Currency", "Weapon"].includes(categoryLabel)) {
        item.subCategory = item.type.split(" ")[0];
      }

      items[categoryLabel].push(item);
    });
  });

  if (locale === 'us') {
    console.log(`${totalItems} items found !`);
  }

  writeFile(`${localesDir}/${locale}/items.json`, format(items));
}

function stripTags(string) {
  const matches = string.match(/\{([^\}]+)\}/);
  return matches ? matches[1] : string;
}

function idFactory(id) {
  const parts = id.split('.');
  return { type: parts.shift(), value: parts.shift() }
}

function processStats(locale) {
  const stats = [];
  const categories = require(`./data/${locale}/stats.json`);

  categories.forEach(category => {
    category.entries.forEach(state => {
      const id = idFactory(state.id);
      let text = stripTags(state.text)

      if (id.type === 'monster') {
        text = text.replace("(×#)", "").trim();
      }

      const found = stats.find(s => s.text === text);

      if (found) {
        found.ids[id.type] = id.value;
        return;
      }

      stats.push({ text, ids: { [id.type]: id.value } });
    });
  });

  writeFile(`${localesDir}/${locale}/stats.json`, format(stats));
}

locales.forEach(([locale]) => {
  processItems(locale);
  processStats(locale);
});
