export function makeFont(targetChar) {
  // Create the bézier paths for each of the glyphs.
  // Note that the .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 650,
    path: new opentype.Path()
  });
  const glyphs = [notdefGlyph];
  const aPath = new opentype.Path();
  aPath.moveTo(100, 0);
  aPath.lineTo(100, 700);
  aPath.lineTo(100, 800);
  aPath.lineTo(500, 500);
  // more drawing instructions...
  const aGlyph = new opentype.Glyph({
    name: targetChar,
    unicode: targetChar.codePointAt(),
    advanceWidth: 650,
    path: aPath
  });
  glyphs.push(aGlyph)

  const font = new opentype.Font({
    familyName: 'Demo',
    styleName: 'Medium',
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
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
