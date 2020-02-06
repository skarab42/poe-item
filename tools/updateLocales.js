const { writeFile, makeDirOnce, format } = require("./helpers");
const { locales, labels } = require("./config");

const outputDir = `${__dirname}/locales`;

makeDirOnce(outputDir);

let totalItems = 0;

locales.forEach(locale => {
  const i18n = {};
  const lang = locale[0];

  updateItems(i18n, lang);
  updateStats(i18n, lang);

  writeFile(`${outputDir}/${lang}.json`, format(i18n));
});

function updateStats(i18n, lang) {
  const stats = {};
  const categories = require(`./data/${lang}/stats.json`);

  categories.forEach(category => {
    const usLabel = category.entries[0].type;
    i18n[usLabel] = category.label.toLowerCase();
    stats[usLabel] = [];

    category.entries.forEach(state => {
      delete state.type;
      stats[usLabel].push(state);
    });
  });

  writeFile(`${outputDir}/${lang}/stats.json`, format(stats));
}

function updateItems(i18n, lang) {
  const items = {};
  const categories = require(`./data/${lang}/items.json`);

  categories.forEach((category, labelIndex) => {
    let usLabel = labels[labelIndex];

    if (!usLabel) {
      usLabel = category.label;
      console.log(">> WARNING: New label ", usLabel);
    }

    items[usLabel] = [];

    if (lang !== "us") {
      const translate = require(`./data/${lang}/translate.json`);
      i18n[usLabel] = translate[usLabel] || "__UNDEFINED__";
    } else {
      const count = category.entries.length;
      console.log(`- ${usLabel} (${count})`);
      totalItems += count;
    }

    function replaceNameType(item, key) {
      if (!item[key]) {
        return;
      }

      let regexp = new RegExp(`(${item[key]})(?: (.*))`);
      const matches = item.text.match(regexp);

      if (matches) {
        regexp = new RegExp(`${item[key]} ?`);
        item.text = item.text.replace(regexp, "");
      }
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

      if (["Accessory", "Armour", "Currency", "Weapon"].includes(usLabel)) {
        item.subCategory = item.type.split(" ")[0];
      }

      items[usLabel].push(item);
    });
  });

  if (lang === "us") {
    console.log(`${totalItems} items found !`);
  }

  writeFile(`${outputDir}/${lang}/items.json`, format(items));
}
