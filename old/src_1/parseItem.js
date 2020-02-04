const ItemParser = require("./parser/ItemParser");

function parseItem(rawItem) {
  const parser = new ItemParser(rawItem);
  return parser.parse();
}

module.exports = parseItem;
