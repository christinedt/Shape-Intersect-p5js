//Bob System
function BobSystem(options) {
  var bobs = [], 
      bobNumber = options.bobNumber,
      bobOptions = {
        bobSize: options.bobSize,
        fieldSize: options.fieldSize,
        doRunBobs: options.doRunBobs,
        doRunInterference: options.doRunInterference,
        fieldPulseRate: options.fieldPulseRate,
        doDisplayBob: options.doDisplayBob,
        pushForce: options.pushForce
      }

  this.addBob = function(){
    var newBob = new Bob(bobOptions);
    bobs.push(newBob);
  }
    
  for(var i = 0; i < bobNumber; i++){
  	this.addBob();
  }
  
  this.runBobs = function(sliderValue){
    
    if(sliderValue > bobs.length) {
      for(var i = bobs.length; i < sliderValue; i++){
        this.addBob();
      }
    } else if(sliderValue < bobs.length) {
      for(var i = sliderValue; i < bobs.length; i++){
        bobs.pop();
      }
    }

  	bobs.forEach(this.runBob);
  }

  this.runBob = function(bob, index, bobs) {
  	bob.run(bobs);
  }
}