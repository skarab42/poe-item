const axios = require("axios");
const fs = require("fs");

const translateUrl = "web.poecdn.com/js/translate";

const locales = [
  ["us", "us_US", "English", "www.pathofexile.com/api"],
  ["br", "pt_BR", "Português Brasileiro", "br.pathofexile.com/api"],
  ["ru", "ru_RU", "Русский", "ru.pathofexile.com/api"],
  ["th", "th_TH", "ไทย", "th.pathofexile.com/api"],
  ["de", "de_DE", "Deutsch", "de.pathofexile.com/api"],
  ["fr", "fr_FR", "Français", "fr.pathofexile.com/api"],
  ["es", "es_ES", "Español", "es.pathofexile.com/api"],
  ["kr", "ko_KR", "한국어", "poe.game.daum.net/api"]
];

function format(string) {
  return JSON.stringify(string, null, "  ");
}

function evalFormat(string, key = "__") {
  return new Function(`${string}; return JSON.stringify(${key}, null, "  ")`)();
}

async function getFile(url) {
  console.log("GET:", url);
  return await axios.get(url).then(response => response.data);
}

function writeFile(lang, file, data) {
  const path = `./locales/${lang}/${file}`;
  fs.writeFileSync(path, data);
  console.log("WRITED:", path);
}

async function getTranslateFile(locale) {
  return await getFile(`https://${translateUrl}.${locale}.js`);
}

async function writeTranslateFile(lang, locale) {
  const data = await getTranslateFile(locale);
  writeFile(lang, "translate.json", evalFormat(data));
}

async function getTradeDataFile(url, type) {
  return await getFile(`https://${url}/trade/data/${type}`);
}

function uniqueFilter(value, index, self) {
  return self.indexOf(value) === index;
}

async function writeTradeDataFile(lang, url, type) {
  const data = await getTradeDataFile(url, type);
  let output = data.result;

  if (type === "items") {
    output = {};
    data.result.forEach((item, i) => {
      let label = item.label || "Uncategorized";
      output[label] = [];

      item.entries.forEach((entry, j) => {
        if (entry.name) {
          output[label].push(entry.name);
        }

        output[label].push(entry.type);
      });

      output[label] = output[label].filter(uniqueFilter);
    });
  }

  writeFile(lang, `${type}.json`, format(output));
}

locales.forEach(async item => {
  const lang = item[0];
  const locale = item[1];
  const apiUrl = item[3];
  const path = `./locales/${lang}`;

  if (lang !== "us") {
    await writeTranslateFile(lang, locale);
    await writeTradeDataFile(lang, apiUrl, "items");
    await writeTradeDataFile(lang, apiUrl, "stats");
    await writeTradeDataFile(lang, apiUrl, "static");
  }
});
