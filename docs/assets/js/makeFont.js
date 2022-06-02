import {opentype} from './upstream.js';

import Stencil from './Stencil.js';

function makeGlyph({character, path, pad}) {
  const advanceWidth = 130 + pad * 5
  return new opentype.Glyph({
    name: character,
    unicode: character.codePointAt(),
    advanceWidth: advanceWidth,
    path: path
  });
}

export default function makeFont({fontName, segmentMap, segments, stretch, pad, skew, shrink, grow, bevel}) {
  const glyphs = [];

  // The .notdef glyph is required.
  const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 0,
    path: new opentype.Path()
  });
  glyphs.push(notdefGlyph);

  const stencil = new Stencil({segments, stretch, pad, skew, shrink, grow, bevel});
  for (let character in segmentMap) {
    const path = stencil.getFontPath(segmentMap[character].split(''));
    glyphs.push(makeGlyph({character, path, pad}));
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
