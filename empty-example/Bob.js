//Bob
function Bob(bobOptions) {
  //Internal Properties
  var bobView = this,
    //Booleans
      doRunInterference = bobOptions.doRunInterference,
      doRunBob = bobOptions.doRunBobs,
      doDisplayBob = bobOptions.doDisplayBob,

    //Scalars
      fieldPulseRate = bobOptions.fieldPulseRate,
      size = bobOptions.bobSize,
      fieldPulseFrame = 0, 
      hue = Math.floor(Math.random() * 256),
      radius = size/2,
      tempXPos = Math.floor(Math.random() * (width-size) + size/2),
      tempYPos = Math.floor(Math.random() * (height-size) + size/2);

  //External Properties
  bobView.fieldSize = bobOptions.fieldSize;
  bobView.fieldRadius = bobView.fieldSize/2;
  bobView.fieldRings = Math.floor(Math.random() * 20 + 10);
  bobView.fieldIncrement = bobView.fieldRadius/bobView.fieldRings;

    //Vectors
  bobView.position = createVector(tempXPos, tempYPos);
  bobView.velocity = p5.Vector.random2D().mult(4);
  bobView.acceleration = createVector(0, 0);

    //Arrays
  bobView.forces = [];
  bobView.intersectionPoints = [];
  
  //bobView.run(bills)
  //Operates the Bob, passing it the list of other Bobs (as bills)
  bobView.run = function(bills) {
    if(doRunInterference) {
      bills.forEach(bobView.runInterference, this);
    }

    if(doRunBob) {
      bobView.update(bills);
    }

    bobView.display();
    bobView.reset();
  }
  
  //bobView.update()
  //Updates the position vectors of the Bob, no params
  bobView.update = function(bills) {
    bobView.forces.forEach(bobView.addForce);
    bobView.velocity.add(bobView.acceleration.x, bobView.acceleration.y);
    bobView.velocity.limit(5);
    bobView.position.add(bobView.velocity.x, bobView.velocity.y);
    bobView.checkForWalls();
  }

  bobView.checkForWalls = function() {
    if((bobView.position.x - radius) <= 0){
      bobView.velocity.x *= -1; 
    }
    if((bobView.position.x + size/2) >= width){  
      bobView.position.x = width - radius; 
      bobView.velocity.x *= -1; 
    }
    if((bobView.position.y - size/2) <= 0){ 
      bobView.position.y = radius; 
      bobView.velocity.y *= -1; 
    }
    if((bobView.position.y + size/2) >= height){ 
      bobView.position.y = height - radius; 
      bobView.velocity.y *= -1; 
    }
  }

  bobView.addForce = function(force, index, forces) {
    bobView.acceleration.add(force.x, force.y);
  }
  
  //bobView.display()
  //Runs the functions that create the visual appearance of the Bob, no params
  bobView.display = function() {
    bobView.renderBob();
  }
  
  bobView.runInterference = function(bill, index, bills) {
  	var thisBob = bobView,
  		  otherBob = bill,
        distance = p5.Vector.dist(thisBob.position, otherBob.position),
        dVector = p5.Vector.sub(otherBob.position, thisBob.position),
        dNormal = dVector.normalize();

    fieldPulseFrame = fieldPulseFrame % bobView.fieldIncrement;
    
    //if otherBob is not thisBob
    if(distance > 0) {
      //for each ring of thisBob's field
      for(var i = fieldPulseFrame; i < thisBob.fieldRadius; i+=thisBob.fieldIncrement) {
        //for each ring of otherBob's field
        for(var j = fieldPulseFrame; j < otherBob.fieldRadius; j+=otherBob.fieldIncrement) {
          //check if the two rings intersect
          var areIntersecting = checkIntersect(
                                thisBob.position.x, 
                                thisBob.position.y, 
                                i, 
                                otherBob.position.x, 
                                otherBob.position.y, 
                                j
                              );
                                              
          switch(areIntersecting) {
          //fields intersect and have intersection points
            case 1:
              var intersections = getIntersections(
                                    thisBob.position.x, 
                                    thisBob.position.y, 
                                    i, 
                                    otherBob.position.x, 
                                    otherBob.position.y, 
                                    j
                                  );

              var firstIntersectionPoint = createVector(intersections[0], intersections[1]);
              var secondIntersectionPoint = createVector(intersections[2], intersections[3]);

              bobView.intersectionPoints.push(firstIntersectionPoint);
              bobView.intersectionPoints.push(secondIntersectionPoint);

              bobView.renderIntersectShape(intersections, distance);

              var pushVector1 = p5.Vector.sub(thisBob.position, firstIntersectionPoint);
              pushVector1 = pushVector1.normalize();
              pushVector1 = pushVector1.mult(-0.0009);

              var pushVector2 = p5.Vector.sub(thisBob.position, secondIntersectionPoint);
              pushVector2 = pushVector2.normalize();
              pushVector2 = pushVector2.mult(-0.0009);
              bobView.forces.push(pushVector1);
              bobView.forces.push(pushVector2);
              break;

          //If one of the fields is contained in the other
            case -1:
              // renderOverlapShape(i);
              break;

            default:
              break;
          }
        }
      }
    }

    fieldPulseFrame += fieldPulseRate;
  }
  
  bobView.renderBob = function() {
    noStroke();
    fill(hue, 200, 200);
    ellipse(bobView.position.x, bobView.position.y, size, size);
  }
  
  bobView.renderIntersectShape = function(intersections, distance) {
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
  
  bobView.renderOverlapShape = function(shapeSize){
    noFill();
    strokeWeight(2);
    stroke(0, 0, 0);
    ellipse(bobView.position.x, bobView.position.y, 2*shapeSize, 2*shapeSize);
  }
  
  bobView.renderField = function() {
    stroke(100, 50);
    noFill();
    for(var i = 0; i < fieldSize; i+=20){
      ellipse(bobView.position.x, bobView.position.y, i, i);
    }
  }

  bobView.reset = function() {
    bobView.acceleration.mult(0);
    bobView.forces = [];
    bobView.intersectionPoints = [];
  }
}