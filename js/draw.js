export function drawPolygon(vertices){
  const first = vertices[0];
  const rest = vertices.slice(1);
  const path = [
    ['M', ...first],
    ...rest.map((pair) => ['L', ...pair]),
    ['Z']
  ];    

  const paper = Raphael(document.getElementById('canvas'), 0, 0, 200, 200);
  const polygon = paper.path(path).attr('fill','#F00');

  paper.setStart();

  for (let i = 0; i < vertices.length; i++) {
    paper.circle(...vertices[i], 5).update = function(dx,dy) {
      const cx = this.attr('cx') + dx;
      const cy = this.attr('cy') + dy;
      this.attr({cx, cy});
      
      path[i][1] = cx;
      path[i][2] = cy;
      
      polygon.attr({path});
    }
  }

  const controls = paper.setFinish();
  controls.attr({fill: '#00f'});  
  controls.drag(onMove, onStart);
}

function onMove(dx,dy){
  this.update(dx - this.dx, dy - this.dy);
  this.dx = dx;
  this.dy = dy;
}

function onStart(){
  this.dx = 0;
  this.dy = 0;
}

