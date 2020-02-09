export default function getRequirements() {
  const block = this.blocks.block(3);
  const firstLine = block.line(1);

  if (!firstLine.length || !firstLine.match(`^${this.__("Requirements")}:`)) {
    return null;
  }

  this.item.requirements = {};

  block.lines.slice(1).forEach(line => {
    const parts = line.toString().split(":");
    const label = this.__(`props.requirements.${parts[0]}`);
    this.item.requirements[label] = parseInt(parts[1]);
  });
}
