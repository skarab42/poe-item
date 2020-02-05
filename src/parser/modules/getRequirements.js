module.exports = function getRequirements() {
  const block = this.blocks.block(3);
  const firstLine = block.line(1).toString();

  if (!firstLine.match(this.i18n("Requirements"))) {
    return null;
  }

  this.item.requirements = {};

  const lines = block.lines.slice(1).forEach(line => {
    const parts = line.toString().split(":");
    const label = this.i18n(`${parts[0]}.prop`);
    this.item.requirements[label] = parseInt(parts[1]);
  });

  console.log(lines);
};
