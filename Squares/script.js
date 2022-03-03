
let x = 0;
let mySound, defaultTrebleColor = "#00FFD5", defaultBassColor = "#4DFF00";
let bassColorPicker, trebleColorPicker;
let song = `../assets/Saint Etienne - Like A Motorway (Skin Up, You're Already Dead - Autechre remix) (320 kbps)`;

function preload() {
    soundFormats('mp3');
    mySound = loadSound(song);
    // mySound.play();
}

function setup() {
    let cnv = createCanvas(800, 800);
    cnv.parent("canvas");
    cnv.mousePressed(canvasPressed);

    bassColorPicker = select("#bass-color");
    bassColorPicker.value(defaultBassColor);
    console.log(bassColorPicker);
    trebleColorPicker = select("#treble-color");
    trebleColorPicker.value(defaultTrebleColor);
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
    background(0); // clears previous drawings (without it would keep)

    fill(255);
    textSize(21);
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
    stroke(bassColorPicker.value());
    rect(0,0,lowMidEnergy,lowMidEnergy);

    rotate(x*2);
    noFill(); // makes shape transparent basically
    stroke(trebleColorPicker.value());
    rect(0,0,trebEnergy,trebEnergy);
    // noFill();
    // stroke("yellow");
    // rect(0,0,highMidEnergy,highMidEnergy);
    
    // rect(0,0,bassEnergy,bassEnergy);
    // rect(0,0,trebEnergy,bassEnergy);
    // stroke(220);
    // fill(220);
    // if (energy > 100) {
    //     translate(width / 2, height / 2);
    //     rotate(x);
    //     rect(0,0,energy*2,energy*2)
    //     stroke(0);
    //     fill(220);
    // } else {
    //     translate(width / 2, height / 2);
    //     rotate(x);
    //     rect(0,0,energy+40,energy+40);
    //     stroke(0);
    //     fill(220);
    // }
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
