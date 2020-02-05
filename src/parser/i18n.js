const locales = {
  br: require("../../locales/br.json"),
  ru: require("../../locales/ru.json"),
  th: require("../../locales/th.json"),
  de: require("../../locales/de.json"),
  fr: require("../../locales/fr.json"),
  es: require("../../locales/es.json"),
  kr: require("../../locales/kr.json")
};

let locale = "fr";
let messages = locales[locale];

const i18n = {
  __(text, args = {}) {
    if (!messages[text]) {
      console.log(
        `%c "${text}":"${text}",`,
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
    messages = locales[locale] || {};
  },

  getLocale() {
    return locale;
  }
};

module.exports = i18n;
