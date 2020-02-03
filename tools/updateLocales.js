const axios = require("axios");
const fs = require("fs");

const locales = [
  ["us", "English", "www.pathofexile.com/api"],
  ["br", "Português Brasileiro", "br.pathofexile.com/api"],
  ["ru", "Русский", "ru.pathofexile.com/api"],
  ["th", "ไทย", "th.pathofexile.com/api"],
  ["de", "Deutsch", "de.pathofexile.com/api"],
  ["fr", "Français", "fr.pathofexile.com/api"],
  ["es", "Español", "es.pathofexile.com/api"],
  ["kr", "한국어", "poe.game.daum.net/api"]
];

function format(string) {
  return JSON.stringify(string, null, "  ");
}

function getFile(lang, apiUrl, uri, output) {
  const url = `https://${apiUrl}/${uri}`;
  console.log("GET:", url);
  axios
    .get(url)
    .then(response => {
      const path = `./locales/${lang}`;
      const file = `${path}/${output}.json`;
      const data = format(response.data.result);
      !fs.existsSync(path) && fs.mkdirSync(path);
      fs.writeFileSync(file, data);
      console.log("WRITED:", file);
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}

locales.forEach(locale => {
  getFile(locale[0], locale[2], "trade/data/items", "items");
  getFile(locale[0], locale[2], "trade/data/stats", "stats");
  getFile(locale[0], locale[2], "trade/data/static", "static");
});
