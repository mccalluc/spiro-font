
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
    A: [[10, 0], [40, 0], [40, 10], [10, 10]],
    B: [[40, 10], [50, 10], [50, 40], [40, 40]],
    C: [[40, 50], [50, 50], [50, 80], [40, 80]],
    D: [[10, 80], [40, 80], [40, 90], [10, 90]],
    E: [[0, 50], [10, 50], [10, 80], [0, 80]],
    F: [[0, 10], [10, 10], [10, 40], [0, 40]],
    G: [[10, 40], [40, 40], [40, 50], [10, 50]],
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