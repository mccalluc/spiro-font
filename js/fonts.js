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

export function makeFont(fontName, segmentMap, segments) {
  const glyphs = [];

  // The .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: width,
    path: new opentype.Path()
  });
  glyphs.push(notdefGlyph);

  const stencil = new Stencil(segments);
  for (let label in segmentMap) {
    const path = stencil.getFontPath(segmentMap[label].split(''));
    glyphs.push(makeGlyph(label, path));
  }

  const font = new opentype.Font({
    familyName: fontName,
    styleName: 'Medium',
    unitsPerEm: width, // Must be between 16 and 16384.
    ascender: 200, // Must not be less than the max used by the paths.
    descender: -20,
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
