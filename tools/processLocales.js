const { writeFile, makeDirOnce, format } = require("./helpers");
const { locales, labels } = require("./config");

const outputDir = `${__dirname}/locales`;

makeDirOnce(outputDir);

let totalItems = 0;

locales.forEach(locale => {
  let i18n = {};
  let lang = locale[0];
  let items = {};
  let categories = require(`./data/${lang}/items.json`);

  categories.forEach((category, labelIndex) => {
    let usLabel = labels[labelIndex];

    if (!usLabel) {
      usLabel = category.label;
      console.log(">> WARNING: New label ", usLabel);
    }

    items[usLabel] = [];

    if (lang !== "us") {
      let translate = require(`./data/${lang}/translate.json`);
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
      let matches = item.text.match(regexp);
      if (matches) {
        let regexp = new RegExp(`${item[key]} ?`);
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

      items[usLabel].push(item);
    });
  });

  if (lang !== "us") {
    writeFile(`${outputDir}/${lang}.json`, format(i18n));
  } else {
    console.log(`${totalItems} items found !`);
  }

  writeFile(`${outputDir}/${lang}/items.json`, format(items));
});
