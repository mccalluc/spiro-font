import Stencil from './Stencil.js';

const width = 100;

function makeGlyph(character, path) {
  return new opentype.Glyph({
    name: character,
    unicode: character.codePointAt(),
    advanceWidth: width,
    path: path
  });
}

export function makeFont(fontName) {
  const glyphs = [];

  // The .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: width,
    path: new opentype.Path()
  });
  glyphs.push(notdefGlyph);

  const stencil = new Stencil();
  const segmentMap = {
    '0': 'ABCDEF',
    '1': 'BC',
    '2': 'ABGED',
    '3': 'ABCDG',
    '4': 'BCFG',
    '5': 'ACDFG',
    '6': 'ACDEFG',
    '7': 'ABC',
    '8': 'ABCDEFG',
    '9': 'ABCDFG',
    'G': 'ACDEF',
    'E': 'ADEFG',
    'T': 'ABC',
    'F': 'AEFG',
    'O': 'ABCDEF',
    'N': 'ABCEF',
    ' ': ''   
  }
  for (let label in segmentMap) {
    glyphs.push(makeGlyph(label, stencil.getPath(segmentMap[label].split(''))));
  }

  const font = new opentype.Font({
    familyName: fontName,
    styleName: 'Medium',
    unitsPerEm: width, // Must be between 16 and 16384.
    ascender: 160, // Must not be less than the max used by the paths.
    descender: 0,
    glyphs: glyphs
  });
  return font;
}

function fontAsBase64(font) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(font.toArrayBuffer())));
}

export function makeCssFontFace(fontName, font) {
  const fontBase64 = fontAsBase64(font);
  return `
@font-face {
  font-family: "${fontName}";
  src: url('data:font/opentype;base64,${fontBase64}');
}`;
}
