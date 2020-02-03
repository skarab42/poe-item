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

async function writeTradeDataFile(lang, url, type) {
  const data = await getTradeDataFile(url, type);
  writeFile(lang, `${type}.json`, format(data.result));
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

// function getFile(lang, apiUrl, uri, output) {
//   const url = `https://${apiUrl}/${uri}`;
//   console.log("GET:", url);
//   axios
//     .get(url)
//     .then(response => {
//       const path = `./locales/${lang}`;
//       const file = `${path}/${output}.json`;
//       const data = format(response.data.result);
//       !fs.existsSync(path) && fs.mkdirSync(path);
//       fs.writeFileSync(file, data);
//       console.log("WRITED:", file);
//     })
//     .catch(error => {
//       console.log("ERROR:", error);
//     });
// }
//
// locales.forEach(locale => {
//   // getFile(locale[0], locale[3], "trade/data/items", "items");
//   // getFile(locale[0], locale[3], "trade/data/stats", "stats");
//   // getFile(locale[0], locale[3], "trade/data/static", "static");
//   if (locale[0] !== "us") {
//     getFile(locale[0], translateUrl, `translate.${locale[1]}.js`, "sentences");
//   }
// });
