/**
 * AETHER LEAP - High-Speed Sci-Fi Action Platform Runner
 * 100 Playable Levels across 10 Worlds
 */

// Import styles so Vite bundles everything together
import './style.css';

// Audio Synthesizer (Web Audio API)
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
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.18);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    } catch (_) {}
  }

  playSlide() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.frequency.exponentialRampToValueAtTime(400, t + 0.22);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
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
      osc.frequency.setValueAtTime(750, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.14);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.14);
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
      gain.gain.setValueAtTime(0.35, t);
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
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.28);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.28);
    } catch (_) {}
  }

  playCrystal() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1318.51];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch (_) {}
  }

  playCheckpoint() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.08);
        gain.gain.setValueAtTime(0.2, t + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + i * 0.08);
        osc.stop(t + i * 0.08 + 0.4);
      });
    } catch (_) {}
  }

  playHurt() {
    this.playTone(130, 'sawtooth', 0.2, 0.4, 0.01);
  }

  playLevelComplete() {
    if (!this.sfxEnabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.1);
        gain.gain.setValueAtTime(0.25, t + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.7);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.1);
        osc.stop(t + idx * 0.1 + 0.7);
      });
    } catch (_) {}
  }

  playClick() {
    this.playTone(800, 'sine', 0.04, 0.15, 0.001);
  }

  startThemeMusic(worldIndex: number) {
    if (!this.musicEnabled) return;
    this.stopMusic();
    if (!this.ctx) return;

    const scales = [
      [220, 261.63, 293.66, 329.63, 392.00, 440],       // Neon City
      [196, 246.94, 293.66, 329.63, 392, 440],          // Cyber Forest
      [220, 246.94, 261.63, 311.13, 329.63, 440],       // Desert Ruins
      [261.63, 293.66, 329.63, 392.00, 440, 523.25],    // Frozen Valley
      [174.61, 220, 261.63, 293.66, 349.23, 440],       // Volcano Core
      [293.66, 329.63, 369.99, 440, 493.88, 587.33],    // Sky Islands
      [246.94, 293.66, 329.63, 369.99, 440, 493.88],    // Crystal Caves
      [220, 261.63, 293.66, 329.63, 349.23, 440],       // Rain City
      [164.81, 196.00, 220, 246.94, 293.66, 329.63],    // Industrial Factory
      [220, 277.18, 329.63, 370.00, 440, 554.37]        // Space Station
    ];
    this.currentScale = scales[worldIndex % scales.length];
    this.noteIndex = 0;

    const tempo = 220;
    this.musicTimer = setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const note = this.currentScale[this.noteIndex % this.currentScale.length];
        this.noteIndex = (this.noteIndex + 1) % (this.currentScale.length * 2);

        if (this.noteIndex % 2 === 0) {
          const bass = this.ctx.createOscillator();
          const bGain = this.ctx.createGain();
          bass.type = 'sawtooth';
          bass.frequency.setValueAtTime(this.currentScale[0] / 2, t);
          bGain.gain.setValueAtTime(0.06, t);
          bGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          bass.connect(bGain);
          bGain.connect(this.ctx.destination);
          bass.start(t);
          bass.stop(t + 0.35);
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, t);
        gain.gain.setValueAtTime(0.045, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
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

// Save System
class SaveSystem {
  key = 'aether_leap_save_v1';
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
      levels: {},
      totalCrystals: 0,
      settings: { sfx: true, music: true, shake: true, performance: false }
    };
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    } catch (_) {}
  }

  completeLevel(levelNum: number, stars: number, crystals: number, score: number, time: number) {
    if (!this.data.levels[levelNum]) {
      this.data.levels[levelNum] = { stars, crystals, score, time };
    } else {
      const cur = this.data.levels[levelNum];
      cur.stars = Math.max(cur.stars, stars);
      cur.crystals = Math.max(cur.crystals, crystals);
      cur.score = Math.max(cur.score, score);
      cur.time = Math.min(cur.time, time);
    }
    this.data.unlockedLevel = Math.max(this.data.unlockedLevel, Math.min(100, levelNum + 1));
    this.recalculateTotalCrystals();
    this.save();
  }

  recalculateTotalCrystals() {
    let tot = 0;
    for (const k in this.data.levels) {
      tot += (this.data.levels[k].crystals || 0);
    }
    this.data.totalCrystals = tot;
  }

  resetProgress() {
    this.data.unlockedLevel = 1;
    this.data.levels = {};
    this.data.totalCrystals = 0;
    this.save();
  }
}

// World Themes Configuration
const WORLD_THEMES = [
  { id: 0, name: "NEON CITY", skyTop: "#080c1e", skyBottom: "#1c113b", platformColor: "#182245", platformBorder: "#00f0ff", accent: "#00f0ff", secondaryAccent: "#ff007f", particleColor: "#00f0ff", particleType: "grid" },
  { id: 1, name: "CYBER FOREST", skyTop: "#041412", skyBottom: "#0b3127", platformColor: "#0f2e23", platformBorder: "#00ffaa", accent: "#00ffaa", secondaryAccent: "#70ff00", particleColor: "#39ff14", particleType: "spores" },
  { id: 2, name: "DESERT RUINS", skyTop: "#1c0d02", skyBottom: "#382008", platformColor: "#332214", platformBorder: "#ffaa00", accent: "#ffaa00", secondaryAccent: "#ffe600", particleColor: "#e6a15c", particleType: "sand" },
  { id: 3, name: "FROZEN VALLEY", skyTop: "#05131f", skyBottom: "#13314d", platformColor: "#173047", platformBorder: "#66e6ff", accent: "#66e6ff", secondaryAccent: "#ffffff", particleColor: "#cceeff", particleType: "snow" },
  { id: 4, name: "VOLCANO CORE", skyTop: "#1f0505", skyBottom: "#3d0f0a", platformColor: "#2b1212", platformBorder: "#ff3300", accent: "#ff3300", secondaryAccent: "#ff8800", particleColor: "#ff5500", particleType: "embers" },
  { id: 5, name: "SKY ISLANDS", skyTop: "#091226", skyBottom: "#202a54", platformColor: "#222c4a", platformBorder: "#38bdf8", accent: "#38bdf8", secondaryAccent: "#c084fc", particleColor: "#7dd3fc", particleType: "clouds" },
  { id: 6, name: "CRYSTAL CAVES", skyTop: "#100924", skyBottom: "#261347", platformColor: "#261742", platformBorder: "#d946ef", accent: "#d946ef", secondaryAccent: "#a855f7", particleColor: "#f472b6", particleType: "crystals" },
  { id: 7, name: "RAIN CITY", skyTop: "#080c14", skyBottom: "#111c2e", platformColor: "#162238", platformBorder: "#38bdf8", accent: "#38bdf8", secondaryAccent: "#eab308", particleColor: "#60a5fa", particleType: "rain" },
  { id: 8, name: "INDUSTRIAL FACTORY", skyTop: "#121214", skyBottom: "#242526", platformColor: "#2b2c30", platformBorder: "#eab308", accent: "#eab308", secondaryAccent: "#f97316", particleColor: "#facc15", particleType: "sparks" },
  { id: 9, name: "SPACE STATION", skyTop: "#02030a", skyBottom: "#0a0c24", platformColor: "#161b36", platformBorder: "#818cf8", accent: "#818cf8", secondaryAccent: "#38bdf8", particleColor: "#a5b4fc", particleType: "stars" }
];

function pseudoRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Level Builder (100 Levels)
class LevelManager {
  static generateLevel(levelNum: number) {
    const worldIdx = Math.floor((levelNum - 1) / 10);
    const theme = WORLD_THEMES[Math.min(WORLD_THEMES.length - 1, worldIdx)];
    const rand = pseudoRandom(levelNum * 9973 + 431);

    const baseLength = 2800 + (levelNum - 1) * 105;
    const levelWidth = baseLength;
    const levelHeight = 850;

    const platforms: any[] = [];
    const hazards: any[] = [];
    const enemies: any[] = [];
    const collectibles: any[] = [];
    const checkpoints: any[] = [];

    platforms.push({ x: 0, y: 620, w: 600, h: 240, type: 'solid' });

    let cursorX = 520;
    let cursorY = 620;

    const numCheckpoints = levelNum < 15 ? 2 : (levelNum < 55 ? 3 : 4);
    const checkpointInterval = levelWidth / (numCheckpoints + 1);
    let nextCheckpointDist = checkpointInterval;

    while (cursorX < levelWidth - 700) {
      const gap = 110 + Math.floor(rand() * (120 + Math.min(110, levelNum * 1.2)));
      const pWidth = Math.max(160, 480 - Math.floor(rand() * (180 + Math.min(140, levelNum * 1.5))));
      
      const heightShift = (rand() - 0.48) * (140 + Math.min(100, levelNum * 0.9));
      cursorY = Math.max(340, Math.min(680, cursorY + heightShift));
      cursorX += gap;

      const isOneWay = rand() < 0.28;
      const isMoving = levelNum >= 8 && rand() < (0.15 + Math.min(0.25, levelNum * 0.003));

      platforms.push({
        x: cursorX,
        y: cursorY,
        w: pWidth,
        h: isOneWay ? 20 : (levelHeight - cursorY + 100),
        type: isOneWay ? 'oneway' : 'solid',
        isMoving: isMoving,
        moveAxis: rand() > 0.5 ? 'x' : 'y',
        moveRange: 80 + Math.floor(rand() * 90),
        moveSpeed: 1.2 + rand() * 1.2,
        origX: cursorX,
        origY: cursorY,
        moveOffset: rand() * Math.PI * 2
      });

      if (pWidth > 260 && rand() < (0.25 + Math.min(0.35, levelNum * 0.005))) {
        const spikeW = 40 + Math.floor(rand() * 40);
        const spikeX = cursorX + (pWidth - spikeW) * (0.3 + rand() * 0.4);
        hazards.push({ type: 'spike', x: spikeX, y: cursorY - 18, w: spikeW, h: 18 });
      }

      if (pWidth >= 220 && rand() < (0.35 + Math.min(0.45, levelNum * 0.006))) {
        const enemyTypeRoll = rand();
        let eType = 'patrol';
        if (levelNum >= 5 && enemyTypeRoll > 0.72) eType = 'flyer';
        else if (levelNum >= 12 && enemyTypeRoll > 0.48) eType = 'rusher';
        else if (levelNum >= 25 && enemyTypeRoll > 0.85) eType = 'heavy';

        enemies.push({
          type: eType,
          x: cursorX + pWidth * 0.5,
          y: eType === 'flyer' ? cursorY - 110 : cursorY - 48,
          minX: cursorX + 20,
          maxX: cursorX + pWidth - 20,
          hp: eType === 'heavy' ? 5 : (eType === 'rusher' ? 3 : 2),
          maxHp: eType === 'heavy' ? 5 : (eType === 'rusher' ? 3 : 2),
          speed: eType === 'rusher' ? 3.4 : (eType === 'flyer' ? 2.0 : 1.6),
          vx: 1.5,
          dir: 1,
          w: eType === 'heavy' ? 44 : 32,
          h: eType === 'heavy' ? 54 : 36,
          alive: true,
          attackCooldown: 0,
          shootTimer: rand() * 60
        });
      }

      const numCrystals = Math.floor(1 + rand() * 3);
      for (let c = 0; c < numCrystals; c++) {
        collectibles.push({
          x: cursorX + (pWidth / (numCrystals + 1)) * (c + 1),
          y: cursorY - 40 - Math.sin(c) * 35,
          r: 12,
          collected: false,
          animOffset: rand() * 6
        });
      }

      if (cursorX >= nextCheckpointDist && checkpoints.length < numCheckpoints) {
        checkpoints.push({ x: cursorX + 60, y: cursorY, active: false, animTimer: 0 });
        nextCheckpointDist += checkpointInterval;
      }

      cursorX += pWidth;
    }

    const goalPlatformX = cursorX + 80;
    const goalY = 600;
    platforms.push({ x: goalPlatformX, y: goalY, w: 600, h: 300, type: 'solid' });

    const goal = { x: goalPlatformX + 350, y: goalY - 60, w: 54, h: 90 };

    let boss = null;
    if (levelNum === 50) {
      boss = { name: "MAGMA SENTINEL", type: "boss_magma", x: goalPlatformX + 220, y: goalY - 90, w: 80, h: 90, hp: 25, maxHp: 25, vx: 1.8, dir: 1, alive: true, shootTimer: 0 };
    } else if (levelNum === 100) {
      boss = { name: "NEXUS OVERLORD", type: "boss_nexus", x: goalPlatformX + 220, y: goalY - 110, w: 96, h: 110, hp: 45, maxHp: 45, vx: 2.2, dir: 1, alive: true, shootTimer: 0 };
    }

    return {
      levelNum,
      worldIdx,
      theme,
      width: goalPlatformX + 650,
      height: levelHeight,
      platforms,
      hazards,
      enemies,
      collectibles,
      checkpoints,
      goal,
      boss,
      startX: 120,
      startY: 560
    };
  }
}

// Particle System
class ParticleSystem {
  particles: any[] = [];
  floatingParticles: any[] = [];

  reset() {
    this.particles = [];
    this.floatingParticles = [];
  }

  add(x: number, y: number, vx: number, vy: number, color: string, size: number, life: number, shape = 'circle') {
    this.particles.push({ x, y, vx, vy, color, size, life, maxLife: life, shape });
  }

  createExplosion(x: number, y: number, color: string, count = 22) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 6;
      this.add(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color, 2 + Math.random() * 4, 24 + Math.random() * 20, 'spark');
    }
  }

  createSlashSparks(x: number, y: number, dir: number) {
    for (let i = 0; i < 14; i++) {
      const angle = (dir > 0 ? -0.4 : Math.PI - 0.4) + (Math.random() - 0.5) * 1.4;
      const speed = 3 + Math.random() * 6;
      this.add(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, '#00f0ff', 2 + Math.random() * 3, 16 + Math.random() * 12, 'spark');
    }
  }

  update(theme: any, cameraX: number, viewWidth: number, viewHeight: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.life--;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.floatingParticles.length < 45) {
      this.floatingParticles.push({
        x: cameraX + Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        vx: (Math.random() - 0.5) * 1.2,
        vy: theme.particleType === 'rain' ? 8 + Math.random() * 6 :
            (theme.particleType === 'snow' ? 1 + Math.random() * 2 : (Math.random() - 0.5) * 1.2),
        size: theme.particleType === 'rain' ? 12 : (1 + Math.random() * 3),
        alpha: 0.2 + Math.random() * 0.5,
        color: theme.particleColor
      });
    }

    for (let i = this.floatingParticles.length - 1; i >= 0; i--) {
      const fp = this.floatingParticles[i];
      fp.x += fp.vx;
      fp.y += fp.vy;
      if (fp.y > viewHeight + 20 || fp.x < cameraX - 100 || fp.x > cameraX + viewWidth + 100) {
        this.floatingParticles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    for (const fp of this.floatingParticles) {
      ctx.globalAlpha = fp.alpha;
      ctx.fillStyle = fp.color;
      ctx.strokeStyle = fp.color;
      if (fp.size > 8) {
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fp.x - cameraX, fp.y);
        ctx.lineTo(fp.x - cameraX - 2, fp.y + fp.size);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(fp.x - cameraX, fp.y, fp.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      const screenX = p.x - cameraX;
      const screenY = p.y - cameraY;
      if (p.shape === 'spark') {
        ctx.fillRect(screenX, screenY, p.size * 1.8, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
}

// Human-Proportioned Futuristic Runner Player
class Player {
  w = 28;
  h = 62;
  x = 100;
  y = 400;
  vx = 0;
  vy = 0;
  dir = 1;

  state = 'idle';
  onGround = false;
  canDoubleJump = true;
  isDucking = false;
  isSliding = false;
  slideTimer = 0;
  isAttacking = false;
  attackTimer = 0;
  attackCooldown = 0;

  hp = 100;
  maxHp = 100;
  stamina = 100;
  maxStamina = 100;
  isInvulnerable = false;
  invulnTimer = 0;

  checkpointX = 100;
  checkpointY = 400;

  animTime = 0;
  scarfPoints = [
    { x: 0, y: 0 },
    { x: -8, y: 4 },
    { x: -18, y: 8 },
    { x: -28, y: 12 }
  ];

  resetToCheckpoint() {
    this.x = this.checkpointX;
    this.y = this.checkpointY;
    this.vx = 0;
    this.vy = 0;
    this.hp = this.maxHp;
    this.stamina = this.maxStamina;
    this.isDucking = false;
    this.isSliding = false;
    this.isAttacking = false;
    this.state = 'idle';
    this.isInvulnerable = true;
    this.invulnTimer = 60;
  }

  update(input: any, level: any, sound: SoundManager, particles: ParticleSystem) {
    this.animTime += 0.22;

    if (this.stamina < this.maxStamina && !this.isSliding) {
      this.stamina = Math.min(this.maxStamina, this.stamina + 0.6);
    }

    if (this.isInvulnerable) {
      this.invulnTimer--;
      if (this.invulnTimer <= 0) this.isInvulnerable = false;
    }

    if (this.attackCooldown > 0) this.attackCooldown--;
    if (this.isAttacking) {
      this.attackTimer--;
      if (this.attackTimer <= 0) {
        this.isAttacking = false;
      }
    }

    if (input.attack && !this.isAttacking && this.attackCooldown <= 0) {
      this.isAttacking = true;
      this.attackTimer = 16;
      this.attackCooldown = 22;
      sound.playAttack();
      particles.createSlashSparks(this.x + this.dir * 30, this.y - 25, this.dir);
      this.performSlashHitCheck(level, sound, particles);
    }

    if (this.isSliding) {
      this.slideTimer--;
      this.h = 32;
      this.vx = this.dir * 8.2;
      particles.add(
        this.x - this.dir * 14,
        this.y,
        -this.dir * (1 + Math.random() * 2),
        -Math.random() * 1.5,
        '#ffaa00',
        3,
        12,
        'spark'
      );
      if (this.slideTimer <= 0 || !this.onGround) {
        this.isSliding = false;
        this.h = 62;
      }
    } else {
      if (input.slide && this.onGround && Math.abs(this.vx) > 2.0 && this.stamina >= 25) {
        this.isSliding = true;
        this.slideTimer = 24;
        this.stamina -= 25;
        sound.playSlide();
      }
    }

    if (!this.isSliding) {
      if (input.duck && this.onGround) {
        this.isDucking = true;
        this.h = 36;
        this.vx *= 0.8;
      } else {
        this.isDucking = false;
        this.h = 62;
      }
    }

    const maxSpeed = 6.2;
    const accel = this.onGround ? 0.9 : 0.55;
    const friction = this.onGround ? 0.82 : 0.94;

    if (!this.isSliding && !this.isDucking) {
      if (input.left) {
        this.vx = Math.max(-maxSpeed, this.vx - accel);
        this.dir = -1;
      } else if (input.right) {
        this.vx = Math.min(maxSpeed, this.vx + accel);
        this.dir = 1;
      } else {
        this.vx *= friction;
      }
    }

    if (input.jumpJustPressed) {
      if (this.onGround) {
        this.vy = -12.8;
        this.onGround = false;
        this.canDoubleJump = true;
        sound.playJump();
        particles.add(this.x, this.y, 0, 1, '#00f0ff', 4, 15);
      } else if (this.canDoubleJump) {
        this.vy = -11.5;
        this.canDoubleJump = false;
        sound.playDoubleJump();
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          particles.add(
            this.x + Math.cos(angle) * 12,
            this.y + Math.sin(angle) * 4,
            Math.cos(angle) * 3,
            1 + Math.random() * 2,
            '#00ffaa',
            3,
            14
          );
        }
      }
    }

    const gravity = 0.58;
    this.vy = Math.min(14.0, this.vy + gravity);

    if (!input.jump && this.vy < -4.0) {
      this.vy *= 0.68;
    }

    this.applyCollisions(level);

    if (this.y > level.height + 150) {
      this.takeDamage(100, sound, particles);
    }

    if (this.isSliding) {
      this.state = 'slide';
    } else if (this.isDucking) {
      this.state = 'duck';
    } else if (!this.onGround) {
      this.state = this.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 0.8) {
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
      const targetX = prev.x - this.dir * 9 - this.vx * 1.5;
      const targetY = prev.y + Math.sin(this.animTime + i) * 3 - this.vy * 0.8;
      cur.x += (targetX - cur.x) * 0.35;
      cur.y += (targetY - cur.y) * 0.35;
    }
  }

  applyCollisions(level: any) {
    this.x += this.vx;
    for (const p of level.platforms) {
      if (p.type === 'solid' && this.checkPlatformOverlap(p)) {
        if (this.vx > 0) {
          this.x = p.x - this.w / 2;
        } else if (this.vx < 0) {
          this.x = p.x + p.w + this.w / 2;
        }
        this.vx = 0;
      }
    }

    this.onGround = false;
    this.y += this.vy;
    for (const p of level.platforms) {
      if (this.checkPlatformOverlap(p)) {
        if (this.vy > 0 && (this.y - this.vy) <= p.y + 12) {
          this.y = p.y;
          this.vy = 0;
          this.onGround = true;
          this.canDoubleJump = true;

          if (p.isMoving) {
            if (p.moveAxis === 'x') {
              this.x += Math.cos(p.moveOffset) * p.moveSpeed;
            } else {
              this.y += Math.sin(p.moveOffset) * p.moveSpeed;
            }
          }
        } else if (p.type === 'solid' && this.vy < 0) {
          this.y = p.y + p.h + this.h;
          this.vy = 0;
        }
      }
    }
  }

  checkPlatformOverlap(p: any) {
    const halfW = this.w / 2;
    const left = this.x - halfW;
    const right = this.x + halfW;
    const top = this.y - this.h;
    const bottom = this.y;

    return (
      right > p.x &&
      left < p.x + p.w &&
      bottom >= p.y &&
      top <= p.y + p.h
    );
  }

  performSlashHitCheck(level: any, sound: SoundManager, particles: ParticleSystem) {
    const attackReach = 75;
    const attackBox = {
      x: this.dir > 0 ? this.x : this.x - attackReach,
      y: this.y - this.h,
      w: attackReach,
      h: this.h + 10
    };

    for (const enemy of level.enemies) {
      if (!enemy.alive) continue;
      if (
        attackBox.x < enemy.x + enemy.w &&
        attackBox.x + attackBox.w > enemy.x &&
        attackBox.y < enemy.y + enemy.h &&
        attackBox.y + attackBox.h > enemy.y
      ) {
        enemy.hp -= 2;
        sound.playHit();
        particles.createExplosion(enemy.x, enemy.y, '#00f0ff', 12);
        if (enemy.hp <= 0) {
          enemy.alive = false;
          sound.playEnemyDeath();
          particles.createExplosion(enemy.x, enemy.y, '#ff0055', 25);
        }
      }
    }

    if (level.boss && level.boss.alive) {
      const b = level.boss;
      if (
        attackBox.x < b.x + b.w &&
        attackBox.x + attackBox.w > b.x &&
        attackBox.y < b.y + b.h &&
        attackBox.y + attackBox.h > b.y
      ) {
        b.hp -= 1;
        sound.playHit();
        particles.createExplosion(b.x + b.w / 2, b.y + b.h / 2, '#ff3366', 15);
        if (b.hp <= 0) {
          b.alive = false;
          sound.playEnemyDeath();
          particles.createExplosion(b.x + b.w / 2, b.y + b.h / 2, '#ffd700', 40);
        }
      }
    }
  }

  takeDamage(amount: number, sound: SoundManager, particles: ParticleSystem) {
    if (this.isInvulnerable) return;
    this.hp = Math.max(0, this.hp - amount);
    this.isInvulnerable = true;
    this.invulnTimer = 45;
    sound.playHurt();
    particles.createExplosion(this.x, this.y - 30, '#ff0055', 20);
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

    const leftLegAngle = isAirborne ? 0.4 : (isRunning ? runCycle * 0.7 : 0);
    const rightLegAngle = isAirborne ? -0.4 : (isRunning ? -runCycle * 0.7 : 0);

    const leftArmAngle = isAirborne ? -0.6 : (isRunning ? -runCycle * 0.8 : 0.1);
    const rightArmAngle = isAirborne ? 0.8 : (isRunning ? runCycle * 0.8 : -0.1);

    ctx.save();
    ctx.translate(2, -42);
    ctx.rotate(rightArmAngle);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-3, 0, 6, 16);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, 14, 5, 14);
    ctx.restore();

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

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, -48, 6, 5);

    const helmetGrad = ctx.createLinearGradient(0, -62, 0, -48);
    helmetGrad.addColorStop(0, '#334155');
    helmetGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = helmetGrad;
    ctx.beginPath();
    ctx.arc(0, -54, 8, 0, Math.PI * 2);
    ctx.fill();

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

    ctx.save();
    ctx.translate(2, -26);
    ctx.rotate(leftLegAngle);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, 0, 7, 16);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-3, 14, 6, 14);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-2, 26, 12, 6);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-2, 31, 12, 2);
    ctx.restore();

    ctx.save();
    ctx.translate(-2, -42);
    ctx.rotate(leftArmAngle);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, 0, 6, 16);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-3, 14, 6, 14);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(0, 20, 3, 10);
    ctx.restore();
  }

  drawSlidingCharacter(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(0, -16);
    ctx.rotate(-0.4);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-14, -12, 24, 12);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-16, -8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(-18, -10, 8, 4);

    ctx.fillStyle = '#334155';
    ctx.fillRect(10, -6, 26, 8);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(32, -2, 6, 4);

    ctx.restore();
  }

  drawDuckingCharacter(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(0, -18);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-8, -12, 16, 16);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(2, -16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(4, -18, 6, 4);

    ctx.fillStyle = '#334155';
    ctx.fillRect(-9, 4, 18, 12);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-6, 14, 14, 3);

    ctx.restore();
  }

  drawAttackSlash(ctx: CanvasRenderingContext2D) {
    const progress = (16 - this.attackTimer) / 16;
    ctx.save();
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 15;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(20, -32, 42, -1.2 + progress * 0.8, 1.2 + progress * 0.8);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
  }
}

// Game Engine Core
export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sound = new SoundManager();
  save = new SaveSystem();
  particles = new ParticleSystem();
  player = new Player();

  currentLevelNum = 1;
  currentLevel: any = null;
  state = 'menu';
  score = 0;
  crystalsCollected = 0;
  levelStartTime = 0;
  viewportWidth = 800;
  viewportHeight = 600;

  cameraX = 0;
  cameraY = 0;
  shakeIntensity = 0;

  input = {
    left: false,
    right: false,
    jump: false,
    jumpJustPressed: false,
    duck: false,
    slide: false,
    attack: false
  };

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

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

    requestAnimationFrame(this.loop.bind(this));
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
          this.input.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.input.right = true;
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          this.input.jump = true;
          this.input.jumpJustPressed = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.input.duck = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.input.slide = true;
          break;
        case 'KeyJ':
        case 'KeyZ':
          this.input.attack = true;
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
          this.input.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.input.right = false;
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          this.input.jump = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.input.duck = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.input.slide = false;
          break;
        case 'KeyJ':
        case 'KeyZ':
          this.input.attack = false;
          break;
      }
    });

    const bindTouchBtn = (id: string, keyName: string) => {
      const btn = document.getElementById(id);
      if (!btn) return;

      const onDown = (e: any) => {
        if (e.cancelable && e.pointerType === 'touch') {
          e.preventDefault();
        }
        this.sound.init();
        try {
          if (btn.setPointerCapture && e.pointerId) {
            btn.setPointerCapture(e.pointerId);
          }
        } catch (_) {}
        btn.classList.add('active');
        (this.input as any)[keyName] = true;
        if (keyName === 'jump') this.input.jumpJustPressed = true;
        if (window.navigator && window.navigator.vibrate) {
          try { window.navigator.vibrate(12); } catch (_) {}
        }
      };

      const onUp = (e: any) => {
        try {
          if (btn.releasePointerCapture && e.pointerId) {
            btn.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
        btn.classList.remove('active');
        (this.input as any)[keyName] = false;
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
        e.stopPropagation();
        this.sound.init();
        action();
      });
    };

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

    bindClick('btn-hud-pause', () => {
      this.togglePause();
    });

    bindClick('btn-resume-game', () => {
      this.togglePause();
    });

    bindClick('btn-pause-checkpoint', () => {
      this.togglePause();
      this.player.resetToCheckpoint();
    });

    bindClick('btn-pause-settings', () => {
      this.openSettings();
    });

    bindClick('btn-pause-exit', () => {
      this.sound.playClick();
      document.getElementById('pause-modal')?.classList.add('hidden');
      this.sound.stopMusic();
      this.state = 'menu';
      this.showScreen('main-menu');
    });

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

    bindClick('btn-restart-checkpoint', () => {
      this.sound.playClick();
      document.getElementById('game-over-modal')?.classList.add('hidden');
      this.player.resetToCheckpoint();
      this.state = 'playing';
    });

    bindClick('btn-restart-level', () => {
      this.sound.playClick();
      document.getElementById('game-over-modal')?.classList.add('hidden');
      this.startLevel(this.currentLevelNum);
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
    const sfxBtn = document.getElementById('toggle-sfx');
    const musicBtn = document.getElementById('toggle-music');
    const shakeBtn = document.getElementById('toggle-shake');
    const perfBtn = document.getElementById('toggle-performance');

    const updateBtn = (btn: HTMLElement | null, val: boolean) => {
      if (!btn) return;
      btn.textContent = val ? 'ON' : 'OFF';
      btn.classList.toggle('active', !!val);
    };

    updateBtn(sfxBtn, this.save.data.settings.sfx);
    updateBtn(musicBtn, this.save.data.settings.music);
    updateBtn(shakeBtn, this.save.data.settings.shake);
    updateBtn(perfBtn, this.save.data.settings.performance);

    if (sfxBtn) {
      sfxBtn.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.sfx = !this.save.data.settings.sfx;
        this.sound.sfxEnabled = this.save.data.settings.sfx;
        updateBtn(sfxBtn, this.save.data.settings.sfx);
        this.save.save();
      };
    }

    if (musicBtn) {
      musicBtn.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.music = !this.save.data.settings.music;
        this.sound.musicEnabled = this.save.data.settings.music;
        updateBtn(musicBtn, this.save.data.settings.music);
        if (this.sound.musicEnabled && this.state === 'playing' && this.currentLevel) {
          this.sound.startThemeMusic(this.currentLevel.worldIdx);
        } else {
          this.sound.stopMusic();
        }
        this.save.save();
      };
    }

    if (shakeBtn) {
      shakeBtn.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.shake = !this.save.data.settings.shake;
        updateBtn(shakeBtn, this.save.data.settings.shake);
        this.save.save();
      };
    }

    if (perfBtn) {
      perfBtn.onclick = (e) => {
        e.stopPropagation();
        this.save.data.settings.performance = !this.save.data.settings.performance;
        updateBtn(perfBtn, this.save.data.settings.performance);
        this.save.save();
      };
    }

    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.onclick = (e) => {
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

  showScreen(screenId: string) {
    ['main-menu', 'level-select-menu', 'game-hud'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.remove('hidden');
    }
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
    this.state = 'playing';

    this.showScreen('game-hud');
    const lvlText = document.getElementById('hud-level-text');
    if (lvlText) lvlText.textContent = `LEVEL ${levelNum} / 100`;
    const themeText = document.getElementById('hud-theme-text');
    if (themeText) themeText.textContent = this.currentLevel.theme.name;
    this.updateHUD();

    this.sound.startThemeMusic(this.currentLevel.worldIdx);
  }

  openLevelSelect() {
    this.state = 'level_select';
    this.showScreen('level-select-menu');
    const totalEl = document.getElementById('level-select-total-crystals');
    if (totalEl) totalEl.textContent = this.save.data.totalCrystals || 0;

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
        const stats = this.save.data.levels[i];
        const card = document.createElement('div');
        card.id = `level-card-${i}`;
        card.className = 'level-card' + (isUnlocked ? '' : ' locked');

        if (isUnlocked) {
          card.innerHTML = `
            <span class="card-num">${i}</span>
            <span class="card-stars">${stats ? '★'.repeat(stats.stars) + '☆'.repeat(3 - stats.stars) : '☆☆☆'}</span>
          `;
          card.onclick = (e) => {
            e.stopPropagation();
            this.sound.playClick();
            this.startLevel(i);
          };
        } else {
          card.innerHTML = `
            <span class="card-num">${i}</span>
            <span class="card-lock">🔒</span>
          `;
        }
        grid.appendChild(card);
      }
    }
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      this.sound.playClick();
      document.getElementById('pause-modal')?.classList.remove('hidden');
    } else if (this.state === 'paused') {
      this.state = 'playing';
      this.sound.playClick();
      document.getElementById('pause-modal')?.classList.add('hidden');
      document.getElementById('settings-modal')?.classList.add('hidden');
    }
  }

  showToast(msg: string) {
    const toast = document.getElementById('hud-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 1800);
  }

  updateHUD() {
    if (!this.currentLevel) return;

    const hpPct = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    const hpFill = document.getElementById('hp-bar-fill');
    if (hpFill) hpFill.style.width = `${hpPct}%`;
    const hpText = document.getElementById('hp-text');
    if (hpText) hpText.textContent = String(Math.round(this.player.hp));

    const stPct = (this.player.stamina / this.player.maxStamina) * 100;
    const stFill = document.getElementById('stamina-bar-fill');
    if (stFill) stFill.style.width = `${stPct}%`;

    const totalCrystals = this.currentLevel.collectibles.length;
    const crysText = document.getElementById('hud-crystals-text');
    if (crysText) crysText.textContent = `${this.crystalsCollected} / ${totalCrystals}`;
    const scoreText = document.getElementById('hud-score-text');
    if (scoreText) scoreText.textContent = String(this.score);

    const bossBar = document.getElementById('boss-bar-container');
    if (this.currentLevel.boss && this.currentLevel.boss.alive && bossBar) {
      bossBar.classList.remove('hidden');
      const b = this.currentLevel.boss;
      const bHpPct = Math.max(0, (b.hp / b.maxHp) * 100);
      const bossName = document.getElementById('boss-name-text');
      if (bossName) bossName.textContent = b.name;
      const bossHp = document.getElementById('boss-hp-text');
      if (bossHp) bossHp.textContent = `${Math.round(bHpPct)}%`;
      const bossBarFill = document.getElementById('boss-bar-fill');
      if (bossBarFill) bossBarFill.style.width = `${bHpPct}%`;
    } else if (bossBar) {
      bossBar.classList.add('hidden');
    }
  }

  handleLevelComplete() {
    this.state = 'victory';
    this.sound.playLevelComplete();

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
    const timeVal = document.getElementById('complete-time-val');
    if (timeVal) timeVal.textContent = `${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}`;
    const crysVal = document.getElementById('complete-crystals-val');
    if (crysVal) crysVal.textContent = `${this.crystalsCollected} / ${totalCrystals}`;
    const scoreVal = document.getElementById('complete-score-val');
    if (scoreVal) scoreVal.textContent = String(finalScore);

    for (let s = 1; s <= 3; s++) {
      const starEl = document.getElementById(`star-${s}`);
      if (starEl) starEl.classList.toggle('earned', s <= stars);
    }

    document.getElementById('level-complete-modal')?.classList.remove('hidden');
  }

  handlePlayerDeath() {
    this.state = 'death';
    this.sound.playTone(80, 'sawtooth', 0.5, 0.4, 0.01);
    document.getElementById('game-over-modal')?.classList.remove('hidden');
  }

  update() {
    if (this.state !== 'playing' || !this.currentLevel) return;

    const level = this.currentLevel;

    for (const p of level.platforms) {
      if (p.isMoving) {
        p.moveOffset += 0.035;
        if (p.moveAxis === 'x') {
          p.x = p.origX + Math.sin(p.moveOffset) * p.moveRange;
        } else {
          p.y = p.origY + Math.sin(p.moveOffset) * p.moveRange;
        }
      }
    }

    this.player.update(this.input, level, this.sound, this.particles);
    this.input.jumpJustPressed = false;

    for (const h of level.hazards) {
      if (
        this.player.x + this.player.w / 2 > h.x &&
        this.player.x - this.player.w / 2 < h.x + h.w &&
        this.player.y > h.y &&
        this.player.y - this.player.h < h.y + h.h
      ) {
        this.player.takeDamage(25, this.sound, this.particles);
        this.shakeIntensity = 12;
      }
    }

    for (const c of level.collectibles) {
      if (!c.collected) {
        const dx = this.player.x - c.x;
        const dy = (this.player.y - this.player.h / 2) - c.y;
        if (dx * dx + dy * dy < (c.r + 20) * (c.r + 20)) {
          c.collected = true;
          this.crystalsCollected++;
          this.score += 250;
          this.sound.playCrystal();
          this.particles.createExplosion(c.x, c.y, '#ffd700', 10);
        }
      }
    }

    for (const cp of level.checkpoints) {
      if (!cp.active && Math.abs(this.player.x - cp.x) < 40 && Math.abs(this.player.y - cp.y) < 60) {
        cp.active = true;
        this.player.checkpointX = cp.x;
        this.player.checkpointY = cp.y;
        this.sound.playCheckpoint();
        this.particles.createExplosion(cp.x, cp.y - 40, '#00ffaa', 18);
        this.showToast('CHECKPOINT REACHED');
      }
    }

    for (const e of level.enemies) {
      if (!e.alive) continue;

      if (e.type === 'patrol') {
        e.x += e.vx * e.dir;
        if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
        if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
      } else if (e.type === 'rusher') {
        const distToPlayer = Math.abs(this.player.x - e.x);
        if (distToPlayer < 240) {
          e.dir = this.player.x > e.x ? 1 : -1;
          e.x += e.speed * e.dir * 1.5;
        } else {
          e.x += e.vx * e.dir;
          if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
          if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
        }
      } else if (e.type === 'flyer') {
        e.x += e.vx * e.dir;
        e.y += Math.sin(performance.now() * 0.004) * 1.2;
        if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
        if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
      } else if (e.type === 'heavy') {
        e.x += e.vx * 0.6 * e.dir;
        if (e.x > e.maxX) { e.x = e.maxX; e.dir = -1; }
        if (e.x < e.minX) { e.x = e.minX; e.dir = 1; }
      }

      if (
        this.player.x + this.player.w / 2 > e.x &&
        this.player.x - this.player.w / 2 < e.x + e.w &&
        this.player.y > e.y &&
        this.player.y - this.player.h < e.y + e.h
      ) {
        this.player.takeDamage(e.type === 'heavy' ? 30 : 15, this.sound, this.particles);
        this.shakeIntensity = 10;
      }
    }

    if (level.boss && level.boss.alive) {
      const b = level.boss;
      b.x += b.vx * b.dir;
      if (b.x > level.goal.x + 100) { b.dir = -1; }
      if (b.x < level.goal.x - 250) { b.dir = 1; }

      if (
        this.player.x + this.player.w / 2 > b.x &&
        this.player.x - this.player.w / 2 < b.x + b.w &&
        this.player.y > b.y &&
        this.player.y - this.player.h < b.y + b.h
      ) {
        this.player.takeDamage(35, this.sound, this.particles);
        this.shakeIntensity = 16;
      }
    }

    const goal = level.goal;
    if (
      this.player.x + this.player.w / 2 > goal.x &&
      this.player.x - this.player.w / 2 < goal.x + goal.w &&
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

    const targetCamX = this.player.x - this.viewportWidth * 0.38;
    const targetCamY = Math.max(0, Math.min(level.height - this.viewportHeight, this.player.y - this.viewportHeight * 0.6));
    this.cameraX += (targetCamX - this.cameraX) * 0.12;
    this.cameraY += (targetCamY - this.cameraY) * 0.12;

    this.particles.update(level.theme, this.cameraX, this.viewportWidth, this.viewportHeight);
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
      if (this.shakeIntensity < 0.5) this.shakeIntensity = 0;
    }

    this.renderParallaxBackground(ctx, level, w, h);
    this.particles.draw(ctx, this.cameraX, this.cameraY);

    for (const p of level.platforms) {
      const screenX = p.x - this.cameraX;
      const screenY = p.y - this.cameraY;
      if (screenX + p.w < -100 || screenX > w + 100) continue;

      ctx.fillStyle = theme.platformColor;
      ctx.fillRect(screenX, screenY, p.w, p.h);

      ctx.fillStyle = theme.platformBorder;
      ctx.fillRect(screenX, screenY, p.w, 3);

      if (p.w > 60 && p.h > 40) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let gx = 40; gx < p.w; gx += 40) {
          ctx.beginPath();
          ctx.moveTo(screenX + gx, screenY + 4);
          ctx.lineTo(screenX + gx, screenY + p.h);
          ctx.stroke();
        }
      }
    }

    for (const hz of level.hazards) {
      const sx = hz.x - this.cameraX;
      const sy = hz.y - this.cameraY;
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      const numTeeth = Math.floor(hz.w / 14);
      for (let i = 0; i < numTeeth; i++) {
        ctx.moveTo(sx + i * 14, sy + hz.h);
        ctx.lineTo(sx + i * 14 + 7, sy);
        ctx.lineTo(sx + i * 14 + 14, sy + hz.h);
      }
      ctx.closePath();
      ctx.fill();
    }

    for (const cp of level.checkpoints) {
      const sx = cp.x - this.cameraX;
      const sy = cp.y - this.cameraY;

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(sx - 10, sy - 50, 20, 50);

      const color = cp.active ? '#00ffaa' : '#ff0055';
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = cp.active ? 15 : 6;
      ctx.beginPath();
      ctx.arc(sx, sy - 60, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (cp.active) {
        const beamGrad = ctx.createLinearGradient(0, sy - 60, 0, sy - 240);
        beamGrad.addColorStop(0, 'rgba(0, 255, 170, 0.4)');
        beamGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(sx - 4, sy - 240, 8, 180);
      }
    }

    const t = performance.now() * 0.004;
    for (const c of level.collectibles) {
      if (c.collected) continue;
      const sx = c.x - this.cameraX;
      const sy = c.y - this.cameraY + Math.sin(t + c.animOffset) * 6;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(t * 0.8);
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(10, 0);
      ctx.lineTo(0, 14);
      ctx.lineTo(-10, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-2, -6, 4, 12);
      ctx.restore();
    }

    const goal = level.goal;
    const gsx = goal.x - this.cameraX;
    const gsy = goal.y - this.cameraY;
    ctx.save();
    ctx.translate(gsx + goal.w / 2, gsy + goal.h / 2);
    ctx.rotate(t * 1.2);
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 22;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 48, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 38, t * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    for (const e of level.enemies) {
      if (!e.alive) continue;
      const esx = e.x - this.cameraX;
      const esy = e.y - this.cameraY;

      ctx.save();
      ctx.translate(esx + e.w / 2, esy + e.h / 2);
      ctx.scale(e.dir, 1);

      if (e.type === 'flyer') {
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(2, -3, 8, 6);
      } else if (e.type === 'heavy') {
        ctx.fillStyle = '#334155';
        ctx.fillRect(-22, -26, 44, 42);
        ctx.fillStyle = '#ff3300';
        ctx.fillRect(4, -18, 12, 6);
      } else {
        ctx.fillStyle = e.type === 'rusher' ? '#ff3300' : '#475569';
        ctx.fillRect(-16, -16, 32, 28);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(6, -8, 8, 4);
      }
      ctx.restore();
    }

    if (level.boss && level.boss.alive) {
      const b = level.boss;
      const bsx = b.x - this.cameraX;
      const bsy = b.y - this.cameraY;

      ctx.save();
      ctx.translate(bsx + b.w / 2, bsy + b.h / 2);
      ctx.fillStyle = '#ff0055';
      ctx.shadowColor = '#ff0055';
      ctx.shadowBlur = 20;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, -20, 20, 10);
      ctx.restore();
    }

    this.player.draw(ctx, this.cameraX, this.cameraY);

    ctx.restore();
  }

  renderParallaxBackground(ctx: CanvasRenderingContext2D, level: any, w: number, h: number) {
    const theme = level.theme;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, theme.skyTop);
    skyGrad.addColorStop(1, theme.skyBottom);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    const distOffset = -(this.cameraX * 0.08) % 400;
    for (let x = distOffset - 400; x < w + 400; x += 400) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + 200, h - 280);
      ctx.lineTo(x + 400, h);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    const midOffset = -(this.cameraX * 0.22) % 240;
    for (let x = midOffset - 240; x < w + 240; x += 120) {
      ctx.fillRect(x, h - 340, 75, 340);
      ctx.fillStyle = theme.accent;
      ctx.fillRect(x + 14, h - 290, 8, 14);
      ctx.fillRect(x + 36, h - 250, 8, 14);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
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
    const t = performance.now() * 0.03;
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

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }
}

// Auto-boot game
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
