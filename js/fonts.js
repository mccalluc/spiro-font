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
  glyphs.push(makeGlyph('0', stencil.getPath('ABCDEF'.split(''))));
  glyphs.push(makeGlyph('1', stencil.getPath('BC'.split(''))));
  glyphs.push(makeGlyph('2', stencil.getPath('ABGED'.split(''))));
  glyphs.push(makeGlyph('3', stencil.getPath('ABCDG'.split(''))));
  glyphs.push(makeGlyph('4', stencil.getPath('BCFG'.split(''))));
  glyphs.push(makeGlyph('5', stencil.getPath('ACDFG'.split(''))));
  glyphs.push(makeGlyph('6', stencil.getPath('ACDEFG'.split(''))));
  glyphs.push(makeGlyph('7', stencil.getPath('ABC'.split(''))));
  glyphs.push(makeGlyph('8', stencil.getPath('ABCDEFG'.split(''))));
  glyphs.push(makeGlyph('9', stencil.getPath('ABCDFG'.split(''))));

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
