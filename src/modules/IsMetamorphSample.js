import escapeRegExp from "../helpers/escapeRegExp";

export default function isMetamorphSample() {
  const search = this.__("sentences.isMetamorphSample");

  if (this.blocks.matchLine(escapeRegExp(search))) {
    this.item.isMetamorphSample = true;
  }
}
