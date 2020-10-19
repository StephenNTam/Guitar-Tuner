const model_url =
  'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let pitch;
let audioContext;
let mic;
let freq = 0;

function setup() {
  createCanvas(windowWidth, windowHeight-100);
}

function off() {
  document.getElementById("overlay").style.display = "none";
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  audioContext.resume();
}

function listening(){
  console.log('listening');
  pitch = ml5.pitchDetection(
  model_url,
  audioContext,
  mic.stream,
  modelLoaded);
}

function gotPitch(error, frequency){
  if (error){
    console.error(error);
  } else{
    if (frequency){
      freq = frequency;
    }
    console.log(freq);
  }
  pitch.getPitch(gotPitch);
}

function modelLoaded(){
  console.log('model loaded!');
  pitch.getPitch(gotPitch);
}

function draw() {
  background(255);
  stroke(0);
  fill(50,50,50,50);
  rect(250,0,windowWidth-500,windowHeight-150);
  stroke(0,255,0);
  fill(0,255,0);
  rect(windowWidth-125,windowHeight-135,25,25);
  fill(0);
  textSize(15);
  stroke(0);
  text('= Tuned',windowWidth-90,windowHeight-125);
  text('pitch with abs diff of 2 is valid.');

  textAlign(LEFT,CENTER);
  textSize(20);
  text('Pitch = '+freq.toFixed(2),25,windowHeight-125);

  //Guitar pitches
  stroke(0) //outline black
  //E
  var E1HEIGHT = (windowHeight-329.63-150);
  line(150,E1HEIGHT,240,E1HEIGHT);
  line(windowWidth-240,E1HEIGHT,windowWidth-150,E1HEIGHT);
  textSize(20);
  text('E',125,E1HEIGHT);
  textSize(15);
  text('329.63Hz',windowWidth-140,E1HEIGHT);
  //B
  var BHEIGHT = (windowHeight-246.94-150);
  line(150,BHEIGHT,240,BHEIGHT);
  line(windowWidth-240,BHEIGHT,windowWidth-150,BHEIGHT);
  textSize(20);
  text('B',125,BHEIGHT);
  textSize(15);
  text('246.94Hz',windowWidth-140,BHEIGHT);
  //G
  var GHEIGHT = (windowHeight-196.00-150);
  line(150,GHEIGHT,240,GHEIGHT);
  line(windowWidth-240,GHEIGHT,windowWidth-150,GHEIGHT);
  textSize(20);
  text('G',125,GHEIGHT);
  textSize(15);
  text('196.00Hz',windowWidth-140,GHEIGHT);
  //D
  var DHEIGHT = (windowHeight-146.83-150);
  line(150,DHEIGHT,240,DHEIGHT);
  line(windowWidth-240,DHEIGHT,windowWidth-150,DHEIGHT);
  textSize(20);
  text('D',125,DHEIGHT);
  textSize(15);
  text('146.83Hz',windowWidth-140,DHEIGHT);
  //A
  var AHEIGHT = (windowHeight-110.00-150);
  line(150,AHEIGHT,240,AHEIGHT);
  line(windowWidth-240,AHEIGHT,windowWidth-150,AHEIGHT);
  textSize(20);
  text('A',125,AHEIGHT);
  textSize(15);
  text('110.00Hz',windowWidth-140,AHEIGHT);
  //E
  var E2HEIGHT = (windowHeight-82.41-150);
  line(150,E2HEIGHT,240,E2HEIGHT);
  line(windowWidth-240,E2HEIGHT,windowWidth-150,E2HEIGHT);
  textSize(20);
  text('E',125,E2HEIGHT);
  textSize(15);
  text('82.41Hz',windowWidth-140,E2HEIGHT);

  stroke(0);
  line(0,windowHeight-150,windowWidth,windowHeight-150);

  if ((freq >= 80.41 && freq <= 84.41)
  || (freq >= 108.00 && freq <= 112.00)
  || (freq >= 144.83 && freq <= 148.83)
  || (freq >= 194.00 && freq <= 198.00)
  || (freq >= 244.94 && freq <= 248.94)
  || (freq >= 327.63 && freq <= 331.63)){
    stroke('green');
    line(250,windowHeight-freq-150,windowWidth-250,windowHeight-freq-150);
  } else{
    stroke('red');
    line(250,windowHeight-freq-150,windowWidth-250,windowHeight-freq-150);
  }
}
