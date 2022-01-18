export function makeFont(fontName, targetChar) {
  const glyphs = [];
  const max = 1000;
  function scale(x) { return x * (max/2) + (max/2)}

  // The .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: max,
    path: new opentype.Path()
  });
  glyphs.push(notdefGlyph);

  const path = new opentype.Path();
  // https://github.com/opentypejs/opentype.js
  
  const pull = -0.4;
  const steps = 3;
  const increment = 2 * Math.PI / steps
  const controlPairs = [];
  for (let i=0; i<=steps; i++) {
    const theta = increment * i;
    const outward = [Math.cos(theta), Math.sin(theta)];
    const forward = [Math.cos(theta + increment * 2),
                     Math.sin(theta + increment * 2)];
    const inward = [pull * Math.cos(theta + increment * 1.5),
                    pull * Math.sin(theta + increment * 1.5)];
    const next = [Math.cos(theta + increment), Math.sin(theta + increment)];
    controlPairs.push([outward, forward]);
    controlPairs.push([forward, inward]);
    controlPairs.push([inward, next]);
  }
  const firstPair = controlPairs.shift();
  path.moveTo(
    scale((firstPair[0][0] + firstPair[1][0])/2),
    scale((firstPair[0][1] + firstPair[1][1])/2)
  );
  controlPairs.forEach(([lastControl, nextControl]) => {
    path.quadTo(
      scale(lastControl[0]),
      scale(lastControl[1]),
      scale((lastControl[0] + nextControl[0])/2),
      scale((lastControl[1] + nextControl[1])/2),
    );
  })

  console.log(path);
  // more drawing instructions...
  const aGlyph = new opentype.Glyph({
    name: targetChar,
    unicode: targetChar.codePointAt(),
    advanceWidth: max,
    path: path
  });
  glyphs.push(aGlyph)

  const font = new opentype.Font({
    familyName: fontName,
    styleName: 'Medium',
    unitsPerEm: max,
    ascender: max,
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
