
import { makeCssFontFace, makeFont } from './fonts.js';
import Canvas from './Canvas.js';

export default function main({targetClass, canvasId}) {
  new Canvas({
    domId: canvasId,
    segments: {
      ABC: [[150, 10], [200, 100], [100, 100], [50, 50]]
    }
  })

  const fontName = 'Demo';
  const font = makeFont(fontName);
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    ${makeCssFontFace(fontName, font)}
    .${targetClass} { font-family: '${fontName}' }
  `;
  document.head.appendChild(styleSheet);
}