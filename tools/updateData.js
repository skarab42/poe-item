const { writeFile, makeDirOnce, format, evalFormat } = require("./helpers");
const { locales } = require("./config");
const axios = require("axios");

const outputDir = `${__dirname}/data`;
const translateUrl = "web.poecdn.com/js/translate";

makeDirOnce(outputDir);

async function getFile(url) {
  console.log("GET:", url);
  return await axios.get(url).then(response => response.data);
}

async function getTranslateFile(locale) {
  return await getFile(`https://${translateUrl}.${locale}.js`);
}

async function writeTranslateFile(lang, locale) {
  const data = await getTranslateFile(locale);
  writeFile(`${outputDir}/${lang}/translate.json`, evalFormat(data));
}

async function getTradeDataFile(url, type) {
  return await getFile(`https://${url}/trade/data/${type}`);
}

async function writeTradeDataFile(lang, url, type) {
  const data = await getTradeDataFile(url, type);
  writeFile(`${outputDir}/${lang}/${type}.json`, format(data.result));
}

locales.forEach(async item => {
  const lang = item[0];
  const locale = item[1];
  const apiUrl = item[3];

  if (lang !== "us") {
    await writeTranslateFile(lang, locale);
  }

  await writeTradeDataFile(lang, apiUrl, "items");
  await writeTradeDataFile(lang, apiUrl, "stats");
  await writeTradeDataFile(lang, apiUrl, "static");
});
