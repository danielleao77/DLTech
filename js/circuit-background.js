/**
 * CircuitBackground Class
 * Renders a fixed, responsive CPU-chip style circuit board background on HTML5 Canvas.
 * Featues interactive mouse-glow (lighting up traces on hover) and animated energy pulses.
 */
export class CircuitBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.paths = [];
    this.pulses = [];
    this.animationFrameId = null;
    this.mouse = { x: -9999, y: -9999 };
    
    // Configs
    this.config = {
      purpleColor: 'rgba(168, 85, 247, 1)',
      blueColor: 'rgba(14, 165, 233, 1)',
      traceOpacityBase: 0.12,
      glowRadius: 120, // Mouse interaction radius
      pulseSpawnChance: 0.008,
      maxPulses: 6
    };

    // Carregamento do logotipo
    this.logo = new Image();
    this.logo.src = 'images/logo.png';
    this.logoLoaded = false;
    this.logo.onload = () => {
      this.logoLoaded = true;
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.generateFixedCircuits();
    this.animate();

    // Event Listeners
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  handleResize() {
    this.resizeCanvas();
    this.generateFixedCircuits();
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  handleMouseLeave() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  /**
   * Generates a fixed, symmetric layout of circuits originating from a central CPU chip outline.
   */
  generateFixedCircuits() {
    this.paths = [];
    this.pulses = [];

    const w = this.canvas.width;
    const h = this.canvas.height;
    
    const isMobile = w < 768;
    
    // CPU central square location (shifted higher up near the header, even higher on mobile)
    this.chip = {
      cx: w / 2,
      cy: isMobile ? 95 : Math.max(150, Math.min(h * 0.20, 190)),
      size: isMobile ? 110 : Math.max(160, Math.min(w * 0.20, 220)) // Adaptive size
    };

    const cx = this.chip.cx;
    const cy = this.chip.cy;
    const s = this.chip.size;
    const half = s / 2;

    // Left Side Paths (Purple theme)
    const leftCount = 10;
    for (let i = 0; i < leftCount; i++) {
      const startY = (cy - half) + (i + 0.5) * (s / leftCount);
      const points = [];
      points.push({ x: cx - half, y: startY });

      // First segment: Go straight left
      const len1 = 40 + (i % 3) * 20;
      points.push({ x: cx - half - len1, y: startY });

      // Second segment: Bend 45 degrees
      const isTopHalf = startY < cy;
      const bendY = isTopHalf ? startY - 50 - (i * 10) : startY + 50 + ((leftCount - i) * 10);
      const bendX = cx - half - len1 - Math.abs(bendY - startY);
      points.push({ x: bendX, y: bendY });

      // Third segment: Go all the way to the left edge
      points.push({ x: 0, y: bendY });

      this.paths.push({
        points,
        color: this.config.purpleColor,
        side: 'left'
      });
    }

    // Right Side Paths (Blue theme)
    const rightCount = 10;
    for (let i = 0; i < rightCount; i++) {
      const startY = (cy - half) + (i + 0.5) * (s / rightCount);
      const points = [];
      points.push({ x: cx + half, y: startY });

      // First segment: Go straight right
      const len1 = 40 + (i % 3) * 20;
      points.push({ x: cx + half + len1, y: startY });

      // Second segment: Bend 45 degrees
      const isTopHalf = startY < cy;
      const bendY = isTopHalf ? startY - 50 - (i * 10) : startY + 50 + ((rightCount - i) * 10);
      const bendX = cx + half + len1 + Math.abs(bendY - startY);
      points.push({ x: bendX, y: bendY });

      // Third segment: Go all the way to the right edge
      points.push({ x: w, y: bendY });

      this.paths.push({
        points,
        color: this.config.blueColor,
        side: 'right'
      });
    }

    // Top Side Paths (Vertical)
    const topCount = 5;
    for (let i = 0; i < topCount; i++) {
      const startX = (cx - half) + (i + 1) * (s / (topCount + 1));
      const points = [];
      points.push({ x: startX, y: cy - half });

      const len1 = 30 + (i % 2) * 15;
      points.push({ x: startX, y: cy - half - len1 });

      const bendX = startX + (i - 2) * 30;
      const bendY = cy - half - len1 - Math.abs(bendX - startX);
      points.push({ x: bendX, y: bendY });
      points.push({ x: bendX, y: 0 });

      // Blend color based on position
      const color = startX < cx ? this.config.purpleColor : this.config.blueColor;

      this.paths.push({
        points,
        color,
        side: 'top'
      });
    }

    // Bottom Side Paths (Vertical)
    const bottomCount = 5;
    for (let i = 0; i < bottomCount; i++) {
      const startX = (cx - half) + (i + 1) * (s / (bottomCount + 1));
      const points = [];
      points.push({ x: startX, y: cy + half });

      const len1 = 30 + (i % 2) * 15;
      points.push({ x: startX, y: cy + half + len1 });

      const bendX = startX + (i - 2) * 30;
      const bendY = cy + half + len1 + Math.abs(bendX - startX);
      points.push({ x: bendX, y: bendY });
      points.push({ x: bendX, y: h });

      // Blend color based on position
      const color = startX < cx ? this.config.purpleColor : this.config.blueColor;

      this.paths.push({
        points,
        color,
        side: 'bottom'
      });
    }
  }

  /**
   * Helper to calculate minimum distance from a point to a path.
   */
  getDistanceToPath(px, py, points) {
    let minDist = Infinity;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dist = this.getDistanceToSegment(px, py, p1.x, p1.y, p2.x, p2.y);
      if (dist < minDist) {
        minDist = dist;
      }
    }
    return minDist;
  }

  getDistanceToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) {
      return Math.hypot(px - x1, py - y1);
    }
    let t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));
    const nearestX = x1 + t * dx;
    const nearestY = y1 + t * dy;
    return Math.hypot(px - nearestX, py - nearestY);
  }

  spawnPulse() {
    if (this.pulses.length >= this.config.maxPulses || this.paths.length === 0) return;

    // Pick a random path
    const path = this.paths[Math.floor(Math.random() * this.paths.length)];

    this.pulses.push({
      path: path.points,
      color: path.color,
      segmentIndex: 0,
      progress: 0,
      speed: 0.012 + Math.random() * 0.015
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw central CPU Square with gradient glowing border
    if (this.chip) {
      const cx = this.chip.cx;
      const cy = this.chip.cy;
      const s = this.chip.size;
      const x = cx - s / 2;
      const y = cy - s / 2;

      // Draw outline
      const grad = this.ctx.createLinearGradient(x, y, x + s, y + s);
      grad.addColorStop(0, this.config.purpleColor.replace('1)', '0.8)'));
      grad.addColorStop(1, this.config.blueColor.replace('1)', '0.8)'));

      // Check mouse distance to chip border to glow it
      const distToCenter = Math.hypot(this.mouse.x - cx, this.mouse.y - cy);
      let chipGlow = 0;
      if (distToCenter < s) {
        chipGlow = Math.max(0, 1 - distToCenter / s);
      }

      this.ctx.beginPath();
      this.ctx.roundRect(x, y, s, s, 16);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2 + chipGlow * 1.5;
      if (chipGlow > 0) {
        this.ctx.shadowColor = this.config.purpleColor;
        this.ctx.shadowBlur = 12 * chipGlow;
      }
      this.ctx.stroke();
      this.ctx.shadowBlur = 0; // Reset

      // Render logo inside the CPU box
      if (this.logoLoaded) {
        const imgSize = s * 0.70; // Fit nicely inside the square
        const aspect = this.logo.width / this.logo.height;
        let imgW = imgSize;
        let imgH = imgSize;
        
        if (aspect > 1) {
          imgH = imgSize / aspect;
        } else {
          imgW = imgSize * aspect;
        }
        
        this.ctx.save();
        // Add subtle glow to logo under hover
        if (chipGlow > 0) {
          this.ctx.shadowColor = this.config.blueColor;
          this.ctx.shadowBlur = 8 * chipGlow;
        }
        this.ctx.drawImage(this.logo, cx - imgW / 2, cy - imgH / 2, imgW, imgH);
        this.ctx.restore();
      }
    }

    // 2. Draw static traces and joint pads with interactive hover lighting
    this.paths.forEach(path => {
      const points = path.points;
      if (points.length < 2) return;

      // Distance from mouse to trace
      const dist = this.getDistanceToPath(this.mouse.x, this.mouse.y, points);
      let hoverGlow = 0;
      if (dist < this.config.glowRadius) {
        hoverGlow = Math.max(0, 1 - dist / this.config.glowRadius);
      }

      // Calculate path opacity
      const opacity = this.config.traceOpacityBase + (hoverGlow * 0.7);
      const strokeColor = path.color.replace('1)', `${opacity})`);

      this.ctx.beginPath();
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = 1.5 + (hoverGlow * 1.5);
      
      if (hoverGlow > 0) {
        this.ctx.shadowColor = path.color;
        this.ctx.shadowBlur = 10 * hoverGlow;
      }

      this.ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i].x, points[i].y);
      }
      this.ctx.stroke();
      this.ctx.shadowBlur = 0; // Reset

      // Joint pads (circles)
      const endPt = points[points.length - 1];
      this.ctx.beginPath();
      this.ctx.arc(endPt.x, endPt.y, 2.5 + (hoverGlow * 1), 0, Math.PI * 2);
      this.ctx.fillStyle = strokeColor;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(endPt.x, endPt.y, 4.5 + (hoverGlow * 1.5), 0, Math.PI * 2);
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = 0.75;
      this.ctx.stroke();
    });

    // 3. Spawn periodic pulses
    if (Math.random() < this.config.pulseSpawnChance) {
      this.spawnPulse();
    }

    // 4. Update and render active pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      const startNode = pulse.path[pulse.segmentIndex];
      const endNode = pulse.path[pulse.segmentIndex + 1];

      if (!startNode || !endNode) {
        this.pulses.splice(i, 1);
        continue;
      }

      const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
      const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;

      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = pulse.color;
      this.ctx.shadowColor = pulse.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // Reset

      // Pulse tail
      this.ctx.beginPath();
      this.ctx.strokeStyle = pulse.color.replace('1)', '0.5)');
      this.ctx.lineWidth = 2.5;
      this.ctx.moveTo(
        startNode.x + (endNode.x - startNode.x) * Math.max(0, pulse.progress - 0.12),
        startNode.y + (endNode.y - startNode.y) * Math.max(0, pulse.progress - 0.12)
      );
      this.ctx.lineTo(x, y);
      this.ctx.stroke();

      pulse.progress += pulse.speed;

      if (pulse.progress >= 1) {
        pulse.segmentIndex++;
        pulse.progress = 0;
        if (pulse.segmentIndex >= pulse.path.length - 1) {
          this.pulses.splice(i, 1);
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', () => this.handleResize());
  }
}
