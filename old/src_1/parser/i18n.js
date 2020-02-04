const messages = require("../../locales/fr.json");

const i18n = {
  __(text, args = {}) {
    let ret = messages[text] || text;
    Object.keys(args).forEach(key => {
      ret = ret.replace(`{{${key}}}`, args[key]);
    });
    return ret;
  }
};

module.exports = i18n;
