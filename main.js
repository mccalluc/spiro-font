import Stencil from './Stencil.js';

const width = 16

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
  glyphs.push(makeGlyph('0', stencil.getPath('A', 'C', 'D', 'E', 'F', 'G')));
  glyphs.push(makeGlyph('1', stencil.getPath('F', 'G')));
  glyphs.push(makeGlyph('2', stencil.getPath('A', 'B', 'C', 'E', 'F')));
  glyphs.push(makeGlyph('3', stencil.getPath('A', 'B', 'C', 'F', 'G')));
  glyphs.push(makeGlyph('4', stencil.getPath('B', 'D', 'F', 'G')));
  glyphs.push(makeGlyph('5', stencil.getPath('A', 'B', 'C', 'D', 'G')));
  glyphs.push(makeGlyph('6', stencil.getPath('A', 'B', 'C', 'D', 'E', 'G')));
  glyphs.push(makeGlyph('7', stencil.getPath('A', 'F', 'G')));
  glyphs.push(makeGlyph('8', stencil.getPath('A', 'B', 'C', 'D', 'E', 'F', 'G')));
  glyphs.push(makeGlyph('9', stencil.getPath('A', 'B', 'C', 'D', 'F', 'G')));

  const font = new opentype.Font({
    familyName: fontName,
    styleName: 'Medium',
    unitsPerEm: width, // Must be between 16 and 16384.
    ascender: width,
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
