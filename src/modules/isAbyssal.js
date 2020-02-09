export default function isAbyssal() {
  const abyssal = this.__("Abyssal");
  const matches = this.blocks.match(`^${abyssal} *$|^${abyssal} (.+)$`);

  if (matches) {
    this.item.isAbyssal = true;
  }
}
