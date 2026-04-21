class CardStreamController {
  constructor() {
    this.container = document.getElementById("cardStream");
    this.cardLine = document.getElementById("cardLine");
    if (!this.container || !this.cardLine) return;

    this.position = 0;
    this.velocity = 120;
    this.direction = -1;
    this.isAnimating = true;
    this.isDragging = false;
    this.lastTime = 0;
    this.lastMouseX = 0;
    this.mouseVelocity = 0;
    this.friction = 0.95;
    this.minVelocity = 30;
    this.containerWidth = 0;
    this.cardLineWidth = 0;
    this.images = [
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
      "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
    ];

    this.init();
  }

  init() {
    this.populateCardLine();
    this.calculateDimensions();
    this.setupEventListeners();
    this.updateCardPosition();
    this.animate();
    this.startPeriodicUpdates();
  }

  calculateDimensions() {
    this.containerWidth = this.container.offsetWidth;
    const cardCount = this.cardLine.children.length;
    this.cardLineWidth = (400 + 60) * cardCount;
  }

  setupEventListeners() {
    this.cardLine.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.onDrag(e));
    document.addEventListener("mouseup", () => this.endDrag());
    this.cardLine.addEventListener("touchstart", (e) => this.startDrag(e), {
      passive: false,
    });
    document.addEventListener("touchmove", (e) => this.onDrag(e), {
      passive: false,
    });
    document.addEventListener("touchend", () => this.endDrag());
    this.cardLine.addEventListener("wheel", (e) => this.onWheel(e));
    window.addEventListener("resize", () => this.calculateDimensions());
  }

  startDrag(e) {
    e.preventDefault();
    this.isDragging = true;
    this.isAnimating = false;
    this.lastMouseX = this.getClientX(e);
    this.mouseVelocity = 0;
    const transform = window.getComputedStyle(this.cardLine).transform;
    if (transform !== "none") this.position = new DOMMatrix(transform).m41;
    this.cardLine.style.animation = "none";
    this.cardLine.classList.add("dragging");
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  }

  onDrag(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const clientX = this.getClientX(e);
    const deltaX = clientX - this.lastMouseX;
    this.position += deltaX;
    this.mouseVelocity = deltaX * 60;
    this.lastMouseX = clientX;
    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.updateCardClipping();
  }

  getClientX(e) {
    if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
    if (e.changedTouches && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
    return e.clientX;
  }

  endDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.cardLine.classList.remove("dragging");
    if (Math.abs(this.mouseVelocity) > this.minVelocity) {
      this.velocity = Math.abs(this.mouseVelocity);
      this.direction = this.mouseVelocity > 0 ? 1 : -1;
    } else {
      this.velocity = 120;
    }
    this.isAnimating = true;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }

  animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    if (this.isAnimating && !this.isDragging) {
      this.velocity = this.velocity > this.minVelocity ? this.velocity * this.friction : this.minVelocity;
      this.position += this.velocity * this.direction * deltaTime;
      this.updateCardPosition();
    }
    this.raf = requestAnimationFrame(() => this.animate());
  }

  updateCardPosition() {
    if (this.position < -this.cardLineWidth) this.position = this.containerWidth;
    else if (this.position > this.containerWidth) this.position = -this.cardLineWidth;
    this.cardLine.style.transform = `translateX(${this.position}px)`;
    this.updateCardClipping();
  }

  generateCode(width, height) {
    const lines = [
      "// compiled preview scanner demo",
      "const SCAN_WIDTH = 8;",
      "const FADE_ZONE = 35;",
      "const MAX_PARTICLES = 2500;",
      "function clamp(n,a,b){return Math.max(a,Math.min(b,n));}",
      "function lerp(a,b,t){return a+(b-a)*t;}",
      "const now = () => performance.now();",
      "const gradient = document.createElement('canvas');",
      "ctx.globalCompositeOperation='lighter';",
    ];
    let flow = lines.join(" ");
    while (flow.length < width * height + width) flow += " " + lines[Math.floor(Math.random() * lines.length)];
    let out = "";
    let offset = 0;
    for (let row = 0; row < height; row++) {
      let line = flow.slice(offset, offset + width);
      if (line.length < width) line += " ".repeat(width - line.length);
      out += line + (row < height - 1 ? "\n" : "");
      offset += width;
    }
    return out;
  }

  calculateCodeDimensions(cardWidth, cardHeight) {
    const fontSize = 11;
    const lineHeight = 13;
    const charWidth = 6;
    return { width: Math.floor(cardWidth / charWidth), height: Math.floor(cardHeight / lineHeight), fontSize, lineHeight };
  }

  createCardWrapper(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    const normalCard = document.createElement("div");
    normalCard.className = "card card-normal";
    const image = document.createElement("img");
    image.className = "card-image";
    image.src = this.images[index % this.images.length];
    image.alt = "Credit Card";
    normalCard.appendChild(image);

    const asciiCard = document.createElement("div");
    asciiCard.className = "card card-ascii";
    const asciiContent = document.createElement("div");
    asciiContent.className = "ascii-content";
    const { width, height, fontSize, lineHeight } = this.calculateCodeDimensions(400, 250);
    asciiContent.style.fontSize = `${fontSize}px`;
    asciiContent.style.lineHeight = `${lineHeight}px`;
    asciiContent.textContent = this.generateCode(width, height);
    asciiCard.appendChild(asciiContent);
    wrapper.appendChild(normalCard);
    wrapper.appendChild(asciiCard);
    return wrapper;
  }

  populateCardLine() {
    this.cardLine.innerHTML = "";
    for (let i = 0; i < 30; i++) this.cardLine.appendChild(this.createCardWrapper(i));
  }

  updateCardClipping() {
    const scannerX = window.innerWidth / 2;
    const scannerWidth = 8;
    const scannerLeft = scannerX - scannerWidth / 2;
    const scannerRight = scannerX + scannerWidth / 2;
    let anyScanningActive = false;

    document.querySelectorAll(".card-wrapper").forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const cardLeft = rect.left;
      const cardRight = rect.right;
      const cardWidth = rect.width;
      const normalCard = wrapper.querySelector(".card-normal");
      const asciiCard = wrapper.querySelector(".card-ascii");

      if (cardLeft < scannerRight && cardRight > scannerLeft) {
        anyScanningActive = true;
        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);
        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;
        normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
        asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);
      } else {
        if (cardRight < scannerLeft) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left", "100%");
        } else if (cardLeft > scannerRight) {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left", "0%");
        }
      }
    });

    if (window.setScannerScanning) window.setScannerScanning(anyScanningActive);
  }

  updateAsciiContent() {
    document.querySelectorAll(".ascii-content").forEach((content) => {
      if (Math.random() < 0.15) {
        const { width, height } = this.calculateCodeDimensions(400, 250);
        content.textContent = this.generateCode(width, height);
      }
    });
  }

  onWheel(e) {
    e.preventDefault();
    this.position += e.deltaY > 0 ? 20 : -20;
    this.updateCardPosition();
  }

  startPeriodicUpdates() {
    this.interval = setInterval(() => this.updateAsciiContent(), 200);
    const updateClipping = () => {
      this.updateCardClipping();
      this.clipRaf = requestAnimationFrame(updateClipping);
    };
    updateClipping();
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.clipRaf) cancelAnimationFrame(this.clipRaf);
    if (this.interval) clearInterval(this.interval);
  }
}

class ParticleScanner {
  constructor() {
    this.canvas = document.getElementById("scannerCanvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.w = window.innerWidth;
    this.h = 300;
    this.particles = [];
    this.count = 0;
    this.maxParticles = 800;
    this.intensity = 0.8;
    this.lightBarX = this.w / 2;
    this.lightBarWidth = 3;
    this.fadeZone = 60;
    this.scanningActive = false;
    this.baseIntensity = this.intensity;
    this.baseMaxParticles = this.maxParticles;
    this.baseFadeZone = this.fadeZone;
    this.currentIntensity = this.intensity;
    this.currentMaxParticles = this.maxParticles;
    this.currentFadeZone = this.fadeZone;
    this.transitionSpeed = 0.05;
    this.setupCanvas();
    this.createGradientCache();
    this.initParticles();
    this.animate();
    window.addEventListener("resize", () => this.onResize());
  }

  setupCanvas() {
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  onResize() {
    this.w = window.innerWidth;
    this.lightBarX = this.w / 2;
    this.setupCanvas();
  }

  createGradientCache() {
    this.gradientCanvas = document.createElement("canvas");
    this.gradientCtx = this.gradientCanvas.getContext("2d");
    this.gradientCanvas.width = 16;
    this.gradientCanvas.height = 16;
    const half = this.gradientCanvas.width / 2;
    const gradient = this.gradientCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
    gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
    gradient.addColorStop(1, "transparent");
    this.gradientCtx.fillStyle = gradient;
    this.gradientCtx.beginPath();
    this.gradientCtx.arc(half, half, half, 0, Math.PI * 2);
    this.gradientCtx.fill();
  }

  randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  createParticle() {
    return {
      x: this.lightBarX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2),
      y: this.randomFloat(0, this.h),
      vx: this.randomFloat(0.2, 1.0),
      vy: this.randomFloat(-0.15, 0.15),
      radius: this.randomFloat(0.4, 1),
      alpha: this.randomFloat(0.6, 1),
      decay: this.randomFloat(0.005, 0.025),
      originalAlpha: 0,
      life: 1,
      time: 0,
      twinkleSpeed: this.randomFloat(0.02, 0.08),
      twinkleAmount: this.randomFloat(0.1, 0.25),
    };
  }

  initParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.createParticle();
      p.originalAlpha = p.alpha;
      this.particles[++this.count] = p;
    }
  }

  drawLightBar() {
    const targetGlowIntensity = this.scanningActive ? 3.5 : 1;
    if (!this.currentGlowIntensity) this.currentGlowIntensity = 1;
    this.currentGlowIntensity += (targetGlowIntensity - this.currentGlowIntensity) * this.transitionSpeed;

    const glow = this.currentGlowIntensity;
    const lineWidth = this.lightBarWidth;

    const verticalGradient = this.ctx.createLinearGradient(0, 0, 0, this.h);
    verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    verticalGradient.addColorStop(this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
    verticalGradient.addColorStop(1 - this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
    verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    this.ctx.globalCompositeOperation = "lighter";

    const coreGradient = this.ctx.createLinearGradient(
      this.lightBarX - lineWidth / 2,
      0,
      this.lightBarX + lineWidth / 2,
      0
    );
    coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glow})`);
    coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glow})`);
    coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glow})`);
    coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = coreGradient;
    this.ctx.beginPath();
    this.ctx.roundRect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h, 15);
    this.ctx.fill();

    const glow1 = this.ctx.createLinearGradient(
      this.lightBarX - lineWidth * 2,
      0,
      this.lightBarX + lineWidth * 2,
      0
    );
    glow1.addColorStop(0, "rgba(139, 92, 246, 0)");
    glow1.addColorStop(0.5, `rgba(196, 181, 253, ${0.8 * glow})`);
    glow1.addColorStop(1, "rgba(139, 92, 246, 0)");
    this.ctx.globalAlpha = this.scanningActive ? 1 : 0.8;
    this.ctx.fillStyle = glow1;
    this.ctx.beginPath();
    this.ctx.roundRect(this.lightBarX - lineWidth * 2, 0, lineWidth * 4, this.h, 25);
    this.ctx.fill();

    const glow2 = this.ctx.createLinearGradient(
      this.lightBarX - lineWidth * 4,
      0,
      this.lightBarX + lineWidth * 4,
      0
    );
    glow2.addColorStop(0, "rgba(139, 92, 246, 0)");
    glow2.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 * glow})`);
    glow2.addColorStop(1, "rgba(139, 92, 246, 0)");
    this.ctx.globalAlpha = this.scanningActive ? 0.8 : 0.6;
    this.ctx.fillStyle = glow2;
    this.ctx.beginPath();
    this.ctx.roundRect(this.lightBarX - lineWidth * 4, 0, lineWidth * 8, this.h, 35);
    this.ctx.fill();

    if (this.scanningActive) {
      const glow3 = this.ctx.createLinearGradient(
        this.lightBarX - lineWidth * 8,
        0,
        this.lightBarX + lineWidth * 8,
        0
      );
      glow3.addColorStop(0, "rgba(139, 92, 246, 0)");
      glow3.addColorStop(0.5, "rgba(139, 92, 246, 0.2)");
      glow3.addColorStop(1, "rgba(139, 92, 246, 0)");
      this.ctx.globalAlpha = 0.6;
      this.ctx.fillStyle = glow3;
      this.ctx.beginPath();
      this.ctx.roundRect(this.lightBarX - lineWidth * 8, 0, lineWidth * 16, this.h, 45);
      this.ctx.fill();
    }

    this.ctx.globalCompositeOperation = "destination-in";
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = verticalGradient;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;
    p.time++;
    p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
    p.life -= p.decay;
    if (p.x > this.w + 10 || p.life <= 0) {
      p.x = this.lightBarX + this.randomFloat(-this.lightBarWidth / 2, this.lightBarWidth / 2);
      p.y = this.randomFloat(0, this.h);
      p.life = 1;
      p.alpha = this.randomFloat(0.6, 1);
      p.originalAlpha = p.alpha;
    }
  }

  drawParticle(p) {
    if (p.life <= 0) return;
    let fadeAlpha = 1;
    if (p.y < this.fadeZone) fadeAlpha = p.y / this.fadeZone;
    else if (p.y > this.h - this.fadeZone) fadeAlpha = (this.h - p.y) / this.fadeZone;
    this.ctx.globalAlpha = p.alpha * Math.max(0, Math.min(1, fadeAlpha));
    this.ctx.drawImage(this.gradientCanvas, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
  }

  render() {
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawLightBar();
    this.ctx.globalCompositeOperation = "lighter";
    for (let i = 1; i <= this.count; i++) {
      if (!this.particles[i]) continue;
      this.updateParticle(this.particles[i]);
      this.drawParticle(this.particles[i]);
    }
    if (Math.random() < this.intensity && this.count < this.maxParticles + 400) {
      const p = this.createParticle();
      p.originalAlpha = p.alpha;
      this.particles[++this.count] = p;
    }
  }

  animate() {
    this.render();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  setScanningActive(active) {
    this.scanningActive = active;
    this.intensity = active ? 1.8 : this.baseIntensity;
    this.maxParticles = active ? 2500 : this.baseMaxParticles;
    this.fadeZone = active ? 35 : this.baseFadeZone;
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.particles = [];
    this.count = 0;
  }
}

function initCardScanner() {
  let attempts = 0;
  const maxAttempts = 10;
  const tryInit = () => {
    const cardStream = document.getElementById("cardStream");
    const cardLine = document.getElementById("cardLine");
    const scannerCanvas = document.getElementById("scannerCanvas");
    if (cardStream && cardLine && scannerCanvas) {
      window.cardStream = new CardStreamController();
      window.particleScanner = new ParticleScanner();
      window.setScannerScanning = (active) => {
        if (window.particleScanner) window.particleScanner.setScanningActive(active);
      };
    } else if (attempts++ < maxAttempts) {
      setTimeout(tryInit, 200);
    }
  };
  setTimeout(tryInit, 300);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCardScanner);
} else {
  initCardScanner();
}
