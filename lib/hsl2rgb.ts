const { abs, min, max, round } = Math;

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h: number, s: number, l: number): string {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return (
    "#" +
    decimalToHex(round(r * 255), 2) +
    decimalToHex(round(g * 255), 2) +
    decimalToHex(round(b * 255), 2)
  );
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function decimalToHex(d: number, padding: number): string {
  let hex: string = Number(d).toString(16);
  padding =
    typeof padding === "undefined" || padding === null
      ? (padding = 2)
      : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
}

export default function generateColors(
  hue: number,
  minSat: number,
  maxSat: number,
  minLight: number,
  maxLight: number,
  count: number
): string[] {
  let stepLight = (maxLight - minLight) / count;
  let stepSat = (maxSat - minSat) / count;
  let colors: string[] = [];

  let light = minLight;
  let saturation = minSat;
  for (let i = 0; i < count; ++i) {
    colors.push(hslToRgb(hue, saturation, light));
    saturation += stepSat;
    light += stepLight;
  }
  return colors;
}
