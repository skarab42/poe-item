const parseItem = require("./parseItem");

console.log("Path of Exile Item Parser");

const $body = document.querySelector("body");
const $input = document.querySelector("#input");
const $output = document.querySelector("#output");

let inputDelay = 500;
let inputTimer = null;

function getInputValue() {
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

$input.value = localStorage.getItem("PoEItem"); // DEBUG
getInputValue();

$input.addEventListener("input", () => {
  localStorage.setItem("PoEItem", $input.value); // DEBUG
  getInputValue();
});

$input.addEventListener("focus", $input.select);
$output.addEventListener("focus", $output.select);
