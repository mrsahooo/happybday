// love.js

// Adjust canvas for high DPI displays
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

function Heart(x, y, size, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.alpha = 1.0;
  this.dy = Math.random() * 0.5 + 0.5;
}

Heart.prototype.draw = function(ctx) {
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  const topCurveHeight = this.size * 0.3;
  ctx.moveTo(this.x, this.y);
  ctx.bezierCurveTo(
    this.x, this.y - topCurveHeight,
    this.x - this.size / 2, this.y - topCurveHeight,
    this.x - this.size / 2, this.y
  );
  ctx.bezierCurveTo(
    this.x - this.size / 2, this.y + this.size / 2,
    this.x, this.y + this.size / 1.5,
    this.x, this.y + this.size
  );
  ctx.bezierCurveTo(
    this.x, this.y + this.size / 1.5,
    this.x + this.size / 2, this.y + this.size / 2,
    this.x + this.size / 2, this.y
  );
  ctx.bezierCurveTo(
    this.x + this.size / 2, this.y - topCurveHeight,
    this.x, this.y - topCurveHeight,
    this.x, this.y
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

Heart.prototype.update = function() {
  this.y -= this.dy;
  this.alpha -= 0.01;
};

let canvas, ctx, hearts = [], heartInterval;

function addHeart() {
  const x = Math.random() * canvas.clientWidth;
  const y = canvas.clientHeight - 30;
  const size = Math.random() * 20 + 10;
  const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  hearts.push(new Heart(x, y, size, color));
}

function animate() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw(ctx);
    if (heart.alpha <= 0) hearts.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

function startHeartAnimation() {
  if (heartInterval) return; // prevent multiple intervals
  heartInterval = setInterval(addHeart, 300);
}

// Setup after DOM loaded
window.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("canvas");
  if (!canvas) return;
  ctx = setupCanvas(canvas);
  animate();

  // Adjust canvas size on resize
  window.addEventListener("resize", () => {
    ctx = setupCanvas(canvas);
  });

  const btn = document.getElementById("start-btn");
  if (btn) {
    btn.addEventListener("click", startHeartAnimation);
  }
});
