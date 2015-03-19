var BobsUno, options;

function setup() {
  createCanvas(800, 450);
  colorMode(HSB);
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