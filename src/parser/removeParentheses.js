module.exports = function removeParentheses(string) {
  return string.replace(/^ *\(|\) *$/g, "");
};
