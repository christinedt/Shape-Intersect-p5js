var BobsUno, options;

function setup() {
  createCanvas(1000, 680);
  colorMode(HSB);
  frameRate(20);
  options = {
    bobNumber: 2,
    bobSize: 20,
    fieldSize: 1500,
    doRunBobs: true,
    doRunInterference: true,
    fieldPulseRate: 1,
    doDisplayBob: true
  };
  BobsUno = new BobSystem(options);
}

function draw() {
  background(0);
  BobsUno.runBobs();
}