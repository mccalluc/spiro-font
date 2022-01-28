// Based on https://embed.plnkr.co/o5QHap7NV1SYIbsS76f5/

 
  
  export function drawTriangle(x,y,ax,ay,bx,by){
     var path1 = [["M",x,y],["L",ax,ay],["L",bx,by],["Z"]]; //SVG structure for a typical triangle
     var discattr = {fill: "#00f",stroke: "none"};
     

    var paper = Raphael(document.getElementById("canvas"), 0, 0, 200, 200);
     var triangle = paper.path(path1).attr("fill","#F00"); // Draw the triangle
     
     // This piece of code creates all the blue circles on the tops of the triangle and keeps a reference to them in the controls object
     const controls = paper.set(
        paper.circle(x, y, 5).attr(discattr),
        paper.circle(ax, ay, 5).attr(discattr),
        paper.circle(bx, by, 5).attr(discattr));
      
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
      
      // set the delegate functions for the drag function 
      controls.drag(move,up);
  }
  
  function move(dx,dy){
    this.update(dx - (this.dx ||0) ,dy - (this.dy || 0)); // for the control being drug call the update function passing the dx and dy
    this.dx = dx;
    this.dy = dy;
  }
  
  function up(){
    this.dx = this.dy = 0; // reset distance moved x,y with mouse up
  }

