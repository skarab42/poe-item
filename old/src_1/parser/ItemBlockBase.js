const i18n = require("./i18n");

class ItemBlockBase {
  constructor(raw) {
    this.raw = raw.trim();
  }

  match(pattern, flags = "gmi") {
    return this.raw.match(new RegExp(pattern, flags));
  }

  lineMatch(pattern, flags = "gmi") {
    return this.match(`^${pattern}$`, flags);
  }

  prop(name) {
    const propName = i18n.__(name);
    const pattern = `${propName} ?(.+)?: (.+)`;
    const matches = this.lineMatch(pattern, "mi");

    if (!matches) {
      return null;
    }

    if (!matches[1]) {
      return matches[2];
    }

    return [matches[1].replace(/^\(|\)$/g, ""), matches[2]];
  }

  toString() {
    return this.raw;
  }
}

module.exports = ItemBlockBase;
