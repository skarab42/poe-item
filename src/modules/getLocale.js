export default function getLocale() {
  const rarityLine = this.blocks.block(1).line(1);
  const locales = this.i18n.getLocales();

  const found = locales.find(locale => {
    const rarityLabel = this.i18n.get(`${locale}.Rarity`);
    const matches = rarityLine.match(`^${rarityLabel}:`);

    if (matches) {
      this.i18n.setLocale(locale);
      this.item.locale = locale;
      return true;
    }
  });

  if (!found) {
    this.fatalError("undefinedItemLocale: [{{locales}}]", {
      locales: locales.join()
    });
  }
}
