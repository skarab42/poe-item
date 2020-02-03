const poe = require("../../pathofexile.com_/fr.js");
const fr = require("../../locales/fr.json");
const locales = { fr };

let locale = "fr";
let messages = locales[locale];

const i18n = {
  __(text, args = {}) {
    if (!messages[text]) {
      console.log(
        `%c "${text}":"${poe[text] || text}",`,
        "background: #222; color: #bada55"
      );
    }
    let ret = messages[text] || text;
    Object.keys(args).forEach(key => {
      const tag = `{{${key}}}`;
      const value = args[key] || tag;
      ret = ret.replace(tag, value);
    });
    return ret;
  },

  setLocale(newLocale) {
    locale = newLocale;
    messages = locales[locale];
  }
};

module.exports = i18n;
