// https://stackoverflow.com/a/6969486
module.exports = function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
