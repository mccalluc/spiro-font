// Based on https://embed.plnkr.co/o5QHap7NV1SYIbsS76f5/



export function drawTriangle(x,y,ax,ay,bx,by){
  var path1 = [["M",x,y],["L",ax,ay],["L",bx,by],["Z"]]; //SVG structure for a typical triangle
    

  var paper = Raphael(document.getElementById("canvas"), 0, 0, 200, 200);
    var triangle = paper.path(path1).attr("fill","#F00");

    paper.setStart();
    paper.circle(x, y, 5)
    paper.circle(ax, ay, 5)
    paper.circle(bx, by, 5)
    const controls = paper.setFinish();
  
    controls.attr({fill: "#00f",stroke: "none"});
    
    //Create an update function for each of the controls which manipulate the vertices of path1
    controls[0].update = function(dx,dy) {
      var newX = this.attr("cx") + dx; // calculate the new intermediate X value
      var newY = this.attr("cy") + dy; // calculate the new intermediate Y value
      this.attr({cx:newX,cy:newY}); // store the intermediate values on the control
      
      /*Modify the paths*/
      path1[0][1] = newX; //the x value of the first vertex in path1
      path1[0][2] = newY;//the y value of the first vertex int path1
      
      triangle.attr({path: path1}); //tell the triangle path to update it's path this will force a redraw on that path
    }
    controls[1].update = function(dx,dy) {
      var newX = this.attr("cx") + dx; // calculate the new intermediate X value
      var newY = this.attr("cy") + dy; // calculate the new intermediate Y value
      this.attr({cx:newX,cy:newY}); // store the intermediate values on the control
        path1[1][1]  = newX; //the x value of the first vertex
        path1[1][2]  = newY;//the y value of the first vertex
        
        triangle.attr({path:path1}); //tell the triangle path to update it's path this will force a redraw on that path
    }
    
    controls[2].update = function(dx,dy) {
      var newX = this.attr("cx") + dx; // calculate the new intermediate X value
      var newY = this.attr("cy") + dy; // calculate the new intermediate Y value
      this.attr({cx:newX,cy:newY}); // store the intermediate values on the control
        path1[2][1] = newX; //the x value of the first vertex
        path1[2][2] = newY;//the y value of the first vertex
        
        triangle.attr({path:path1}) //tell the triangle path to update it's path this will force a redraw on that path
    }
    
    controls.drag(onMove, onStart);
}

function onMove(dx,dy){
  this.update(dx - (this.dx ||0) ,dy - (this.dy || 0));
  this.dx = dx;
  this.dy = dy;
}

function onStart(){
  this.dx = this.dy = 0;
}

