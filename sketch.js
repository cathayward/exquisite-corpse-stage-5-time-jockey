let img;
let y; 
let counter = 0; // Counter variable
let starFrequency = 10; // Control the frequency that stars appear
let stars = []; // Array to store star objects
let starDuration = 5; // Duration for which stars are displayed
let ambiance; 
let showText = true; 
let font; 

function preload() {
  img = loadImage('files/astronaut.png'); 
  ambiance = loadSound('files/audio.mp3'); 
  font = loadFont('font.otf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  y = -img.height; // Start the image just above the canvas
  ambiance.setVolume(0.5); // Set volume of ambiance sound
  ambiance.loop(); // Loop the ambiance sound
}

function draw() {
  background(0); 

  image(img, (width - img.width) / 2, y);
  y += 5; // Move the image downwards

  // Reset y position if image goes beyond canvas height
  if (y > height) {
    y = -img.height;
  }

  // Add new stars at a controlled frequency
  if (counter % starFrequency == 0) {
    stars.push({
      x: random(0, windowWidth),
      y: random(0, windowHeight),
      n: 5,
      outerRadius: 5,
      innerRadius: 2,
      rotation: 0,
      createdAt: millis()
    });
  }

  // Draw and manage stars
  for (let i = stars.length - 1; i >= 0; i--) {
    let star = stars[i];
    let elapsedTime = (millis() - star.createdAt) / 1000; // Calculate elapsed time in seconds

    if (elapsedTime >= starDuration) {
      // Remove the star if it has exceeded the duration
      stars.splice(i, 1);
    } else {
      // Draw the star if it's still within the duration
      drawStarShape(star.x, star.y, star.n, star.outerRadius, star.innerRadius, star.rotation);
    }
  }

  if (showText) {
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont(font);
    text("click to enter the void", windowWidth / 2, windowHeight / 2);
  }

  counter++; 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawStarShape(x, y, n, outerRadius, innerRadius, rotation) {
  noStroke();
  fill(190);
  let theta = TAU / n;
  beginShape();
  for (let i = 0; i < n; i++) {
    let x1 = x + cos(i * theta + rotation) * outerRadius;
    let y1 = y + sin(i * theta + rotation) * outerRadius;
    vertex(x1, y1);
    let x2 = x + cos((i + 0.5) * theta + rotation) * innerRadius;
    let y2 = y + sin((i + 0.5) * theta + rotation) * innerRadius;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}

function mousePressed() {
  if (ambiance.isLoaded()) {
    ambiance.play(); // Play ambiance sound if loaded
  }
  showText = false; // Hide text when mouse is pressed
}
