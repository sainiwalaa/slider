/**
 * AETHER LEAP - High-Speed Sci-Fi Action Platform Runner
 * 100 Playable Levels across 10 Worlds
 */

// Import styles so Vite bundles everything together
import './style.css';

// --- AUDIO SYNTHESIZER (Web Audio API) ---
class SoundManager {
  ctx: AudioContext | null = null;
  sfxEnabled = true;
  musicEnabled = true;
  musicTimer: any = null;
  currentScale = [220, 261.63, 293.66, 329.63, 392.00, 440.00];
  noteIndex = 0;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, gainStart = 0.2, gainEnd = 0.001) {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(gainStart, t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, gainEnd), t + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + duration);
    } catch (_) {}
  }

  playJump() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(620, t + 0.16);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } catch (_) {}
  }

  playDoubleJump() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.2);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch (_) {}
  }

  playSlide() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(400, t + 0.2);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    } catch (_) {}
  }

  playAttack() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.12);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    } catch (_) {}
  }

  playHit() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.12);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    } catch (_) {}
  }

  playEnemyDeath() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (_) {}
  }

  playCrystal() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const notes = [587.33, 880, 1174.66];
      notes.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + idx * 0.04);
        gain.gain.setValueAtTime(0.18, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.04);
        osc.stop(t + idx * 0.04 + 0.16);
      });
    } catch (_) {}
  }

  playCheckpoint() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t + idx * 0.06);
        gain.gain.setValueAtTime(0.2, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.25);
      });
    } catch (_) {}
  }

  playLevelComplete() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const chords = [
        [261.63, 329.63, 392],
        [293.66, 369.99, 440],
        [329.63, 392.00, 493.88],
        [523.25, 659.25, 783.99]
      ];
      chords.forEach((chord, cIdx) => {
        const ct = t + cIdx * 0.16;
        chord.forEach(f => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, ct);
          gain.gain.setValueAtTime(0.18, ct);
          gain.gain.exponentialRampToValueAtTime(0.001, ct + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(ct);
          osc.stop(ct + 0.4);
        });
      });
    } catch (_) {}
  }

  playClick() {
    this.playTone(800, 'sine', 0.04, 0.12, 0.001);
  }

  startThemeMusic(worldIdx: number) {
    if (!this.musicEnabled) return;
    this.stopMusic();
    const scales = [
      [220, 261.63, 293.66, 329.63, 392.00], // Cyber
      [174.61, 220.00, 261.63, 293.66, 349.23], // Forest
      [130.81, 155.56, 174.61, 196.00, 233.08], // Magma
      [293.66, 329.63, 392.00, 440.00, 523.25], // Crystal
      [246.94, 277.18, 329.63, 369.99, 440.00], // Lab
      [196.00, 246.94, 293.66, 349.23, 392.00], // Orbital
      [146.83, 174.61, 220.00, 246.94, 293.66], // Desert
      [261.63, 293.66, 329.63, 392.00, 440.00], // Tundra
      [164.81, 196.00, 220.00, 246.94, 329.63], // Toxic
      [110.00, 146.83, 164.81, 220.00, 261.63]  // Nexus
    ];
    this.currentScale = scales[Math.min(scales.length - 1, worldIdx || 0)];
    this.noteIndex = 0;

    const tempo = 220;
    this.musicTimer = setInterval(() => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== 'running') return;
      try {
        const t = this.ctx.currentTime;
        const root = this.currentScale[this.noteIndex % this.currentScale.length];
        this.noteIndex = (this.noteIndex + 1 + Math.floor(Math.random() * 2)) % this.currentScale.length;

        // Bass pulse
        const bass = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bass.type = 'sawtooth';
        bass.frequency.setValueAtTime(root * 0.5, t);
        bGain.gain.setValueAtTime(0.04, t);
        bGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        bass.connect(bGain);
        bGain.connect(this.ctx.destination);
        bass.start(t);
        bass.stop(t + 0.18);

        // Arpeggiated high chime
        if (this.noteIndex % 2 === 0) {
          const high = this.ctx.createOscillator();
          const hGain = this.ctx.createGain();
          high.type = 'sine';
          high.frequency.setValueAtTime(root * 2, t + 0.1);
          hGain.gain.setValueAtTime(0.03, t + 0.1);
          hGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
          high.connect(hGain);
          hGain.connect(this.ctx.destination);
          high.start(t + 0.1);
          high.stop(t + 0.22);
        }
      } catch (_) {}
    }, tempo);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

// --- 10 WORLD THEMES ---
const WORLD_THEMES = [
  { name: "Neon City", sky: "#080c1e", ground: "#161b33", accent: "#00f0ff", hazard: "#ff007f", particle: "#00f0ff" },
  { name: "Cyber Forest", sky: "#051410", ground: "#0d2b22", accent: "#00ffaa", hazard: "#ffaa00", particle: "#55ff99" },
  { name: "Magma Core", sky: "#1a0606", ground: "#330e0e", accent: "#ff3300", hazard: "#ffff00", particle: "#ff5500" },
  { name: "Crystal Caves", sky: "#0f081c", ground: "#221138", accent: "#b300ff", hazard: "#ff00bb", particle: "#e066ff" },
  { name: "High-Tech Lab", sky: "#06121a", ground: "#112636", accent: "#00d4ff", hazard: "#ff0044", particle: "#66e0ff" },
  { name: "Orbital Station", sky: "#02030a", ground: "#141729", accent: "#7099ff", hazard: "#ff2266", particle: "#99bbff" },
  { name: "Desert Ruins", sky: "#170f07", ground: "#382312", accent: "#ffaa33", hazard: "#ff2200", particle: "#ffd280" },
  { name: "Frozen Tundra", sky: "#08131c", ground: "#162f45", accent: "#a6e3e9", hazard: "#ff5e7e", particle: "#e3f6f5" },
  { name: "Toxic Wastelands", sky: "#0a1405", ground: "#1b330e", accent: "#76ff03", hazard: "#ff0055", particle: "#b2ff59" },
  { name: "Nexus Core", sky: "#030208", ground: "#150f29", accent: "#ff0055", hazard: "#00f0ff", particle: "#ffffff" }
];

// --- SAVE SYSTEM ---
class SaveSystem {
  key = 'aether_leap_save_data';
  data: any;

  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return {
      unlockedLevel: 1,
      totalCrystals: 0,
      highScore: 0,
      levels: {},
      settings: { sfx: true, music: true, shake: true, performance: false }
    };
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    } catch (_) {}
  }

  completeLevel(levelNum: number, stars: number, crystals: number, score: number, time: number) {
    if (levelNum >= this.data.unlockedLevel && levelNum < 100) {
      this.data.unlockedLevel = levelNum + 1;
    }
    this.data.totalCrystals = (this.data.totalCrystals || 0) + crystals;
    this.data.highScore = Math.max(this.data.highScore || 0, score);
    const prev = this.data.levels[levelNum] || { stars: 0, score: 0, bestTime: 9999 };
    this.data.levels[levelNum] = {
      stars: Math.max(prev.stars || 0, stars),
      score: Math.max(prev.score || 0, score),
      bestTime: Math.min(prev.bestTime || 9999, time),
      completed: true
    };
    this.save();
  }

  resetProgress() {
    this.data.unlockedLevel = 1;
    this.data.totalCrystals = 0;
    this.data.highScore = 0;
    this.data.levels = {};
    this.save();
  }
}

// --- DETERMINISTIC RANDOM ---
function pseudoRandom(seed: number) {
  let s = Math.sin(seed) * 10000;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// --- LEVEL BUILDER (100 Balanced, Playable Levels) ---
class LevelManager {
  static generateLevel(levelNum: number): any {
    const worldIdx = Math.floor((levelNum - 1) / 10);
    const theme = WORLD_THEMES[Math.min(WORLD_THEMES.length - 1, worldIdx)];
    const rand = pseudoRandom(levelNum * 9973 + 431);

    const baseLength = 2600 + (levelNum - 1) * 90;
    const levelWidth = baseLength;
    const levelHeight = 850;

    const platforms: any[] = [];
    const hazards: any[] = [];
    const enemies: any[] = [];
    const collectibles: any[] = [];
    const checkpoints: any[] = [];

    // Starting runway
    platforms.push({ x: 0, y: 600, w: 700, h: 250, type: 'solid' });

    let cursorX = 620;
    let cursorY = 600;

    const numCheckpoints = levelNum < 15 ? 2 : (levelNum < 55 ? 3 : 4);
    const checkpointInterval = levelWidth / (numCheckpoints + 1);
    let nextCheckpointDist = checkpointInterval;

    while (cursorX < levelWidth - 750) {
      const maxGapForLevel = Math.min(190, 110 + Math.floor(levelNum * 0.8));
      const gap = 75 + Math.floor(rand() * (maxGapForLevel - 75));

      const minPlatW = Math.max(190, 360 - Math.floor(levelNum * 1.4));
      const pWidth = minPlatW + Math.floor(rand() * 180);

      const heightShift = (rand() - 0.5) * (90 + Math.min(60, levelNum * 0.6));
      cursorY = Math.max(380, Math.min(660, cursorY + heightShift));
      cursorX += gap;

      const isOneWay = rand() < 0.25;
      const isMoving = levelNum >= 7 && rand() < (0.12 + Math.min(0.2, levelNum * 0.002));

      platforms.push({
        x: cursorX,
        y: cursorY,
        w: pWidth,
        h: isOneWay ? 20 : (levelHeight - cursorY + 100),
        type: isOneWay ? 'oneway' : 'solid',
        isMoving: isMoving,
        moveAxis: rand() > 0.5 ? 'x' : 'y',
        moveRange: 60 + Math.floor(rand() * 70),
        moveSpeed: 0.8 + rand() * 0.8,
        origX: cursorX,
        origY: cursorY,
        moveOffset: rand() * Math.PI * 2
      });

      if (pWidth > 260 && rand() < (0.2 + Math.min(0.25, levelNum * 0.004))) {
        const spikeW = 36 + Math.floor(rand() * 32);
        const spikeX = cursorX + pWidth * 0.4;
        hazards.push({ type: 'spike', x: spikeX, y: cursorY - 18, w: spikeW, h: 18 });
      }

      if (pWidth >= 220 && rand() < (0.28 + Math.min(0.32, levelNum * 0.005))) {
        const enemyTypeRoll = rand();
        let eType = 'patrol';
        if (levelNum >= 5 && enemyTypeRoll > 0.75) eType = 'flyer';
        else if (levelNum >= 12 && enemyTypeRoll > 0.5) eType = 'rusher';
        else if (levelNum >= 25 && enemyTypeRoll > 0.85) eType = 'heavy';

        const eSpeed = eType === 'rusher' ? 2.0 : (eType === 'flyer' ? 1.2 : (eType === 'heavy' ? 0.7 : 1.0));

        enemies.push({
          type: eType,
          x: cursorX + pWidth * 0.55,
          y: eType === 'flyer' ? cursorY - 110 : cursorY - 48,
          minX: cursorX + 24,
          maxX: cursorX + pWidth - 24,
          hp: eType === 'heavy' ? 5 : (eType === 'rusher' ? 3 : 2),
          maxHp: eType === 'heavy' ? 5 : (eType === 'rusher' ? 3 : 2),
          speed: eSpeed,
          vx: eSpeed,
          dir: 1,
          w: eType === 'heavy' ? 44 : 32,
          h: eType === 'heavy' ? 54 : 36,
          alive: true,
          attackCooldown: 0
        });
      }

      const numCrystals = Math.floor(1 + rand() * 3);
      for (let c = 0; c < numCrystals; c++) {
        collectibles.push({
          x: cursorX + (pWidth / (numCrystals + 1)) * (c + 1),
          y: cursorY - 35 - Math.sin(c) * 30,
          r: 12,
          collected: false,
          animOffset: rand() * 6
        });
      }

      if (cursorX >= nextCheckpointDist && checkpoints.length < numCheckpoints) {
        checkpoints.push({ x: cursorX + 50, y: cursorY, active: false, animTimer: 0 });
        nextCheckpointDist += checkpointInterval;
      }

      cursorX += pWidth;
    }

    const goalPlatformX = cursorX + 70;
    const goalY = 600;
    platforms.push({ x: goalPlatformX, y: goalY, w: 700, h: 250, type: 'solid' });

    const goal = { x: goalPlatformX + 380, y: goalY - 60, w: 56, h: 90 };

    let boss = null;
    if (levelNum === 50) {
      boss = { name: "MAGMA SENTINEL", type: "boss_magma", x: goalPlatformX + 200, y: goalY - 90, w: 80, h: 90, hp: 25, maxHp: 25, vx: 1.2, dir: 1, alive: true };
    } else if (levelNum === 100) {
      boss = { name: "NEXUS OVERLORD", type: "boss_nexus", x: goalPlatformX + 200, y: goalY - 110, w: 96, h: 110, hp: 45, maxHp: 45, vx: 1.4, dir: 1, alive: true };
    }

    return {
      levelNum,
      worldIdx,
      theme,
      width: goalPlatformX + 750,
      height: levelHeight,
      startX: 140,
      startY: 600,
      platforms,
      hazards,
      enemies,
      collectibles,
      checkpoints,
      goal,
      boss
    };
  }
}

// --- PARTICLE FX ---
class ParticleManager {
  particles: any[] = [];
  floatingParticles: any[] = [];

  reset() {
    this.particles = [];
    this.floatingParticles = [];
  }

  add(x: number, y: number, vx: number, vy: number, color: string, size: number, life: number, type = 'dot') {
    this.particles.push({ x, y, vx, vy, color, size, life, maxLife: life, type });
  }

  createExplosion(x: number, y: number, color: string, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 1.0 + Math.random() * 3.5;
      this.add(
        x,
        y,
        Math.cos(angle) * spd,
        Math.sin(angle) * spd,
        color,
        2 + Math.random() * 3,
        15 + Math.floor(Math.random() * 15),
        'spark'
      );
    }
  }

  createSlashSparks(x: number, y: number, dir: number) {
    for (let i = 0; i < 14; i++) {
      const angle = (dir > 0 ? -0.4 : Math.PI - 0.4) + (Math.random() - 0.5) * 1.2;
      const spd = 2.5 + Math.random() * 4.5;
      this.add(
        x,
        y,
        Math.cos(angle) * spd,
        Math.sin(angle) * spd,
        i % 2 === 0 ? '#00f0ff' : '#ff007f',
        2 + Math.random() * 3,
        12 + Math.floor(Math.random() * 12),
        'spark'
      );
    }
  }

  update(theme: any, cameraX: number, viewWidth: number, viewHeight: number, dtScale = 1.0) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dtScale;
      p.y += p.vy * dtScale;
      p.vy += 0.15 * dtScale;
      p.life -= dtScale;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.floatingParticles.length < 24) {
      this.floatingParticles.push({
        x: cameraX + Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.4,
        size: 1.5 + Math.random() * 2,
        color: theme.particle,
        alpha: 0.2 + Math.random() * 0.4
      });
    }

    for (let i = this.floatingParticles.length - 1; i >= 0; i--) {
      const fp = this.floatingParticles[i];
      fp.x += fp.vx * dtScale;
      fp.y += fp.vy * dtScale;
      if (fp.y < -20 || fp.y > viewHeight + 20 || fp.x < cameraX - 100 || fp.x > cameraX + viewWidth + 100) {
        this.floatingParticles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    for (const fp of this.floatingParticles) {
      ctx.fillStyle = fp.color;
      ctx.globalAlpha = fp.alpha;
      ctx.beginPath();
      ctx.arc(fp.x - cameraX, fp.y, fp.size, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      const screenX = p.x - cameraX;
      const screenY = p.y - cameraY;
      if (p.type === 'spark') {
        ctx.fillRect(screenX, screenY, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

// --- PLAYER CONTROLLER ---
class Player {
  w = 26;
  h = 60;
  x = 140;
  y = 600;
  vx = 0;
  vy = 0;
  dir = 1; // 1 = facing RIGHT, -1 = facing LEFT

  state = 'idle';
  onGround = false;
  canDoubleJump = true;
  isDucking = false;
  isSliding = false;
  slideTimer = 0;
  isAttacking = false;
  attackTimer = 0;
  attackCooldown = 0;

  coyoteTimer = 0;
  jumpBufferTimer = 0;
  doubleJumpCooldown = 0;
  airTime = 0;
  wasAttackingInput = false;

  hp = 100;
  maxHp = 100;
  stamina = 100;
  maxStamina = 100;
  isInvulnerable = false;
  invulnTimer = 0;

  checkpointX = 140;
  checkpointY = 600;

  animTime = 0;
  scarfPoints = [
    { x: 0, y: 0 },
    { x: -8, y: 4 },
    { x: -16, y: 8 },
    { x: -24, y: 12 }
  ];

  resetToCheckpoint() {
    this.x = this.checkpointX;
    this.y = this.checkpointY;
    this.vx = 0;
    this.vy = 0;
    this.dir = 1;
    this.hp = this.maxHp;
    this.stamina = this.maxStamina;
    this.isDucking = false;
    this.isSliding = false;
    this.slideTimer = 0;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.attackCooldown = 0;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.doubleJumpCooldown = 0;
    this.airTime = 0;
    this.state = 'idle';
    this.isInvulnerable = true;
    this.invulnTimer = 45;
  }

  update(input: any, level: any, sound: any, particles: any, dtScale = 1.0, rawDt = 1 / 60) {
    this.animTime += 0.16 * dtScale;

    if (this.stamina < this.maxStamina && !this.isSliding) {
      this.stamina = Math.min(this.maxStamina, this.stamina + 0.45 * dtScale);
    }

    if (this.isInvulnerable) {
      this.invulnTimer -= dtScale;
      if (this.invulnTimer <= 0) this.isInvulnerable = false;
    }

    if (this.attackCooldown > 0) this.attackCooldown -= dtScale;
    if (this.doubleJumpCooldown > 0) this.doubleJumpCooldown -= rawDt;

    if (this.isAttacking) {
      this.attackTimer -= dtScale;
      if (this.attackTimer <= 0) {
        this.isAttacking = false;
      }
    }

    // Single attack per tap
    const attackRequested = (input.attackJustPressed || (input.attack && !this.wasAttackingInput));
    if (attackRequested && !this.isAttacking && this.attackCooldown <= 0) {
      this.isAttacking = true;
      this.attackTimer = 14;
      this.attackCooldown = 18;
      sound.playAttack();
      particles.createSlashSparks(this.x + this.dir * 28, this.y - 25, this.dir);
      this.performSlashHitCheck(level, sound, particles);
    }
    this.wasAttackingInput = !!input.attack;
    input.attackJustPressed = false;

    // Coyote & Air time
    if (this.onGround) {
      this.coyoteTimer = 0.12;
      this.airTime = 0;
      this.canDoubleJump = true;
    } else {
      this.coyoteTimer = Math.max(0, this.coyoteTimer - rawDt);
      this.airTime += rawDt;
    }

    // Jump buffer
    if (input.jumpJustPressed) {
      this.jumpBufferTimer = 0.14;
      input.jumpJustPressed = false;
    } else {
      this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - rawDt);
    }

    // Jump execution
    if (this.jumpBufferTimer > 0) {
      if (this.onGround || this.coyoteTimer > 0) {
        this.vy = -10.8;
        this.onGround = false;
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;
        this.canDoubleJump = true;
        this.doubleJumpCooldown = 0.18;
        sound.playJump();
        particles.add(this.x, this.y, 0, 1, '#00f0ff', 4, 14);
      } else if (this.canDoubleJump && this.doubleJumpCooldown <= 0 && this.airTime > 0.14) {
        this.vy = -9.6;
        this.canDoubleJump = false;
        this.jumpBufferTimer = 0;
        sound.playDoubleJump();
        for (let i = 0; i < 7; i++) {
          const angle = (i / 7) * Math.PI * 2;
          particles.add(
            this.x + Math.cos(angle) * 10,
            this.y + Math.sin(angle) * 4,
            Math.cos(angle) * 2.2,
            1 + Math.random() * 1.5,
            '#00ffaa',
            3,
            12
          );
        }
      }
    }

    // Gravity & variable jump height
    const gravity = 0.48;
    this.vy = Math.min(11.0, this.vy + gravity * dtScale);

    if (!input.jump && this.vy < -3.0) {
      this.vy += 0.65 * dtScale;
    }

    // Sliding
    if (this.isSliding) {
      this.slideTimer -= dtScale;
      this.h = 34;
      this.vx = this.dir * Math.max(4.2, 5.4 * (this.slideTimer / 22));
      particles.add(
        this.x - this.dir * 12,
        this.y,
        -this.dir * (1 + Math.random() * 1.5),
        -Math.random() * 1.2,
        '#ffaa00',
        3,
        10,
        'spark'
      );
      if (this.slideTimer <= 0 || !this.onGround) {
        this.isSliding = false;
        this.h = 60;
      }
    } else {
      if (input.slide && this.onGround && Math.abs(this.vx) > 1.6 && this.stamina >= 25) {
        this.isSliding = true;
        this.slideTimer = 22;
        this.stamina -= 25;
        sound.playSlide();
      }
    }

    // Ducking
    if (!this.isSliding) {
      if (input.duck && this.onGround) {
        this.isDucking = true;
        this.h = 36;
        this.vx *= Math.pow(0.78, dtScale);
      } else {
        this.isDucking = false;
        this.h = 60;
      }
    }

    // Horizontal running physics
    const levelSpeedMult = 1.0 + Math.min(0.20, ((level.levelNum || 1) - 1) * 0.002);
    const maxSpeed = 3.8 * levelSpeedMult;
    const accel = (this.onGround ? 0.32 : 0.20) * dtScale;
    const friction = this.onGround ? 0.82 : 0.92;

    if (!this.isSliding && !this.isDucking) {
      if (input.left && !input.right) {
        this.vx = Math.max(-maxSpeed, this.vx - accel);
        this.dir = -1; // Faces LEFT
      } else if (input.right && !input.left) {
        this.vx = Math.min(maxSpeed, this.vx + accel);
        this.dir = 1; // Faces RIGHT
      } else {
        this.vx *= Math.pow(friction, dtScale);
        if (Math.abs(this.vx) < 0.05) this.vx = 0;
      }
    }

    this.applyCollisions(level, dtScale);

    if (this.y > level.height + 60) {
      this.takeDamage(100, sound, particles);
    }

    if (this.isSliding) {
      this.state = 'slide';
    } else if (this.isDucking) {
      this.state = 'duck';
    } else if (!this.onGround) {
      this.state = this.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 0.4) {
      this.state = 'run';
    } else {
      this.state = 'idle';
    }

    const scarfRootX = this.x - this.dir * 8;
    const scarfRootY = this.y - (this.h - 14);
    this.scarfPoints[0].x = scarfRootX;
    this.scarfPoints[0].y = scarfRootY;
    for (let i = 1; i < this.scarfPoints.length; i++) {
      const prev = this.scarfPoints[i - 1];
      const cur = this.scarfPoints[i];
      const targetX = prev.x - this.dir * 8 - this.vx * 1.2;
      const targetY = prev.y + Math.sin(this.animTime + i) * 2.5 - this.vy * 0.5;
      cur.x += (targetX - cur.x) * Math.min(1.0, 0.35 * dtScale);
      cur.y += (targetY - cur.y) * Math.min(1.0, 0.35 * dtScale);
    }
  }

  applyCollisions(level: any, dtScale: number) {
    const halfW = this.w / 2;

    // 1. Horizontal movement
    this.x += this.vx * dtScale;

    if (this.x < halfW) {
      this.x = halfW;
      this.vx = 0;
    } else if (this.x > level.width - halfW) {
      this.x = level.width - halfW;
      this.vx = 0;
    }

    const feetY = this.y;
    const headY = this.y - this.h;

    for (const p of level.platforms) {
      if (p.type === 'solid') {
        const isVerticallyInSideWall = (feetY > p.y + 10 && headY < p.y + p.h - 5);
        if (isVerticallyInSideWall) {
          const playerLeft = this.x - halfW;
          const playerRight = this.x + halfW;
          const platLeft = p.x;
          const platRight = p.x + p.w;

          if (playerRight > platLeft && playerLeft < platRight) {
            if (this.vx > 0 && playerLeft < platLeft) {
              this.x = platLeft - halfW;
              this.vx = 0;
            } else if (this.vx < 0 && playerRight > platRight) {
              this.x = platRight + halfW;
              this.vx = 0;
            }
          }
        }
      }
    }

    // 2. Vertical movement
    const prevY = this.y;
    this.onGround = false;
    this.y += this.vy * dtScale;

    const currentFeetY = this.y;
    const currentHeadY = this.y - this.h;
    const playerLeft = this.x - halfW;
    const playerRight = this.x + halfW;

    for (const p of level.platforms) {
      const platLeft = p.x;
      const platRight = p.x + p.w;

      const isHorizontallyAligned = (playerRight > platLeft + 3 && playerLeft < platRight - 3);
      if (!isHorizontallyAligned) continue;

      if (this.vy >= 0) {
        const wasAboveOrNear = (prevY <= p.y + 14);
        const isNowAtOrBelow = (currentFeetY >= p.y - 2 && currentFeetY <= p.y + 22);

        if (wasAboveOrNear && isNowAtOrBelow) {
          this.y = p.y;
          this.vy = 0;
          this.onGround = true;
          this.canDoubleJump = true;

          if (p.isMoving) {
            if (p.moveAxis === 'x') {
              this.x += Math.cos(p.moveOffset) * p.moveSpeed * dtScale;
            } else {
              this.y += Math.sin(p.moveOffset) * p.moveSpeed * dtScale;
            }
          }
          continue;
        }
      }

      if (p.type === 'solid' && this.vy < 0) {
        const platBottom = p.y + p.h;
        if (currentHeadY <= platBottom && prevY - this.h >= platBottom - 16) {
          this.y = platBottom + this.h;
          this.vy = 0;
        }
      }
    }
  }

  performSlashHitCheck(level: any, sound: any, particles: any) {
    const slashRange = 48;
    const slashLeft = this.dir > 0 ? this.x : this.x - slashRange;
    const slashRight = this.dir > 0 ? this.x + slashRange : this.x;
    const slashTop = this.y - this.h - 10;
    const slashBottom = this.y + 10;

    for (const e of level.enemies) {
      if (!e.alive) continue;
      if (
        slashRight > e.x - e.w / 2 &&
        slashLeft < e.x + e.w / 2 &&
        slashBottom > e.y - e.h &&
        slashTop < e.y
      ) {
        e.hp--;
        particles.createExplosion(e.x, e.y - e.h / 2, '#ff007f', 10);
        if (e.hp <= 0) {
          e.alive = false;
          sound.playEnemyDeath();
          particles.createExplosion(e.x, e.y - e.h / 2, '#00f0ff', 16);
        } else {
          sound.playHit();
          e.x += this.dir * 12;
        }
      }
    }

    if (level.boss && level.boss.alive) {
      const b = level.boss;
      if (
        slashRight > b.x - b.w / 2 &&
        slashLeft < b.x + b.w / 2 &&
        slashBottom > b.y - b.h &&
        slashTop < b.y
      ) {
        b.hp--;
        sound.playHit();
        particles.createExplosion(b.x, b.y - b.h / 2, '#ffaa00', 14);
        if (b.hp <= 0) {
          b.alive = false;
          sound.playEnemyDeath();
          particles.createExplosion(b.x, b.y - b.h / 2, '#ff007f', 24);
        }
      }
    }
  }

  takeDamage(amount: number, sound: any, particles: any) {
    if (this.isInvulnerable || this.hp <= 0) return;
    this.hp = Math.max(0, this.hp - amount);
    this.isInvulnerable = true;
    this.invulnTimer = 45;
    sound.playHit();
    particles.createExplosion(this.x, this.y - 30, '#ff0055', 12);
  }

  draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    const renderX = this.x - cameraX;
    const renderY = this.y - cameraY;

    if (this.isInvulnerable && Math.floor(this.invulnTimer / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(renderX, renderY);
    ctx.scale(this.dir, 1);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.scarfPoints[0].x - this.x, this.scarfPoints[0].y - this.y);
    for (let i = 1; i < this.scarfPoints.length; i++) {
      ctx.lineTo(this.scarfPoints[i].x - this.x, this.scarfPoints[i].y - this.y);
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 8;
    ctx.stroke();

    if (this.state === 'slide') {
      this.drawSlidingCharacter(ctx);
    } else if (this.state === 'duck') {
      this.drawDuckingCharacter(ctx);
    } else {
      this.drawUprightCharacter(ctx);
    }

    if (this.isAttacking) {
      this.drawAttackSlash(ctx);
    }

    ctx.restore();
  }

  drawUprightCharacter(ctx: CanvasRenderingContext2D) {
    const runCycle = Math.sin(this.animTime * 1.5);
    const isRunning = this.state === 'run';
    const isAirborne = !this.onGround;

    const leftLegAngle = isAirborne ? 0.35 : (isRunning ? runCycle * 0.65 : 0);
    const rightLegAngle = isAirborne ? -0.35 : (isRunning ? -runCycle * 0.65 : 0);

    const leftArmAngle = isAirborne ? -0.5 : (isRunning ? -runCycle * 0.75 : 0.1);
    const rightArmAngle = isAirborne ? 0.7 : (isRunning ? runCycle * 0.75 : -0.1);

    // Back Arm
    ctx.save();
    ctx.translate(2, -42);
    ctx.rotate(rightArmAngle);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-3, 0, 6, 16);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, 14, 5, 14);
    ctx.restore();

    // Back Leg
    ctx.save();
    ctx.translate(-2, -26);
    ctx.rotate(rightLegAngle);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-4, 0, 7, 16);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, 14, 6, 14);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-2, 26, 11, 6);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-2, 31, 11, 2);
    ctx.restore();

    // Torso & Pelvis
    const bounceY = isRunning ? Math.abs(Math.sin(this.animTime * 3)) * 3 : 0;
    ctx.save();
    ctx.translate(0, -bounceY);

    const suitGrad = ctx.createLinearGradient(0, -48, 0, -26);
    suitGrad.addColorStop(0, '#1e293b');
    suitGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = suitGrad;
    ctx.beginPath();
    ctx.moveTo(-9, -44);
    ctx.lineTo(9, -44);
    ctx.lineTo(6, -24);
    ctx.lineTo(-6, -24);
    ctx.closePath();
    ctx.fill();

    // Glowing Core
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(4, -34);
    ctx.lineTo(-4, -34);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#334155';
    ctx.fillRect(-7, -26, 14, 4);

    // Head
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, -48, 6, 5);

    const helmetGrad = ctx.createLinearGradient(0, -62, 0, -48);
    helmetGrad.addColorStop(0, '#334155');
    helmetGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = helmetGrad;
    ctx.beginPath();
    ctx.arc(0, -54, 8, 0, Math.PI * 2);
    ctx.fill();

    // Visor facing forward (+X)
    ctx.fillStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(1, -56);
    ctx.lineTo(8, -55);
    ctx.lineTo(6, -51);
    ctx.lineTo(1, -52);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();

    // Front Leg
    ctx.save();
    ctx.translate(2, -26);
    ctx.rotate(leftLegAngle);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, 0, 7, 16);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-3, 14, 6, 14);
    ctx.fillStyle = '#475569';
    ctx.fillRect(-2, 26, 11, 6);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-2, 31, 11, 2);
    ctx.restore();

    // Front Arm
    ctx.save();
    ctx.translate(-2, -42 - bounceY);
    ctx.rotate(leftArmAngle);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, 0, 6, 16);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-3, 14, 5, 14);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-2, 24, 4, 3);
    ctx.restore();
  }

  drawSlidingCharacter(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.rotate(0.2);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-16, -24, 32, 14);

    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.fillRect(4, -20, 6, 6);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(16, -20, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff007f';
    ctx.fillRect(18, -22, 5, 4);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-34, -14, 22, 8);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-42, -10, 10, 6);

    ctx.restore();
  }

  drawDuckingCharacter(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8, -26, 16, 16);

    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 6;
    ctx.fillRect(-2, -22, 5, 5);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(0, -32, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff007f';
    ctx.fillRect(2, -34, 5, 4);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, -10, 20, 10);
    ctx.restore();
  }

  drawAttackSlash(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(14, -30, 36, -0.6, 0.9);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(14, -30, 36, -0.5, 0.8);
    ctx.stroke();
    ctx.restore();
  }
}

// --- MAIN GAME ENGINE ---
class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sound: SoundManager;
  save: SaveSystem;
  particles: ParticleManager;
  player: Player;

  state = 'menu';
  currentLevelNum = 1;
  currentLevel: any = null;

  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  cameraX = 0;
  cameraY = 0;
  shakeIntensity = 0;

  score = 0;
  crystalsCollected = 0;
  levelStartTime = 0;
  lastFrameTime = 0;

  input = {
    left: false,
    right: false,
    duck: false,
    jump: false,
    slide: false,
    attack: false,
    jumpJustPressed: false,
    attackJustPressed: false
  };

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.sound = new SoundManager();
    this.save = new SaveSystem();
    this.particles = new ParticleManager();
    this.player = new Player();

    this.initUI();
    this.resize();

    this.showScreen('main-menu');
    this.checkOrientation();

    window.addEventListener('resize', () => {
      this.resize();
      this.checkOrientation();
    });
    window.addEventListener('orientationchange', () => {
      this.resize();
      this.checkOrientation();
    });

    window.addEventListener('blur', () => this.resetAllInputs());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.resetAllInputs();
        if (this.state === 'playing') {
          this.togglePause();
        }
      }
    });

    window.addEventListener('pointerup', () => this.syncPointerStates());
    window.addEventListener('pointercancel', () => this.syncPointerStates());

    requestAnimationFrame(this.loop.bind(this));
  }

  resetAllInputs() {
    this.input.left = false;
    this.input.right = false;
    this.input.duck = false;
    this.input.jump = false;
    this.input.slide = false;
    this.input.attack = false;
    this.input.jumpJustPressed = false;
    this.input.attackJustPressed = false;
    document.querySelectorAll('.touch-btn').forEach(btn => btn.classList.remove('active'));
  }

  syncPointerStates() {
    const btnLeft = document.getElementById('ctrl-left');
    const btnRight = document.getElementById('ctrl-right');
    const btnDuck = document.getElementById('ctrl-duck');
    const btnJump = document.getElementById('ctrl-jump');
    const btnSlide = document.getElementById('ctrl-slide');
    const btnAttack = document.getElementById('ctrl-attack');

    if (btnLeft && !btnLeft.matches(':active')) { this.input.left = false; btnLeft.classList.remove('active'); }
    if (btnRight && !btnRight.matches(':active')) { this.input.right = false; btnRight.classList.remove('active'); }
    if (btnDuck && !btnDuck.matches(':active')) { this.input.duck = false; btnDuck.classList.remove('active'); }
    if (btnJump && !btnJump.matches(':active')) { this.input.jump = false; btnJump.classList.remove('active'); }
    if (btnSlide && !btnSlide.matches(':active')) { this.input.slide = false; btnSlide.classList.remove('active'); }
    if (btnAttack && !btnAttack.matches(':active')) { this.input.attack = false; btnAttack.classList.remove('active'); }
  }

  handleInputDown(key: string) {
    if (this.state !== 'playing') return;
    if (key === 'left') {
      this.input.left = true;
    } else if (key === 'right') {
      this.input.right = true;
    } else if (key === 'duck') {
      this.input.duck = true;
    } else if (key === 'slide') {
      this.input.slide = true;
    } else if (key === 'jump') {
      if (!this.input.jump) {
        this.input.jumpJustPressed = true;
      }
      this.input.jump = true;
    } else if (key === 'attack') {
      if (!this.input.attack) {
        this.input.attackJustPressed = true;
      }
      this.input.attack = true;
    }
  }

  handleInputUp(key: string) {
    if (key === 'left') this.input.left = false;
    else if (key === 'right') this.input.right = false;
    else if (key === 'duck') this.input.duck = false;
    else if (key === 'slide') this.input.slide = false;
    else if (key === 'jump') this.input.jump = false;
    else if (key === 'attack') this.input.attack = false;
  }

  checkOrientation() {
    const overlay = document.getElementById('rotate-device-overlay');
    if (!overlay) return;
    const isMobile = window.innerWidth <= 900;
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isMobile && isPortrait) {
      overlay.classList.remove('hidden');
    } else {
      overlay.classList.add('hidden');
    }
  }

  resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    this.canvas.width = this.viewportWidth * dpr;
    this.canvas.height = this.viewportHeight * dpr;
    if (this.ctx.resetTransform) {
      this.ctx.resetTransform();
    }
    this.ctx.scale(dpr, dpr);
  }

  initUI() {
    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.sound.init();
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this.handleInputDown('left');
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.handleInputDown('right');
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          this.handleInputDown('jump');
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.handleInputDown('duck');
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.handleInputDown('slide');
          break;
        case 'KeyJ':
        case 'KeyZ':
          this.handleInputDown('attack');
          break;
        case 'Escape':
        case 'KeyP':
          this.togglePause();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this.handleInputUp('left');
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.handleInputUp('right');
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          this.handleInputUp('jump');
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.handleInputUp('duck');
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.handleInputUp('slide');
          break;
        case 'KeyJ':
        case 'KeyZ':
          this.handleInputUp('attack');
          break;
      }
    });

    const bindTouchBtn = (id: string, keyName: string) => {
      const btn = document.getElementById(id);
      if (!btn) return;

      const onDown = (e: any) => {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        this.sound.init();
        try {
          if (btn.setPointerCapture && e.pointerId) {
            btn.setPointerCapture(e.pointerId);
          }
        } catch (_) {}
        btn.classList.add('active');
        this.handleInputDown(keyName);
        if (window.navigator && window.navigator.vibrate) {
          try { window.navigator.vibrate(8); } catch (_) {}
        }
      };

      const onUp = (e: any) => {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        try {
          if (btn.releasePointerCapture && e.pointerId) {
            btn.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
        btn.classList.remove('active');
        this.handleInputUp(keyName);
      };

      btn.addEventListener('pointerdown', onDown);
      btn.addEventListener('pointerup', onUp);
      btn.addEventListener('pointercancel', onUp);
      btn.addEventListener('pointerleave', onUp);
    };

    bindTouchBtn('ctrl-left', 'left');
    bindTouchBtn('ctrl-right', 'right');
    bindTouchBtn('ctrl-duck', 'duck');
    bindTouchBtn('ctrl-jump', 'jump');
    bindTouchBtn('ctrl-slide', 'slide');
    bindTouchBtn('ctrl-attack', 'attack');

    const bindClick = (id: string, action: () => void) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.sound.init();
        action();
      });
    };

    // Main Menu Buttons
    bindClick('btn-play-game', () => {
      this.sound.playClick();
      this.startLevel(this.save.data.unlockedLevel || 1);
    });

    bindClick('btn-level-select', () => {
      this.sound.playClick();
      this.openLevelSelect();
    });

    bindClick('btn-back-from-levels', () => {
      this.sound.playClick();
      this.state = 'menu';
      this.showScreen('main-menu');
    });

    bindClick('btn-how-to-play', () => {
      this.sound.playClick();
      document.getElementById('how-to-play-modal')?.classList.remove('hidden');
    });

    bindClick('btn-close-how-to-play', () => {
      this.sound.playClick();
      document.getElementById('how-to-play-modal')?.classList.add('hidden');
    });

    bindClick('btn-settings', () => {
      this.sound.playClick();
      this.openSettings();
    });

    bindClick('btn-close-settings', () => {
      this.sound.playClick();
      document.getElementById('settings-modal')?.classList.add('hidden');
    });

    // HUD Pause
    bindClick('btn-hud-pause', () => this.togglePause());

    // Pause Modal Buttons
    bindClick('btn-resume-game', () => this.togglePause());

    bindClick('btn-pause-checkpoint', () => {
      this.togglePause();
      this.player.resetToCheckpoint();
    });

    bindClick('btn-pause-settings', () => this.openSettings());

    bindClick('btn-pause-exit', () => {
      this.sound.playClick();
      document.getElementById('pause-modal')?.classList.add('hidden');
      this.sound.stopMusic();
      this.state = 'menu';
      this.showScreen('main-menu');
    });

    // Level Complete Modal Buttons
    bindClick('btn-next-level', () => {
      this.sound.playClick();
      document.getElementById('level-complete-modal')?.classList.add('hidden');
      this.startLevel(Math.min(100, this.currentLevelNum + 1));
    });

    bindClick('btn-retry-level', () => {
      this.sound.playClick();
      document.getElementById('level-complete-modal')?.classList.add('hidden');
      this.startLevel(this.currentLevelNum);
    });

    bindClick('btn-complete-exit', () => {
      this.sound.playClick();
      document.getElementById('level-complete-modal')?.classList.add('hidden');
      this.openLevelSelect();
    });

    bindClick('btn-complete-main-menu', () => {
      this.sound.playClick();
      document.getElementById('level-complete-modal')?.classList.add('hidden');
      this.sound.stopMusic();
      this.state = 'menu';
      this.showScreen('main-menu');
    });

    // Game Over Modal Buttons
    bindClick('btn-restart-level', () => {
      this.sound.playClick();
      document.getElementById('game-over-modal')?.classList.add('hidden');
      this.startLevel(this.currentLevelNum);
    });

    bindClick('btn-restart-checkpoint', () => {
      this.sound.playClick();
      document.getElementById('game-over-modal')?.classList.add('hidden');
      this.player.resetToCheckpoint();
      this.lastFrameTime = performance.now();
      this.cameraX = Math.max(0, this.player.x - this.viewportWidth * 0.34);
      this.cameraY = Math.max(0, Math.min(this.currentLevel.height - this.viewportHeight, this.player.y - this.viewportHeight * 0.55));
      this.state = 'playing';
    });

    bindClick('btn-game-over-level-select', () => {
      this.sound.playClick();
      document.getElementById('game-over-modal')?.classList.add('hidden');
      this.openLevelSelect();
    });

    bindClick('btn-game-over-exit', () => {
      this.sound.playClick();
      document.getElementById('game-over-modal')?.classList.add('hidden');
      this.sound.stopMusic();
      this.state = 'menu';
      this.showScreen('main-menu');
    });

    this.bindSettingsToggles();

    (window as any).onAndroidBackPressed = () => {
      if (this.state === 'playing') {
        this.togglePause();
        return true;
      } else if (this.state === 'level_select') {
        this.state = 'menu';
        this.showScreen('main-menu');
        return true;
      }
      return false;
    };

    (window as any).onGamePause = () => {
      if (this.state === 'playing') {
        this.state = 'paused';
        document.getElementById('pause-modal')?.classList.remove('hidden');
      }
    };

    (window as any).onGameResume = () => {};
  }

  bindSettingsToggles() {
    const toggleSfx = document.getElementById('toggle-sfx');
    const toggleMusic = document.getElementById('toggle-music');
    const toggleShake = document.getElementById('toggle-shake');
    const togglePerf = document.getElementById('toggle-performance');

    const updateUI = (el: HTMLElement | null, val: boolean) => {
      if (!el) return;
      el.textContent = val ? 'ON' : 'OFF';
      el.classList.toggle('active', !!val);
    };

    updateUI(toggleSfx, this.save.data.settings.sfx);
    updateUI(toggleMusic, this.save.data.settings.music);
    updateUI(toggleShake, this.save.data.settings.shake);
    updateUI(togglePerf, this.save.data.settings.performance);

    if (toggleSfx) {
      toggleSfx.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.sfx = !this.save.data.settings.sfx;
        this.sound.sfxEnabled = this.save.data.settings.sfx;
        updateUI(toggleSfx, this.save.data.settings.sfx);
        this.save.save();
      };
    }

    if (toggleMusic) {
      toggleMusic.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.music = !this.save.data.settings.music;
        this.sound.musicEnabled = this.save.data.settings.music;
        updateUI(toggleMusic, this.save.data.settings.music);
        if (this.sound.musicEnabled && this.state === 'playing' && this.currentLevel) {
          this.sound.startThemeMusic(this.currentLevel.worldIdx);
        } else {
          this.sound.stopMusic();
        }
        this.save.save();
      };
    }

    if (toggleShake) {
      toggleShake.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.shake = !this.save.data.settings.shake;
        updateUI(toggleShake, this.save.data.settings.shake);
        this.save.save();
      };
    }

    if (togglePerf) {
      togglePerf.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.performance = !this.save.data.settings.performance;
        updateUI(togglePerf, this.save.data.settings.performance);
        this.save.save();
      };
    }

    const btnReset = document.getElementById('btn-reset-progress');
    if (btnReset) {
      btnReset.onclick = (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to reset all 100 level progress?')) {
          this.save.resetProgress();
          this.openLevelSelect();
          document.getElementById('settings-modal')?.classList.add('hidden');
        }
      };
    }
  }

  openSettings() {
    document.getElementById('settings-modal')?.classList.remove('hidden');
  }

  showScreen(id: string) {
    ['main-menu', 'level-select-menu', 'game-hud'].forEach(sid => {
      const el = document.getElementById(sid);
      if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
  }

  startLevel(levelNum: number) {
    this.currentLevelNum = levelNum;
    this.currentLevel = LevelManager.generateLevel(levelNum);
    this.particles.reset();

    this.player.x = this.currentLevel.startX;
    this.player.y = this.currentLevel.startY;
    this.player.checkpointX = this.currentLevel.startX;
    this.player.checkpointY = this.currentLevel.startY;
    this.player.resetToCheckpoint();

    this.score = 0;
    this.crystalsCollected = 0;
    this.levelStartTime = performance.now();
    this.lastFrameTime = performance.now();
    this.resetAllInputs();
    this.state = 'playing';

    // Snap camera directly to starting area
    this.cameraX = Math.max(0, this.player.x - this.viewportWidth * 0.34);
    this.cameraY = Math.max(0, Math.min(this.currentLevel.height - this.viewportHeight, this.player.y - this.viewportHeight * 0.55));

    this.showScreen('game-hud');
    const hudLvl = document.getElementById('hud-level-text');
    if (hudLvl) hudLvl.textContent = `LEVEL ${levelNum} / 100`;
    const hudThm = document.getElementById('hud-theme-text');
    if (hudThm) hudThm.textContent = this.currentLevel.theme.name;
    this.updateHUD();

    this.sound.startThemeMusic(this.currentLevel.worldIdx);
  }

  openLevelSelect() {
    this.state = 'level_select';
    this.showScreen('level-select-menu');
    const tc = document.getElementById('level-select-total-crystals');
    if (tc) tc.textContent = this.save.data.totalCrystals || 0;

    const tabsContainer = document.getElementById('world-tabs-container');
    if (tabsContainer) {
      tabsContainer.innerHTML = '';
      WORLD_THEMES.forEach((w, idx) => {
        const btn = document.createElement('button');
        btn.className = 'world-tab-btn' + (idx === 0 ? ' active' : '');
        btn.textContent = `W${idx + 1}: ${w.name}`;
        btn.onclick = (e) => {
          e.stopPropagation();
          document.querySelectorAll('.world-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const targetLevelId = idx * 10 + 1;
          const el = document.getElementById(`level-card-${targetLevelId}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
        tabsContainer.appendChild(btn);
      });
    }

    const grid = document.getElementById('levels-grid-container');
    if (grid) {
      grid.innerHTML = '';
      for (let i = 1; i <= 100; i++) {
        const isUnlocked = i <= this.save.data.unlockedLevel;
        const levelData = this.save.data.levels[i];
        const card = document.createElement('div');
        card.id = `level-card-${i}`;
        card.className = 'level-card' + (isUnlocked ? '' : ' locked');

        if (isUnlocked) {
          card.innerHTML = `
            <span class="card-num">${i}</span>
            <div class="card-stars">
              <span class="${(levelData && levelData.stars >= 1) ? 'filled' : ''}">★</span>
              <span class="${(levelData && levelData.stars >= 2) ? 'filled' : ''}">★</span>
              <span class="${(levelData && levelData.stars >= 3) ? 'filled' : ''}">★</span>
            </div>
          `;
          card.onclick = (e) => {
            e.stopPropagation();
            this.sound.playClick();
            this.startLevel(i);
          };
        } else {
          card.innerHTML = `
            <span class="card-lock-icon">🔒</span>
            <span class="card-num-locked">${i}</span>
          `;
        }
        grid.appendChild(card);
      }
    }
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      this.resetAllInputs();
      document.getElementById('pause-modal')?.classList.remove('hidden');
    } else if (this.state === 'paused') {
      this.state = 'playing';
      this.lastFrameTime = performance.now();
      document.getElementById('pause-modal')?.classList.add('hidden');
    }
  }

  showToast(msg: string) {
    const toast = document.getElementById('checkpoint-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
  }

  updateHUD() {
    const hpPct = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    const hpBar = document.getElementById('hp-bar-fill');
    if (hpBar) hpBar.style.width = `${hpPct}%`;
    const hpTxt = document.getElementById('hp-text');
    if (hpTxt) hpTxt.textContent = `${Math.ceil(this.player.hp)}`;

    const staPct = Math.max(0, (this.player.stamina / this.player.maxStamina) * 100);
    const staBar = document.getElementById('stamina-bar-fill');
    if (staBar) staBar.style.width = `${staPct}%`;

    const totalCrystals = this.currentLevel ? this.currentLevel.collectibles.length : 15;
    const cryTxt = document.getElementById('hud-crystals-text');
    if (cryTxt) cryTxt.textContent = `${this.crystalsCollected} / ${totalCrystals}`;
    const scrTxt = document.getElementById('hud-score-text');
    if (scrTxt) scrTxt.textContent = `${this.score}`;

    const bossBar = document.getElementById('boss-health-container');
    if (this.currentLevel && this.currentLevel.boss && this.currentLevel.boss.alive) {
      bossBar?.classList.remove('hidden');
      const bName = document.getElementById('boss-name-text');
      if (bName) bName.textContent = this.currentLevel.boss.name;
      const b = this.currentLevel.boss;
      const bHpPct = Math.max(0, (b.hp / b.maxHp) * 100);
      const bFill = document.getElementById('boss-bar-fill');
      if (bFill) bFill.style.width = `${bHpPct}%`;
    } else {
      bossBar?.classList.add('hidden');
    }
  }

  handleLevelComplete() {
    if (this.state === 'level_complete') return;
    this.state = 'level_complete';
    this.player.vx = 0;
    this.player.vy = 0;
    this.resetAllInputs();
    this.sound.playLevelComplete();
    this.sound.stopMusic();

    const totalTime = Math.round((performance.now() - this.levelStartTime) / 1000);
    const totalCrystals = this.currentLevel.collectibles.length;
    const crystalRatio = totalCrystals > 0 ? (this.crystalsCollected / totalCrystals) : 1;

    let stars = 1;
    if (crystalRatio >= 0.7) stars = 2;
    if (crystalRatio >= 0.95 && totalTime < 90) stars = 3;

    const finalScore = this.score + stars * 1000 + Math.max(0, (120 - totalTime) * 30);
    this.save.completeLevel(this.currentLevelNum, stars, this.crystalsCollected, finalScore, totalTime);

    const titleEl = document.getElementById('complete-level-title');
    if (titleEl) titleEl.textContent = `LEVEL ${this.currentLevelNum}: ${this.currentLevel.theme.name}`;
    const timeEl = document.getElementById('complete-time-val');
    if (timeEl) timeEl.textContent = `${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}`;
    const cryEl = document.getElementById('complete-crystals-val');
    if (cryEl) cryEl.textContent = `${this.crystalsCollected} / ${totalCrystals}`;
    const scrEl = document.getElementById('complete-score-val');
    if (scrEl) scrEl.textContent = `${finalScore}`;

    for (let s = 1; s <= 3; s++) {
      const starEl = document.getElementById(`star-${s}`);
      if (starEl) starEl.classList.toggle('earned', s <= stars);
    }

    document.getElementById('level-complete-modal')?.classList.remove('hidden');
  }

  handlePlayerDeath() {
    if (this.state === 'game_over') return;
    this.state = 'game_over';
    this.player.vx = 0;
    this.player.vy = 0;
    this.resetAllInputs();
    this.sound.playTone(80, 'sawtooth', 0.5, 0.4, 0.01);
    this.sound.stopMusic();
    document.getElementById('game-over-modal')?.classList.remove('hidden');
  }

  update(dtScale = 1.0, rawDt = 1 / 60) {
    if (this.state !== 'playing' || !this.currentLevel) return;

    const level = this.currentLevel;

    // Moving platforms
    for (const p of level.platforms) {
      if (p.isMoving) {
        p.moveOffset += 0.025 * dtScale;
        if (p.moveAxis === 'x') {
          p.x = p.origX + Math.sin(p.moveOffset) * p.moveRange;
        } else {
          p.y = p.origY + Math.sin(p.moveOffset) * p.moveRange;
        }
      }
    }

    // Player update
    this.player.update(this.input, level, this.sound, this.particles, dtScale, rawDt);

    // Hazards
    const halfW = this.player.w / 2;
    for (const h of level.hazards) {
      if (
        this.player.x + halfW > h.x &&
        this.player.x - halfW < h.x + h.w &&
        this.player.y > h.y &&
        this.player.y - this.player.h < h.y + h.h
      ) {
        this.player.takeDamage(35, this.sound, this.particles);
        this.shakeIntensity = 10;
      }
    }

    // Collectibles
    for (const c of level.collectibles) {
      if (!c.collected) {
        const dx = this.player.x - c.x;
        const dy = (this.player.y - this.player.h / 2) - c.y;
        if (dx * dx + dy * dy < (c.r + 18) * (c.r + 18)) {
          c.collected = true;
          this.crystalsCollected++;
          this.score += 250;
          this.sound.playCrystal();
          this.particles.createExplosion(c.x, c.y, '#ffd700', 8);
        }
      }
    }

    // Checkpoints
    for (const cp of level.checkpoints) {
      if (!cp.active && Math.abs(this.player.x - cp.x) < 40 && Math.abs(this.player.y - cp.y) < 60) {
        cp.active = true;
        this.player.checkpointX = cp.x;
        this.player.checkpointY = cp.y;
        this.sound.playCheckpoint();
        this.particles.createExplosion(cp.x, cp.y - 40, '#00ffaa', 16);
        this.showToast('CHECKPOINT REACHED');
      }
    }

    // Enemies
    for (const e of level.enemies) {
      if (!e.alive) continue;

      if (e.type === 'patrol') {
        e.x += e.vx * e.dir * dtScale;
        if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
        if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
      } else if (e.type === 'rusher') {
        const distToPlayer = Math.abs(this.player.x - e.x);
        if (distToPlayer < 180) {
          e.dir = this.player.x > e.x ? 1 : -1;
          e.x += e.speed * 1.35 * e.dir * dtScale;
        } else {
          e.x += e.vx * e.dir * dtScale;
          if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
          if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
        }
      } else if (e.type === 'flyer') {
        e.x += e.vx * e.dir * dtScale;
        e.y += Math.sin(performance.now() * 0.003) * 0.8 * dtScale;
        if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
        if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
      } else if (e.type === 'heavy') {
        e.x += e.vx * e.dir * dtScale;
        if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
        if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
      }

      if (
        this.player.x + halfW > e.x - e.w / 2 &&
        this.player.x - halfW < e.x + e.w / 2 &&
        this.player.y > e.y - e.h &&
        this.player.y - this.player.h < e.y
      ) {
        this.player.takeDamage(e.type === 'heavy' ? 25 : 15, this.sound, this.particles);
        this.shakeIntensity = 8;
      }
    }

    // Boss
    if (level.boss && level.boss.alive) {
      const b = level.boss;
      b.x += b.vx * b.dir * dtScale;
      if (b.x > level.goal.x + 80) { b.dir = -1; }
      if (b.x < level.goal.x - 220) { b.dir = 1; }

      if (
        this.player.x + halfW > b.x - b.w / 2 &&
        this.player.x - halfW < b.x + b.w / 2 &&
        this.player.y > b.y - b.h &&
        this.player.y - this.player.h < b.y
      ) {
        this.player.takeDamage(30, this.sound, this.particles);
        this.shakeIntensity = 14;
      }
    }

    // Goal
    const goal = level.goal;
    if (
      this.player.x + halfW > goal.x &&
      this.player.x - halfW < goal.x + goal.w &&
      this.player.y > goal.y &&
      this.player.y - this.player.h < goal.y + goal.h
    ) {
      if (!level.boss || !level.boss.alive) {
        this.handleLevelComplete();
      }
    }

    if (this.player.hp <= 0) {
      this.handlePlayerDeath();
    }

    const lookAhead = this.player.dir === 1 ? 40 : -40;
    const targetCamX = Math.max(0, Math.min(level.width - this.viewportWidth, this.player.x - this.viewportWidth * 0.34 + lookAhead));
    const targetCamY = Math.max(0, Math.min(level.height - this.viewportHeight, this.player.y - this.viewportHeight * 0.55));

    const camFactor = 1 - Math.pow(0.015, rawDt);
    this.cameraX += (targetCamX - this.cameraX) * Math.min(0.2, camFactor);
    this.cameraY += (targetCamY - this.cameraY) * Math.min(0.2, camFactor);

    this.particles.update(level.theme, this.cameraX, this.viewportWidth, this.viewportHeight, dtScale);
    this.updateHUD();
  }

  render() {
    const ctx = this.ctx;
    const w = this.viewportWidth;
    const h = this.viewportHeight;

    ctx.clearRect(0, 0, w, h);

    if (this.state === 'menu' || this.state === 'level_select') {
      this.renderMenuBackground(ctx, w, h);
      return;
    }

    if (!this.currentLevel) return;

    const level = this.currentLevel;
    const theme = level.theme;

    ctx.save();
    if (this.shakeIntensity > 0 && this.save.data.settings.shake) {
      const sx = (Math.random() - 0.5) * this.shakeIntensity;
      const sy = (Math.random() - 0.5) * this.shakeIntensity;
      ctx.translate(sx, sy);
      this.shakeIntensity *= 0.88;
      if (this.shakeIntensity < 0.4) this.shakeIntensity = 0;
    }

    // Parallax Background
    this.renderParallaxBackground(ctx, level, w, h);

    // Particles
    this.particles.draw(ctx, this.cameraX, this.cameraY);

    // Platforms
    for (const p of level.platforms) {
      const screenX = p.x - this.cameraX;
      const screenY = p.y - this.cameraY;
      if (screenX + p.w < -50 || screenX > w + 50) continue;

      if (p.type === 'oneway') {
        ctx.fillStyle = theme.accent;
        ctx.fillRect(screenX, screenY, p.w, 6);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(screenX, screenY, p.w, 2);
      } else {
        ctx.fillStyle = theme.ground;
        ctx.fillRect(screenX, screenY, p.w, p.h);

        ctx.fillStyle = theme.accent;
        ctx.fillRect(screenX, screenY, p.w, 4);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let gx = 0; gx < p.w; gx += 40) {
          ctx.beginPath();
          ctx.moveTo(screenX + gx, screenY + 4);
          ctx.lineTo(screenX + gx, screenY + Math.min(p.h, 200));
          ctx.stroke();
        }
      }
    }

    // Hazards
    for (const hz of level.hazards) {
      const sx = hz.x - this.cameraX;
      const sy = hz.y - this.cameraY;
      if (sx + hz.w < -50 || sx > w + 50) continue;

      ctx.fillStyle = theme.hazard;
      const spikeCount = Math.floor(hz.w / 12);
      for (let i = 0; i < spikeCount; i++) {
        ctx.beginPath();
        ctx.moveTo(sx + i * 12, sy + hz.h);
        ctx.lineTo(sx + i * 12 + 6, sy);
        ctx.lineTo(sx + (i + 1) * 12, sy + hz.h);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Checkpoints
    for (const cp of level.checkpoints) {
      const sx = cp.x - this.cameraX;
      const sy = cp.y - this.cameraY;
      if (sx < -50 || sx > w + 50) continue;

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(sx - 3, sy - 50, 6, 50);

      ctx.fillStyle = cp.active ? '#00ffaa' : '#ff0055';
      ctx.shadowColor = cp.active ? '#00ffaa' : '#ff0055';
      ctx.shadowBlur = cp.active ? 10 : 4;
      ctx.beginPath();
      ctx.arc(sx, sy - 54, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (cp.active) {
        ctx.strokeStyle = 'rgba(0, 255, 170, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sx, sy - 54, 14 + Math.sin(performance.now() * 0.005) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Collectibles
    const t = performance.now() * 0.004;
    for (const c of level.collectibles) {
      if (c.collected) continue;
      const sx = c.x - this.cameraX;
      const sy = c.y - this.cameraY + Math.sin(t + c.animOffset) * 5;
      if (sx < -50 || sx > w + 50) continue;

      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(sx, sy - c.r);
      ctx.lineTo(sx + c.r * 0.7, sy);
      ctx.lineTo(sx, sy + c.r);
      ctx.lineTo(sx - c.r * 0.7, sy);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx - 2, sy - 4, 4, 8);
    }

    // Goal
    const goal = level.goal;
    const gsx = goal.x - this.cameraX;
    const gsy = goal.y - this.cameraY;
    if (gsx > -100 && gsx < w + 100) {
      const portalGlow = ctx.createRadialGradient(gsx + goal.w / 2, gsy + goal.h / 2, 5, gsx + goal.w / 2, gsy + goal.h / 2, 45);
      portalGlow.addColorStop(0, '#00ffaa');
      portalGlow.addColorStop(0.6, 'rgba(0, 240, 255, 0.4)');
      portalGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = portalGlow;
      ctx.fillRect(gsx - 20, gsy - 20, goal.w + 40, goal.h + 40);

      ctx.strokeStyle = '#00ffaa';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#00ffaa';
      ctx.shadowBlur = 12;
      ctx.strokeRect(gsx, gsy, goal.w, goal.h);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fff';
      ctx.font = '700 12px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('EXIT', gsx + goal.w / 2, gsy - 10);
    }

    // Enemies
    for (const e of level.enemies) {
      if (!e.alive) continue;
      const esx = e.x - this.cameraX;
      const esy = e.y - this.cameraY;
      if (esx < -60 || esx > w + 60) continue;

      ctx.save();
      ctx.translate(esx, esy);
      ctx.scale(e.dir, 1);

      if (e.type === 'rusher') {
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(-e.w / 2, -e.h, e.w, e.h);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(2, -e.h + 6, 8, 4);
      } else if (e.type === 'flyer') {
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.moveTo(0, -e.h);
        ctx.lineTo(e.w / 2, 0);
        ctx.lineTo(-e.w / 2, 0);
        ctx.closePath();
        ctx.fill();
      } else if (e.type === 'heavy') {
        ctx.fillStyle = '#475569';
        ctx.fillRect(-e.w / 2, -e.h, e.w, e.h);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(-e.w / 2 + 4, -e.h + 8, e.w - 8, 6);
      } else {
        ctx.fillStyle = '#334155';
        ctx.fillRect(-e.w / 2, -e.h, e.w, e.h);
        ctx.fillStyle = '#00ffaa';
        ctx.fillRect(2, -e.h + 8, 6, 4);
      }
      ctx.restore();
    }

    // Boss
    if (level.boss && level.boss.alive) {
      const b = level.boss;
      const bsx = b.x - this.cameraX;
      const bsy = b.y - this.cameraY;
      if (bsx > -150 && bsx < w + 150) {
        ctx.save();
        ctx.translate(bsx, bsy);
        ctx.scale(b.dir, 1);

        ctx.fillStyle = '#990000';
        ctx.fillRect(-b.w / 2, -b.h, b.w, b.h);

        ctx.fillStyle = '#ff3300';
        ctx.shadowColor = '#ff3300';
        ctx.shadowBlur = 12;
        ctx.fillRect(-b.w / 2 + 8, -b.h + 16, b.w - 16, 12);
        ctx.shadowBlur = 0;

        ctx.restore();
      }
    }

    // Player
    this.player.draw(ctx, this.cameraX, this.cameraY);

    ctx.restore();
  }

  renderParallaxBackground(ctx: CanvasRenderingContext2D, level: any, w: number, h: number) {
    const theme = level.theme;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, theme.sky);
    skyGrad.addColorStop(1, '#050711');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    const distOffset = -(this.cameraX * 0.05) % 400;
    for (let x = distOffset - 400; x < w + 400; x += 180) {
      ctx.fillRect(x, h - 260, 110, 260);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    const midOffset = -(this.cameraX * 0.15) % 240;
    for (let x = midOffset - 240; x < w + 240; x += 120) {
      ctx.fillRect(x, h - 320, 70, 320);
      ctx.fillStyle = theme.accent;
      ctx.fillRect(x + 14, h - 280, 6, 12);
      ctx.fillRect(x + 36, h - 240, 6, 12);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    }
  }

  renderMenuBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h));
    grad.addColorStop(0, '#101735');
    grad.addColorStop(1, '#050711');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    const t = performance.now() * 0.02;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = (t % 60); y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  loop(timestamp: number) {
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    let rawDt = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;

    if (isNaN(rawDt) || rawDt <= 0) rawDt = 1 / 60;
    if (rawDt > 0.05) rawDt = 0.05;

    const dtScale = rawDt * 60;

    this.update(dtScale, rawDt);
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }
}

// Window registration
(window as any).AetherLeapGame = Game;

function launchGame() {
  if (!(window as any).aetherGameInstance) {
    (window as any).aetherGameInstance = new Game();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchGame);
} else {
  launchGame();
}
