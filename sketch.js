let img;
let y;
let counter = 0;
let starFrequency = 10; // Control the frequency of star appearance
let stars = [];
let starDuration = 5;
let ambiance;

function preload() {
  img = loadImage('files/astronaut.png'); // Replace with the path to your image file
  ambiance = loadSound('files/audio.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  y = -img.height; // Start the image just above the canvas

  ambiance.loop();
}

function draw() {
  background(0);

  image(img, (width - img.width) / 2, y);

  y += 5;

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