var BobsUno, options, sliderValue, sketch, slider;

function setup() {

  sketch = createCanvas(windowWidth, windowHeight);
  sketch.parent("sketch-container");
  
  slider = createSlider(2, 20, 2);
  slider.parent("bob-slider");
  slider.class("control-input");
  slider.id("bob-control");

  colorMode(HSB);
  frameRate(20);

  options = {
    doRunBobs: true,
    doDisplayBob: true,
    bobNumber: 10,
    bobSize: 20,
    doRunInterference: true,
    fieldSize: 250,
    fieldPulseRate: 0,
    pushForce: 10
  };
  BobsUno = new BobSystem(options);
}

function draw() {
  sliderValue = slider.value();
  background(0);
  BobsUno.runBobs(sliderValue);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}