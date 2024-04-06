
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
const numParticles = 50;
const minRadius = 100;
const maxRadius = 200;
const speed = 0.01;
const color1 = 'rgb(111,114,127)';
const color2 = 'rgb(238,237,237)';
const color3 = 'rgb(170,102,181)';
const color4 = 'rgb(134,107,122)';
const colorList = [color1, color2, color3, color4];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomRadius(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}

function Particle(angle) {
  this.radius = getRandomRadius(minRadius, maxRadius);
  this.x = canvas.width   + this.radius * Math.cos(angle);
  this.y = canvas.height / 2 + this.radius * Math.sin(angle);
  this.prevX = this.x;
  this.prevY = this.y;
  this.angle = angle;
  this.color = getRandomColor(); // Random color for each particle

  this.draw = function() {
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  this.update = function() {
    this.angle += speed;
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = canvas.width  + this.radius * Math.cos(this.angle);
    this.y = canvas.height / 2 + this.radius * Math.sin(this.angle);
  }
}

function init() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle((Math.PI * 2 / numParticles) * i));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
}

init();
animate();