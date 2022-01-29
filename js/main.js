
import { makeCssFontFace, makeFont } from './fonts.js';
import Canvas from './Canvas.js';

export default function main({targetClass, canvasId}) {
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
  };
  const segments = {
    A: [[1, 13], [2, 14], [6, 14], [7, 13], [6, 12], [2, 12]],
    B: [[7, 13], [8, 12], [8, 8], [7, 7], [6, 8], [6, 12]],
    C: [[7, 7], [8, 6], [8, 2], [7, 1], [6, 2], [6, 6]],
    D: [[1, 1], [2, 2], [6, 2], [7, 1], [6, 0], [2, 0]],
    E: [[1, 7], [2, 6], [2, 2], [1, 1], [0, 2], [0, 6]],
    F: [[1, 13], [2, 12], [2, 8], [1, 7], [0, 8], [0, 12]],
    G: [[1, 7], [2, 8], [6, 8], [7, 7], [6, 6], [2, 6]],
  }
  new Canvas({
    domId: canvasId,
    segments
  })

  const fontName = 'spiro-font';
  const font = makeFont(fontName, segmentMap, segments);
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    ${makeCssFontFace(fontName, font)}
    .${targetClass} { font-family: '${fontName}' }
  `;
  document.head.appendChild(styleSheet);
}