
let x = 0;
let mySound, defaultTrebleColor = "#00FFD5", defaultBassColor = "#4DFF00";
let bassStrokeWeight, trebleStrokeWeight;

let backgroundColor;
let bassColorPicker, trebleColorPicker;
let song = `../assets/afx - i'm self employed (320 kbps)`;

function preload() {
    soundFormats('mp3');
    mySound = loadSound(song);
    // mySound.play();
}

function setup() {
    let cnv = createCanvas(800, 800);
    cnv.parent("canvas");
    cnv.mousePressed(canvasPressed);

    backgroundColor = select("#background-color");
    
    bassColorPicker = select("#bass-color");
    bassColorPicker.value(defaultBassColor);
    
    trebleColorPicker = select("#treble-color");
    trebleColorPicker.value(defaultTrebleColor);

    bassStrokeWeight = select("#bass-stroke-weight");
    trebleStrokeWeight = select("#treble-stroke-weight");
    // let bassText = createElement('p', 'bass color');
    // bassText.style('color', 'white');
    // bassText.position(850, 915);
    
    // let trebleText = createElement('p', 'treble color');
    // trebleText.style('color', 'white');
    // trebleText.position(850, 940);
    // print(width, height, cnv.position().x, cnv.position().y);
    // button = createButton('change viz colors');
    // button.position(900, 925);
    // button.mousePressed(changeVizColor);

    fft = new p5.FFT();

    // draws rectangle from the center
    rectMode(CENTER);
}

function draw() {
    background(backgroundColor.value()); // clears previous drawings (without it would keep)

    fill(255);
    textSize(21);
    stroke(0);
    text('click in box to toggle audio', width-250, height);

    // constantly grabs frequencies as song is playing
    fft.analyze();
    let trebEnergy = fft.getEnergy("treble");
    let bassEnergy = fft.getEnergy("bass");
    let lowMidEnergy = fft.getEnergy("lowMid");
    translate(width / 2, height / 2);

    

    // console.log(y);
    rotate(-x); // rotate value accumulates with subsequent calls
    noFill();
    console.log(bassStrokeWeight.value());
    strokeWeight(bassStrokeWeight.value());
    stroke(bassColorPicker.value());
    rect(0,0,lowMidEnergy,lowMidEnergy);

    rotate(x*2);
    noFill(); // makes shape transparent basically
    strokeWeight(trebleStrokeWeight.value());
    stroke(trebleColorPicker.value());
    rect(0,0,trebEnergy,trebEnergy);

    x = x + 0.01; // changes viz rotation speed
    // y = y + 0.01;
}

function canvasPressed() {
    if (mySound.isPlaying()) {
        mySound.pause();
        noLoop(); //stops draw() (will freeze graphic when pausing)
        // save("viz.png");
    } else {
        mySound.play();
        loop();  //starts draw()
    }

}



console.log("ready");
