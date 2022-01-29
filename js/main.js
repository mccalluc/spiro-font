
import { makeCssFontFace, makeFont } from './fonts.js';
import Canvas from './Canvas.js';

export default function main() {
  new Canvas({
    domId: 'canvas',
    segments: {
      ABC: [[150, 10], [200, 100], [100, 100], [50, 50]]
    }
  })

  const divId = 'demo';
  document.getElementById(divId).innerHTML = '0123456789';

  const fontName = 'Demo';
  const font = makeFont(fontName);
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    ${makeCssFontFace(fontName, font)}
    #${divId} { font-family: '${fontName}' }
  `;
  document.head.appendChild(styleSheet);
}