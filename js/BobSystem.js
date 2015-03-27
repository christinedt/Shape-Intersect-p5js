//Bob System
function BobSystem(options) {
  var bobs = [],
      bobRunOptions = {},
      bobOptions = {
        bobSize: options.bobSize,
        fieldSize: options.fieldSize,
        doRunBobs: options.doRunBobs,
        doRunInterference: options.doRunInterference,
        fieldPulseRate: options.fieldPulseRate,
        doDisplayBob: options.doDisplayBob
      },
      mouseClickVector;

  this.addBob = function(){
    var newBob = new Bob(bobOptions);
    bobs.push(newBob);
  }
  
  this.runBobs = function(sliderOptions){
    this.setBobRunOptions(sliderOptions);
    
    if(sliderOptions.bobAmount > bobs.length) {
      for(var i = bobs.length; i < sliderOptions.bobAmount; i++){
        this.addBob();
      }
    } else if(sliderOptions.bobAmount < bobs.length) {
      for(var i = sliderOptions.bobAmount; i < bobs.length; i++){
        bobs.pop();
      }
    }

  	bobs.forEach(this.runBob);
  }

  this.runBob = function(bob, index, bobs) {
  	bob.run(bobs, bobRunOptions);
  }

  this.setBobRunOptions = function(sliderOptions) {
    bobRunOptions.forceValue = sliderOptions.forceValue;
    bobRunOptions.activeBobMode = sliderOptions.activeBobMode;
  }

  this.checkActiveBob = function(xPos, yPos) {
    mouseClickVector = createVector(xPos, yPos);

    bobs.forEach(this.setActiveBob);
  }

  this.setActiveBob = function(bob, index, bobs) {
    var vectorToMouse, mouseDistance;
    
    vectorToMouse = p5.Vector.sub(bob.position, mouseClickVector);
    mouseDistance = vectorToMouse.mag();


    if(mouseDistance <= bob.radius) {
      bob.isActiveBob = true;
    } else {
      bob.isActiveBob = false;
    }
  }
}