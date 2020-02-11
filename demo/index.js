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

$input.addEventListener("input", onInputChange);
$input.addEventListener("focus", $input.select);

$input.value = localStorage.getItem("PoEItem") || "";
$input.setAttribute("placeholder", i18n.__("demo.inputPlaceholder"));

const editor = ace.edit("editor"); // eslint-disable-line
editor.session.setMode("ace/mode/json");
editor.setReadOnly(true);

// Parse
function parseItem(item) {
  item = item.trim();
  $input.value = item;
  editor.session.setValue("");
  localStorage.setItem("PoEItem", item);
  if (!item.length) return;
  let value = "";
  try {
    console.log("parseItem:", { item });
    const data = itemParser.parse(item);
    value = JSON.stringify(data, null, "  ");
    $input.setAttribute("placeholder", i18n.__("demo.inputPlaceholder"));
  } catch (error) {
    console.error(error);
    value = error.message;
  }
  editor.session.setValue(value);
  editor.session.foldAll(1);
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
