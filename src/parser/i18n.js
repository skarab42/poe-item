const translate = {
  br: require("../../locales/br/translate.json"),
  ru: require("../../locales/ru/translate.json"),
  th: require("../../locales/th/translate.json"),
  de: require("../../locales/de/translate.json"),
  fr: require("../../locales/fr/translate.json"),
  es: require("../../locales/es/translate.json"),
  kr: require("../../locales/kr/translate.json")
};

const locales = {
  br: require("../../locales/br/index.json"),
  ru: require("../../locales/ru/index.json"),
  th: require("../../locales/th/index.json"),
  de: require("../../locales/de/index.json"),
  fr: require("../../locales/fr/index.json"),
  es: require("../../locales/es/index.json"),
  kr: require("../../locales/kr/index.json")
};

let locale = "fr";
let messages = locales[locale];
let fallback = translate[locale];

const i18n = {
  __(text, args = {}) {
    if (!messages[text]) {
      console.log(
        `%c "${text}":"${fallback[text] || text}",`,
        "background: #222; color: #bada55"
      );
    }

    let ret = messages[text] || fallback[text] || text;

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
    fallback = translate[locale] || {};
  }
};

module.exports = i18n;
