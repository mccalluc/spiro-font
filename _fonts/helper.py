i = ord('A')
grid = 30
segments = {}
for y in range(5):
  for x in range(3):
    char = chr(i)
    gx = grid * x
    gy = grid * y
    square = [[gx, gy], [gx + grid, gy],
              [gx + grid, gy + grid], [gx, gy + grid]]
    segments[char] = square
    i += 1

from pprint import pprint
pprint(segments)
