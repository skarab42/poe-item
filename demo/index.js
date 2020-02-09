console.log("Path of Exile Item Parser Demo");

const { ItemParser, i18n } = require("poe-item");
const itemParser = new ItemParser();

i18n.set("us.demo.inputPlaceholder", "Copy/Past your item from PoE here...");
i18n.set(
  "fr.demo.inputPlaceholder",
  "Copiez/Collez votre article depuis PoE ici..."
);

// GUI
const $input = document.querySelector("#input");
const $output = document.querySelector("#output");

$input.addEventListener("input", onInputChange);
$input.addEventListener("focus", $input.select);
$output.addEventListener("focus", $output.select);

$input.value = localStorage.getItem("PoEItem") || "";
$input.setAttribute("placeholder", i18n.__("demo.inputPlaceholder"));

// Parse
function parseItem(item) {
  item = item.trim();
  $input.value = item;
  $output.value = "";
  localStorage.setItem("PoEItem", item);
  if (!item.length) return;
  try {
    console.log("parseItem:", { item });
    const data = itemParser.parse(item);
    $output.value = JSON.stringify(data, null, "  ");
    $input.setAttribute("placeholder", i18n.__("demo.inputPlaceholder"));
  } catch (error) {
    console.error(error);
    $output.value = error.message;
  }
}

function onInputChange() {
  trottle(500, () => parseItem($input.value));
}

parseItem($input.value);

// Helpers
let trottleTimeout = null;

function trottle(delay, callback) {
  clearTimeout(trottleTimeout);
  trottleTimeout = setTimeout(callback, delay);
}
