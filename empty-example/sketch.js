var BobsUno, options;

function setup() {
  createCanvas(1000, 680);
  colorMode(HSB);
  frameRate(20);
  options = {
    bobNumber: 5,
    bobSize: 20,
    fieldSize: 500,
    doRunBobs: true,
    doRunInterference: true,
    fieldPulseRate: 0,
    doDisplayBob: true
  };
  BobsUno = new BobSystem(options);
}

function draw() {
  background(0);
  BobsUno.runBobs();
}