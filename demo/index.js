console.log("Path of Exile Item Parser Demo");

const { ItemParser, i18n } = require("poe-item");
const itemParser = new ItemParser();

i18n.set("us.demo.inputPlaceholder", "Copy/Past your item from PoE here...");
i18n.set("fr.demo.inputPlaceholder", "Copiez/Collez votre article depuis PoE ici...");

// GUI
const $body = document.querySelector("body");
const $input = document.querySelector("#input");
const $output = document.querySelector("#output");
const $lang = document.querySelector("#lang");

$lang.addEventListener("change", onLangChange);
$input.addEventListener("input", onInputChange);
$input.addEventListener("focus", $input.select);
$output.addEventListener("focus", $output.select);

$input.value = localStorage.getItem("PoEItem") || "";

// Languages
const locales = ["fr", "us"];
let locale = localStorage.getItem("PoELocale") || i18n.getLocale() || locales[0];

locales.forEach(value => {
  const $option = document.createElement("option");
  $option.setAttribute("value", value);
  $option.innerText = value;

  if (locale === value) {
    $option.setAttribute("selected", "selected");
  }

  $lang.appendChild($option);
});

function setLocale(newLocale) {
  locale = newLocale;
  i18n.setLocale(locale);
  console.log('setLocale:', { locale });
  localStorage.setItem("PoELocale", locale);
  $input.setAttribute("placeholder", i18n.__("demo.inputPlaceholder"));
}

function onLangChange() {
  setLocale($lang.value);
  parseItem($input.value);
}

// Parse
function parseItem(item) {
  item = item.trim();
  $input.value = item;
  localStorage.setItem("PoEItem", item);
  if (!item.length) return;
  console.log('parseItem:', { item });
  try {
    const data = itemParser.parse(item);
    $output.value = JSON.stringify(data, null, "  ");
  } catch (error) {
    console.error(error);
    $output.value = error.message;
  }
}

function onInputChange() {
  trottle(500, () => parseItem($input.value));
}

// Helpers
let trottleTimeout = null;

function trottle(delay, callback) {
  clearTimeout(trottleTimeout);
  trottleTimeout = setTimeout(callback, delay);
}

// Init
setLocale(locale);
parseItem($input.value);
