// https://stackoverflow.com/a/6969486
export default function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
