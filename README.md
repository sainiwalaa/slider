# AETHER LEAP ⚡🏃‍♂️

> **Run Beyond The Limit** — A high-octane 2D futuristic action platform runner featuring **100 playable levels** across **10 distinct sci-fi worlds**.

Built with HTML5 Canvas, TypeScript/JavaScript, and Web Audio API, packaged seamlessly for both **Web (Vite/GitHub Pages)** and **Android (Jetpack Compose & Hardware-Accelerated WebView)**.

---

## 🌟 Features

* **100 Fully Playable Progressive Levels**: Levels grow progressively longer and more demanding, transitioning from introductory rooftop sprints to massive gauntlets.
* **10 Diverse Sci-Fi Worlds**:
  1. *Neon City* (Levels 1–10)
  2. *Cyber Forest* (Levels 11–20)
  3. *Desert Ruins* (Levels 21–30)
  4. *Frozen Valley* (Levels 31–40)
  5. *Volcano Core* (Levels 41–50, Mid-Boss: Magma Sentinel)
  6. *Sky Islands* (Levels 51–60)
  7. *Crystal Caves* (Levels 61–70)
  8. *Rain City* (Levels 71–80)
  9. *Industrial Factory* (Levels 81–90)
  10. *Space Station* (Levels 91–100, Final Boss: Nexus Overlord)
* **Human-Proportioned Cyber Runner**: Layered vector aesthetics with animated idle, run cycle, jumping, falling, crouching, high-speed sliding, plasma blade slashing, and trailing energy scarf physics.
* **Multi-Touch & Mobile-First Controls**: Large thumb-friendly directional and action clusters with Pointer Capture, zero touch lag, and haptic feedback.
* **Orientation Detection**: Landscape-first layout with automatic "Rotate Your Phone" animation if opened in portrait mode.
* **Procedural Web Audio Engine**: Zero external audio downloads needed — synthesizes jumping, slashing, double-jump thrusters, explosions, crystal chimes, and adaptive cyberpunk ambient soundtracks directly on device.
* **Save System**: Tracks level unlocks (1–100), 3-star ratings, high scores, collected Aether Crystals, and user settings using `localStorage`.

---

## 🎮 Controls

### Desktop Keyboard
| Action | Key(s) |
|---|---|
| **Move Left** | `A` or `Left Arrow` |
| **Move Right** | `D` or `Right Arrow` |
| **Jump / Double Jump** | `W`, `Up Arrow`, or `Space` |
| **Duck / Drop Through Platform** | `S` or `Down Arrow` |
| **High-Speed Slide** | `Shift` (while running) |
| **Plasma Blade Slash** | `J` or `Z` |
| **Pause Game** | `Escape` or `P` |

### Mobile Touch
* **Left Hand**: `◀` (Left), `▶` (Right), `▼` (Duck)
* **Right Hand**: `▲` (Jump / Double Jump), `⚡` (Slide), `⚔` (Slash)
* **Top Right**: `⏸` (Pause)

---

## 💻 Web Development & Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL displayed in the console).

### 3. Build for Production
```bash
npm run build
```
This generates the optimized production build in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🚀 GitHub & GitHub Pages Deployment

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit of Aether Leap (100 levels)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aether-leap.git
git push -u origin main
```

### Deploy to GitHub Pages
1. Build the production files:
   ```bash
   npm run build
   ```
2. You can deploy using the `gh-pages` branch or configure GitHub Actions:
   * In your repository on GitHub, navigate to **Settings > Pages**.
   * Under **Build and deployment**, select **GitHub Actions** (using the Static HTML / Vite workflow) or set source to `dist/` branch.

---

## 📱 Android App Deployment

This repository is also pre-configured as a complete, native Android project:
* **Launcher Icon**: Custom adaptive cyberpunk runner icon generated in all densities (`mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`).
* **Hardware-Accelerated WebView**: Loads the offline web bundle directly from `app/src/main/assets/web/`.
* **Full Screen Immersive Mode**: Automatic system bar concealment and safe-area inset adaptation.
* **Build APK / AAB**:
  ```bash
  gradle assembleDebug
  ```
