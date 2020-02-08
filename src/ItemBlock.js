import ItemBlockBase from "./ItemBlockBase";
import ItemBlockLine from "./ItemBlockLine";

export default class ItemBlock extends ItemBlockBase {
  constructor(raw) {
    super(raw);
    this.lines = this.raw.split(/\r?\n/).map(line => new ItemBlockLine(line));
  }

  line(num) {
    return this.lines[num - 1] || new ItemBlockLine();
  }
}
