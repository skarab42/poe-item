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
    const pattern = `${propName}([^:]+)?:(.+)`;
    const matches = this.lineMatch(pattern, "mi");

    let value = null;
    let extra = null;

    if (matches) {
      value = (matches[2] + "").trim();
      extra = (matches[1] + "").trim().replace(/^\(|\)$/g, "");
    }

    return { name, propName, value, extra };
  }

  toString() {
    return this.raw;
  }
}

module.exports = ItemBlockBase;
