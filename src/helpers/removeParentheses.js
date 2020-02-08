export default function removeParentheses(string) {
  return string.replace(/^ *\(|\) *$/g, "");
}
