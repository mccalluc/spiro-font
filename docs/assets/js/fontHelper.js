import Stencil from './Stencil.js';

function makeGlyph(character, path) {
  return new opentype.Glyph({
    name: character,
    unicode: character.codePointAt(),
    advanceWidth: 130,
    path: path
  });
}

function fillLowerCase(segmentMap) {
  const chars = new Set(Object.keys(segmentMap));
  const uppersWithoutLowers = Array.from(chars).filter(
    char => !chars.has(char.toLowerCase())
  );
  const lowersMap = Object.fromEntries(uppersWithoutLowers.map(
    char => [char.toLowerCase(), segmentMap[char]]
  ));
  return {...segmentMap, ...lowersMap};
}

export function makeFont({fontName, segmentMap, segments, shrink, grow, bevel}) {
  const glyphs = [];

  // The .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 0,
    path: new opentype.Path()
  });
  glyphs.push(notdefGlyph);

  const stencil = new Stencil({segments, shrink, grow, bevel});
  const upperAndLowerMap = fillLowerCase(segmentMap);
  for (let label in upperAndLowerMap) {
    const path = stencil.getFontPath(upperAndLowerMap[label].split(''));
    glyphs.push(makeGlyph(label, path));
  }

  const font = new opentype.Font({
    familyName: fontName,
    styleName: 'Medium',
    unitsPerEm: 100, // Must be between 16 and 16384.
    ascender: 200, // Must not be less than the max used by the paths.
    descender: -20,
    glyphs: glyphs
  });
  return font;
}
