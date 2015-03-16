var BobsUno;

function setup() {
  createCanvas(1000, 680);
  colorMode(HSB);
  frameRate(20);
  BobsUno = new BobSystem(2);
}

function draw() {
  background(0);
  BobsUno.runBobs();
}

//Bob System
function BobSystem(bobNumber) {
  var bobs, bobAmount;
  
  bobs = [];
  bobAmount = bobNumber;
    
  for(var i = 0; i < bobAmount; i++){
  	newBob = new Bob();
      bobs.push(newBob);
  }
  
  this.runBobs = function(){
  	bobs.forEach(this.runBob);
  }

  this.runBob = function(bob, index, bobs) {
  	bob.run(bobs);
  }
}

//Bob
function Bob() {
  var doRunInterference = true,
  	  doDisplayBob = true,
      size, 
      fieldSize, 
      fieldRings, 
      hue,
      radius, 
      fieldIncrement, 
      fieldRadius,
      fieldTypes = [ "circle", "square" ],
      fieldType;

  //Bob properties
  hue = Math.floor(Math.random() * 256);
  size = 30;
  radius = size/2;
  
  //field properties
  this.fieldSize = 1000;
  this.fieldRadius = this.fieldSize/2;
  this.fieldRings = 10;
  this.fieldIncrement = this.fieldRadius/this.fieldRings;
  
  var x = Math.floor(Math.random() * (width-size) + size/2);
  var y = Math.floor(Math.random() * (height-size) + size/2);
  this.position = createVector(x, y);
  this.velocity = p5.Vector.random2D();
  
  //this.run(bills)
  //Operates the Bob, passing it the list of other Bobs (as bills)
  this.run = function(bills) {
    this.update();

    if(doDisplayBob) {
    	this.display();
	}

	if(doRunInterference) {
		bills.forEach(this.runInterference, this);
	}
  }
  
  //this.update()
  //Updates the position vectors of the Bob, no params
  this.update = function() {
    this.position.add(this.velocity.x, this.velocity.y);
    
    //check for walls
    if((this.position.x - size/2) <= 0 || (this.position.x + size/2) >= width){ this.velocity.x *= -1; }
    if((this.position.y - size/2) <= 0 || (this.position.y + size/2) >= height){ this.velocity.y *= -1; }
  }
  
  //this.display()
  //Runs the functions that create the visual appearance of the Bob, no params
  this.display = function() {
    this.renderBob();
  }
  
  //this.runInterference(bill, index, bills)
  //Calculates the pattern of interference between
  //the fields of all the Bobs, passes in each other Bob, 
  //its index in Bobs, and Bobs as bills
  this.runInterference = function(bill, index, bills) {
  	var thisBob = this,
  		otherBob = bill;

  	console.log(thisBob, otherBob);
    var d = p5.Vector.dist(thisBob.position, otherBob.position),
        dVector = p5.Vector.sub(otherBob.position, thisBob.position);
    
    if(d > 0){
      for(var i = thisBob.fieldRadius; i > 0; i-=thisBob.fieldIncrement) {
        for(var j = otherBob.fieldRadius; j > 0; j-=otherBob.fieldIncrement) {
          var areIntersecting = checkIntersect(thisBob.position.x, 
                                                thisBob.position.y, 
                                                i, 
                                                otherBob.position.x, 
                                                otherBob.position.y, 
                                                j);
                                                
          //If the fields are crossing and have intersection points
          if(areIntersecting == 1){
            var intersections = getIntersections(thisBob.position.x, 
                                                 thisBob.position.y, 
                                                 i, 
                                                 otherBob.position.x, 
                                                 otherBob.position.y, 
                                                 j);
            thisBob.renderIntersectShape(intersections, dVector, i);
          }
          
          //If one of the fields is contained in the other
          if(areIntersecting == -1){
//              renderOverlapShape(i);
          }
        }
      }
    }
  }
  
  this.renderBob = function() {
    noStroke();
    fill(hue, 200, 200);
    ellipse(this.position.x, this.position.y, size, size);
  }
  
  this.renderIntersectShape = function(intersections, distance, tempSize) {
    var circleNormal = createVector(radius, 0),
        distIntA = createVector(intersections[0], intersections[1]),
        distIntB = createVector(intersections[2], intersections[3]),
        angle1, angle2;
    
    //Dots
    var dotSize = 2;
    noStroke();
    fill(hue, 200, 200, 200);
    ellipse(distIntA.x, distIntA.y, dotSize, dotSize);
//    ellipse(distIntB.x, distIntB.y, dotSize, dotSize);
    
    //Arcs
    /*
    distIntA.sub(position);
    distIntB.sub(position);
    
    if(distance.x > 0){
      if(distIntA.y < distance.y){
        angle1 = getArcAngle(circleNormal, distIntA);
        angle2 = getArcAngle(circleNormal, distIntB);
      } else {
        angle1 = getArcAngle(circleNormal, distIntB);
        angle2 = getArcAngle(circleNormal, distIntA);
      }
      
      if((angle1 - PI) >  angle2){
        angle2 += TWO_PI;
      }
    } else {
      if(distIntA.y > distance.y){
        angle1 = getArcAngle(circleNormal, distIntA);
        angle2 = getArcAngle(circleNormal, distIntB);
      } else {
        angle1 = getArcAngle(circleNormal, distIntB);
        angle2 = getArcAngle(circleNormal, distIntA);
      }
      
      if((angle1 - PI) >  angle2){
        angle2 += TWO_PI;
      }
    }
    fill(100, 1);
    noStroke();
    arc(position.x, position.y, 2*tempSize, 2*tempSize, angle1, angle2, OPEN);
    */
  }
  
  this.renderOverlapShape = function(shapeSize){
    noFill();
    strokeWeight(2);
    stroke(0, 0, 0);
    ellipse(this.position.x, this.position.y, 2*shapeSize, 2*shapeSize);
  }
  
  this.renderField = function() {
    stroke(100, 50);
    noFill();
    for(var i = 0; i < fieldSize; i+=20){
      ellipse(this.position.x, this.position.y, i, i);
    }
  }
}

//Equations
function checkIntersect(x0, y0, r0, x1, y1, r1) {
  var doTheyIntersect,
      dx, 
      dy, 
      d;
  
  //Calculating distance between centerpoints
  dx = x1 - x0;
  dy = y1 - y0;
  d = sqrt(sq(dy)+sq(dx)); 
  
  //Using distance to determine if they intersect
  if(d > (r0 + r1)) {
    //No intersection
    doTheyIntersect = 0;
  } else if (d < abs(r0 - r1)){
    //One is contained within the other
    doTheyIntersect = -1;
  } else {
    
    //They intersect
    doTheyIntersect = 1;
  }
  
  return doTheyIntersect;
}

function getIntersections(x0, y0, r0, x1, y1, r1) {
  var dx, dy, d, a, x2, y2, h, rx, ry, xi1, xi2, yi1, yi2,
      intersectionPoints = [];
  
  dx = x1 - x0;
  dy = y1 - y0;
  d = sqrt(sq(dy)+sq(dx));

  a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d);
  x2 = x0 + (dx * a/d);
  y2 = y0 + (dy * a/d);
  h = sqrt(sq(r0) - sq(a));
  rx = (0-dy) * (h/d);
  ry = dx * (h/d);
  xi1 = x2 + rx;
  xi2 = x2 - rx;
  yi1 = y2 + ry;
  yi2 = y2 - ry;
  
  intersectionPoints[0] = xi1;
  intersectionPoints[1] = yi1;
  intersectionPoints[2] = xi2;
  intersectionPoints[3] = yi2;
  
  return intersectionPoints;
}

function getArcAngle(normal, intersection) {
  var angle;
  
  angle = p5.Vector.angleBetween(normal, intersection);
  
  if(intersection.y < 0){
    angle = TWO_PI - angle;
  }
  
  return angle;
}