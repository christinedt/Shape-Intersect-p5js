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
        doDisplayBob: options.doDisplayBob
      }
    
  for(var i = 0; i < bobNumber; i++){
  	newBob = new Bob(bobOptions);
    bobs.push(newBob);
  }
  
  this.runBobs = function(){
  	bobs.forEach(this.runBob);
  }

  this.runBob = function(bob, index, bobs) {
  	bob.run(bobs);
  }
}