const { makeDirOnce, asyncForEach, format, writeFile } = require("./helpers");
const { dataDir, locales } = require("./config");
const axios = require("axios");

makeDirOnce(dataDir);

async function getFile(url) {
  console.log("GET:", url);
  return await axios.get(url).then(response => response.data);
}

async function getTradeDataFile(url, type) {
  return await getFile(`https://${url}/trade/data/${type}`);
}

async function writeTradeDataFile(locale, url, type) {
  const data = await getTradeDataFile(url, type);
  writeFile(`${dataDir}/${locale}/${type}.json`, format(data.result));
}

asyncForEach(locales, async ([locale, , url]) => {
  await writeTradeDataFile(locale, url, "items");
  await writeTradeDataFile(locale, url, "stats");
  await writeTradeDataFile(locale, url, "static");
});
