---
name: Seven Segment
sampleText: '0123456789 THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG'
segmentMap: {
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
  'A': 'ABCEFG',
  'B': 'CDEFG',
  'C': 'ADEF',
  'D': 'BCDEG',
  'E': 'ADEFG',
  'F': 'AEFG',
  'G': 'ACDEF',
  'H': 'BCEFG',
  'I': 'BC',
  'J': 'BCDE',
  'K': 'DEFG',
  'L': 'DEF',
  'M': 'ABCEF',
  'N': 'ABCEF',
  'O': 'ABCDEF',
  'P': 'ABEFG',
  'Q': 'ABCFG',
  'R': 'AEF',
  'S': 'ACDFG',
  'T': 'ABC',
  'U': 'BCDEF',
  'V': 'BCDEF',
  'W': 'BCDEF',
  'X': 'ADG',
  'Y': 'BCDFG',
  'Z': 'ABDEG',
  ' ': ''
}
segments: {
  A: [[20, 0], [80, 0], [80, 20], [20, 20]],
  B: [[80, 20], [100, 20], [100, 80], [80, 80]],
  C: [[80, 100], [100, 100], [100, 160], [80, 160]],
  D: [[20, 160], [80, 160], [80, 180], [20, 180]],
  E: [[0, 100], [20, 100], [20, 160], [0, 160]],
  F: [[0, 20], [20, 20], [20, 80], [0, 80]],
  G: [[20, 80], [80, 80], [80, 100], [20, 100]],
}
---
from [wikipedia](https://en.wikipedia.org/wiki/Seven-segment_display):

> Seven-segment representation of figures can be found in patents as early as 1903
> (in [U.S. Patent 1,126,641](https://patents.google.com/patent/US1126641)),
> when Carl Kinsley invented a method of telegraphically transmitting letters
> and numbers and having them printed on tape in a segmented format. 