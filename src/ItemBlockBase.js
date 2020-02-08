import { __ } from "./i18n";

export default class ItemBlockBase {
  constructor(raw) {
    this.raw = (raw || "").trim();
  }

  match(pattern, flags = "gmi") {
    return this.raw.match(new RegExp(pattern, flags)) || null;
  }

  matchLine(pattern, flags = "gmi") {
    return this.match(`^${pattern}$`, flags);
  }

  matchAll(pattern, flags = "gmi") {
    const matches = this.raw.matchAll(new RegExp(pattern, flags));
    return matches ? [...matches] : null;
  }

  prop(usLabel) {
    const label = __(usLabel);
    const pattern = `${label} *([^:]+)?: *(.+)`;
    const matches = this.matchLine(pattern, "mi");

    if (!matches) {
      return null;
    }

    return { label, usLabel, labelExtra: matches[1], value: matches[2] };
  }

  toString() {
    return this.raw;
  }
}
