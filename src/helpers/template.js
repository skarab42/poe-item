export default function template(text, args) {
  let tag, value;

  Object.keys(args).forEach(arg => {
    tag = `{{${arg}}}`;
    value = args[arg] || tag;
    text = text.replace(tag, value);
  });

  return text;
}
