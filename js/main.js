
import { makeCssFontFace, makeFont } from './fonts.js';
import Canvas from './Canvas.js';

export default function main({fontName, targetDivId, targetStyleId, downloadButton}) {
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
    A: [[20, 0], [80, 0], [80, 20], [20, 20]],
    B: [[80, 20], [100, 20], [100, 80], [80, 80]],
    C: [[80, 100], [100, 100], [100, 160], [80, 160]],
    D: [[20, 160], [80, 160], [80, 180], [20, 180]],
    E: [[0, 100], [20, 100], [20, 160], [0, 160]],
    F: [[0, 20], [20, 20], [20, 80], [0, 80]],
    G: [[20, 80], [80, 80], [80, 100], [20, 100]],
  }
  new Canvas({
    targetDivId,
    segments,
    onChange: (segments) => {setFont({segmentMap, segments, targetStyleId, fontName, downloadButton})}
  })
  setFont({segmentMap, segments, targetStyleId, fontName, downloadButton})
}

function setFont({segmentMap, segments, targetStyleId, fontName, downloadButton}) {
  const font = makeFont(fontName, segmentMap, segments);
  downloadButton.onclick = () => { font.download(); }
  const styleSheet = document.getElementById(targetStyleId);
  styleSheet.innerText = `
    ${makeCssFontFace(fontName, font)}
  `;
}