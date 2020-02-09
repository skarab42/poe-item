export default function camelize(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word, i) => {
      return i ? word[0].toUpperCase() + word.slice(1) : word;
    })
    .join("");
}
