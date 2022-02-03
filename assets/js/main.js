
import { makeCssFontFace, makeFont } from './fonts.js';
import FontControls from './FontControls.js';

export default function main({segmentMap, segments, fontName, controlsContainer, downloadButton}) {
  const styleElement = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleElement);
  new FontControls({
    controlsContainer,
    segmentMap,
    segments,
    onChange: ({segmentMap, segments}) => {setFont({segmentMap, segments, styleElement, fontName, downloadButton})}
  })
  setFont({segmentMap, segments, styleElement, fontName, downloadButton})
}

function setFont({segmentMap, segments, styleElement, fontName, downloadButton}) {
  console.log('Font paramters:', {segmentMap, segments})
  const font = makeFont(fontName, segmentMap, segments);
  downloadButton.onclick = () => { font.download(); }
  styleElement.innerText = `
    ${makeCssFontFace(fontName, font)}
  `;
}