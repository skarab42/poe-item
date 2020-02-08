import ItemBlockBase from "./ItemBlockBase";
import ItemBlock from "./ItemBlock";

export default class ItemBlocks extends ItemBlockBase {
  constructor(raw) {
    super(raw);
    this.blocks = this.raw
      .split(/\r?\n--------\r?\n/)
      .map(block => new ItemBlock(block));
  }

  block(block) {
    return this.blocks[block - 1] || new ItemBlock();
  }
}
