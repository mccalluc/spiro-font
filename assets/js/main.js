
import { makeCssFontFace, makeFont } from './fonts.js';
import FontControls from './FontControls.js';

export default function main({segmentMap, segments, shrink, grow, bevel, fontName, controlsContainer, downloadButton}) {
  const styleElement = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleElement);
  new FontControls({
    controlsContainer,
    segmentMap,
    segments,
    onChange: ({segmentMap, segments}) => {setFont({segmentMap, segments, shrink, grow, bevel, styleElement, fontName, downloadButton})}
  })
  setFont({segmentMap, segments, shrink, grow, bevel, styleElement, fontName, downloadButton})
}

function setFont({segmentMap, segments, shrink, grow, bevel, styleElement, fontName, downloadButton}) {
  console.log('Font paramters:', {segmentMap, segments});
  const font = makeFont({fontName, segmentMap, segments, shrink, grow, bevel});
  downloadButton.onclick = () => { font.download(); }
  styleElement.innerText = `
    ${makeCssFontFace(fontName, font)}
  `;
}