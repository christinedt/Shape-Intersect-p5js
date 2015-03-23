var BobsUno, options;

function setup() {
  var sketch = createCanvas(800, 450);
  sketch.parent("sketch-container");
  colorMode(HSB);
  input = createInput();
  input.parent("control-panel");
  var slider = createSlider(10,100,10);
  slider.parent("control-panel");
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