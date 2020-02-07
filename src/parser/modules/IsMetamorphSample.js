const escapeRegExp = require("../escapeRegExp");

module.exports = function IsMetamorphSample() {
  const search = this.i18n(
    "Combine this with four other different samples in Tane's Laboratory."
  );

  if (this.blocks.lineMatch(escapeRegExp(search))) {
    this.item.IsMetamorphSample = true;
  }
};
