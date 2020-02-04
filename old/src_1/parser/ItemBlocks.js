const ItemBlockBase = require("./ItemBlockBase");
const ItemBlock = require("./ItemBlock");

class ItemBlocks extends ItemBlockBase {
  constructor(raw) {
    super(raw);
    this.blocks = this.raw.split(/\r?\n--------\r?\n/);
    this.blocks = this.blocks.map(block => new ItemBlock(block));
  }

  block(block) {
    return this.blocks[block - 1];
  }
}

module.exports = ItemBlocks;
