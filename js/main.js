
import { makeCssFontFace, makeFont } from './fonts.js';
import Canvas from './Canvas.js';

export default function main({targetClass, canvasId}) {
  new Canvas({
    domId: canvasId,
    segments: {
      ABC: [[150, 10], [200, 100], [100, 100], [50, 50]]
    }
  })

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
  }
  const fontName = 'spiro-font';
  const font = makeFont(fontName, segmentMap);
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    ${makeCssFontFace(fontName, font)}
    .${targetClass} { font-family: '${fontName}' }
  `;
  document.head.appendChild(styleSheet);
}