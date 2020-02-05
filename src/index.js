const parseItem = require("./parseItem");
const i18n = require("./parser/i18n");

const locales = ["fr", "us"];
const locale = localStorage.getItem("PoELocale") || i18n.getLocale();

console.log("Path of Exile Item Parser");

const $body = document.querySelector("body");
const $input = document.querySelector("#input");
const $output = document.querySelector("#output");
const $lang = document.querySelector("#lang");

// i18n.setLocale(locale);

locales.forEach(value => {
  const $option = document.createElement("option");
  $option.setAttribute("value", value);
  $option.innerText = value;
  if (locale === value) {
    $option.setAttribute("selected", "selected");
  }
  $lang.appendChild($option);
});

let inputDelay = 500;
let inputTimer = null;

function getInputValue() {
  if (!$input.value.trim().length) {
    $output.value = "";
    return;
  }
  clearTimeout(inputTimer);
  inputTimer = setTimeout(function() {
    try {
      const data = parseItem($input.value);
      $output.value = JSON.stringify(data, null, "  ");
    } catch (error) {
      console.log(error);
      $output.value = error.message;
    }
  }, inputDelay);
}

function setLocale(locale) {
  i18n.setLocale(locale);
  $input.setAttribute(
    "placeholder",
    i18n.__("Copy/Past your item text from PoE here...")
  );
}

$input.value = localStorage.getItem("PoEItem") || ""; // DEBUG

$lang.addEventListener("change", () => {
  localStorage.setItem("PoELocale", $lang.value); // DEBUG
  setLocale($lang.value);
  getInputValue();
});

$input.addEventListener("input", () => {
  localStorage.setItem("PoEItem", $input.value); // DEBUG
  getInputValue();
});

$input.addEventListener("focus", $input.select);
$output.addEventListener("focus", $output.select);

setLocale($lang.value);
getInputValue();
