var BobsUno, options;

function setup() {
  var sketch = createCanvas(windowWidth, windowHeight);
  sketch.parent("sketch-container");
  colorMode(HSB);
  var slider = createSlider(10,100,10);
  slider.parent("bob-slider");
  slider.class("control-input");
  
  frameRate(20);
  options = {
    doRunBobs: true,
    doDisplayBob: true,
    bobNumber: 10,
    bobSize: 20,
    doRunInterference: true,
    fieldSize: 200,
    fieldPulseRate: 0,
    pushForce: 10
  };
  BobsUno = new BobSystem(options);
}

function draw() {
  background(0);
  BobsUno.runBobs();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}