!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("dot-prop")):"function"==typeof define&&define.amd?define(["exports","dot-prop"],t):t(e.poeItem={},e.dotProp)}(this,function(e,t){t=t&&t.hasOwnProperty("default")?t.default:t;var o=function(){console.log("new ItemParser")};o.prototype.parse=function(e){return console.log("ItemParser.parse",e),{}};var n=function(){this.locales={},this.locale=null};n.prototype.getLocale=function(){return this.locale},n.prototype.setLocale=function(e){this.locale=e},n.prototype.get=function(e,o){void 0===o&&(o=null),t.get(this.locales,e,o)},n.prototype.set=function(e,o){t.set(this.locales,e,o)},n.prototype.has=function(e){return t.has(this.locales,e)},n.prototype.delete=function(e){t.delete(this.locales,e)},n.prototype.localeKey=function(e,t){return void 0===t&&(t=null),(t||this.locale)+"."+e},n.prototype.__=function(e,o){void 0===o&&(o={});var n=this.localeKey(e);return function(e,t){var o;return Object.keys(t).forEach(function(n){e=e.replace(o="{{"+n+"}}",t[n]||o)}),e}(t.get(this.locales,n,n),o)};var r=new n,l=r.__;e.ItemParser=o,e.i18n=r,e.__=l});
//# sourceMappingURL=poe-item.umd.js.map
