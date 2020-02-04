const escapeRegExp = require("../escapeRegExp");

module.exports = function IsMetamorphSample() {
  const search = this.i18n(
    "Combine this with four other different samples in Tane's Laboratory."
  );
  this.item.IsMetamorphSample =
    !!this.blocks.lineMatch(escapeRegExp(search)) || undefined;
};
