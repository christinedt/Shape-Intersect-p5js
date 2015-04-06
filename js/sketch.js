var BobsUno, options, sliderValue, sketch, slider,
    isActiveBobMode = false,
    sliderOptions = {};

function setup() {

  sketch = createCanvas(windowWidth, windowHeight);
  sketch.parent("sketch-container");

  activeBobButton = createButton('OFF', true);
  activeBobButton.parent("active-bob-button");
  activeBobButton.class("button-input");
  activeBobButton.id("active-bob-control");
  activeBobButton.mousePressed(toggleActiveBobMode);
  console.log(activeBobButton);
  
  bobSlider = createSlider(2, 16, 4);
  bobSlider.parent("bob-slider");
  bobSlider.class("control-input");
  bobSlider.id("bob-control");
  
  forceSlider = createSlider(-10, 10, 4);
  forceSlider.parent("force-slider");
  forceSlider.class("control-input");
  forceSlider.id("force-control");

  colorMode(HSB);
  frameRate(20);

  options = {
    doRunBobs: true,
    doDisplayBob: true,
    bobSize: 20,
    doRunInterference: true,
    fieldSize: 300,
    fieldPulseRate: 0
  };
  BobsUno = new BobSystem(options);
}

function draw() {
  background(0);

  setSliderOptions();
  BobsUno.runBobs(sliderOptions);
}

function setSliderOptions() {
  sliderOptions.bobAmount = bobSlider.value();
  sliderOptions.forceValue = forceSlider.value();
  sliderOptions.activeBobMode = isActiveBobMode;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function toggleActiveBobMode() {
  var $activeBobContainer = $("#active-bob-container");

  isActiveBobMode = !isActiveBobMode;

  $activeBobContainer.toggleClass('on');

  if(isActiveBobMode){
    activeBobButton.html('ON');
    activeBobButton.addClass('on');    
  } else {
    activeBobButton.html('OFF');
    activeBobButton.removeClass('on');
  }
}

function mousePressed() {
  if(isActiveBobMode){
    BobsUno.checkActiveBob(mouseX, mouseY);
  }
}