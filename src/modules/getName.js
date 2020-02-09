export default function getName() {
  const line = this.blocks.block(1).line(2);

  if (!line.length) {
    this.undefinedProp("Name");
  }

  this.item.name = line.toString();
}
