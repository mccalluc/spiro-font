
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
    A: [[1, 0], [4, 0], [4, 1], [1, 1]],
    B: [[4, 1], [5, 1], [5, 4], [4, 4]],
    C: [[4, 5], [5, 5], [5, 8], [4, 8]],
    D: [[1, 8], [4, 8], [4, 9], [1, 9]],
    E: [[0, 5], [1, 5], [1, 8], [0, 8]],
    F: [[0, 1], [1, 1], [1, 4], [0, 4]],
    G: [[1, 4], [4, 4], [4, 5], [1, 5]],
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