function parseColors(colors) {
  const iterations = {};

  colors.forEach(color => {
    if (!iterations[color]) {
      iterations[color] = 0;
    }

    iterations[color]++;
  });

  return iterations;
}

export default function getSockets() {
  const sockets = this.blocks.prop("Sockets");

  if (!sockets) {
    return null;
  }

  let count = 0;
  let links = 0;
  let maxLinks = 0;
  let groupsCount = 0;
  let totalColors = {};

  const groups = sockets.value.split(" ").map(group => {
    const colors = group.split("-");
    const colorsCount = parseColors(colors);
    const groupLinks = colors.length - 1;

    Object.entries(colorsCount).forEach(([key, val]) => {
      if (totalColors[key]) {
        totalColors[key] += val;
      } else {
        totalColors[key] = val;
      }
    });

    maxLinks = Math.max(maxLinks, groupLinks);
    count += colors.length;
    links += groupLinks;
    groupsCount++;

    return { colors, colorsCount, links: groupLinks };
  });

  this.item.sockets = {
    count,
    links,
    maxLinks,
    colors: totalColors,
    groupsCount,
    groups
  };
}
