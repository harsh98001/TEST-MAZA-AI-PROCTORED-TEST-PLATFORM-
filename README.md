# ⚡ TEST MAZA — AI-Proctored Examination & Algorithmic Coding Arena

[![Live Production](https://img.shields.io/badge/Production-Live-emerald?style=flat-square&logo=vercel)](https://test-maza-ai.vercel.app)
[![Version](https://img.shields.io/badge/Version-3.1.1-blue?style=flat-square)](https://github.com/harsh98001/TEST-MAZA-AI-PROCTORED-TEST-PLATFORM-)
[![Framework](https://img.shields.io/badge/Frontend-React_19_|_Vite_8-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Graphics](https://img.shields.io/badge/3D_Engine-Three.js_|_R3F-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Database](https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

> **A unified, award-grade academic assessment ecosystem combining university syllabus examinations (1,196 certified MCQs across 14 tracks), a LeetCode-grade multi-language coding IDE ("The Arena"), a privacy-preserving client-side AI proctoring watchdog, and a real-time Faculty Live Command Center.**

---

## 🌐 Live Platform Access

- **Live Application**: [https://test-maza-ai.vercel.app](https://test-maza-ai.vercel.app)
- **Faculty Command Center**: [https://test-maza-ai.vercel.app/faculty/live](https://test-maza-ai.vercel.app/faculty/live)
- **The Arena (IDE)**: [https://test-maza-ai.vercel.app/arena](https://test-maza-ai.vercel.app/arena)
- **GitHub Repository**: [https://github.com/harsh98001/TEST-MAZA-AI-PROCTORED-TEST-PLATFORM-](https://github.com/harsh98001/TEST-MAZA-AI-PROCTORED-TEST-PLATFORM-)

---

## 🏛️ System Architecture

```
                                  +--------------------------------------------------+
                                  |                 CLIENT BROWSER                   |
                                  |    (Awwwards 3D Spatial UI + Lenis Inertia)      |
                                  +------------------------+-------------------------+
                                                           |
                                 +-------------------------+-------------------------+
                                 |                                                   |
                                 v                                                   v
                +----------------------------------+               +----------------------------------+
                |        EXAMINATION ENGINE        |               |        THE ARENA (IDE)           |
                |  • 14 University Syllabus Tracks |               |  • Monaco Code Editor (7 Tracks) |
                |  • 1,196 Structured MCQs         |               |  • Sample & Hidden Test Suites   |
                |  • Phase-Wise Time Allocation    |               |  • 3-Tier Progressive Clues      |
                |  • Instant Post-Mortem Solution  |               |  • GitHub 52-Week Habit Heatmap  |
                +----------------+-----------------+               +----------------+-----------------+
                                 |                                                  |
                                 +-------------------------+------------------------+
                                                           |
                                                           v
                                         +-----------------------------------+
                                         |    AI PROCTORING WATCHDOG SUITE   |
                                         |  • WebRTC Camera Stream HUD       |
                                         |  • Web Audio API Decibel Meter    |
                                         |  • Fullscreen Lockout Enforcement |
                                         |  • Keystroke / Clipboard Intercept|
                                         |  • 3-Strike Violation Engine      |
                                         +-----------------+-----------------+
                                                           |
                                                           v
                         +---------------------------------+---------------------------------+
                         |                                                                   |
                         v                                                                   v
       +-----------------------------------+                               +-----------------------------------+
       |     SUPABASE CLOUD AUTHENTICATION |                               |     PISTON COMPILER SANDBOX       |
       |  • PKCE Direct Session Protocol   |                               |  • Multi-Language Remote Sandbox  |
       |  • 3D Holographic Bio-Auth Modal  |                               |  • Runtime & Memory Telemetry     |
       |  • Role-Based Access Control      |                               |  • Local In-Memory Fallback       |
       +-----------------------------------+                               +-----------------------------------+
```

---

## ✨ Core Pillars & Features

### 1. 🏛️ Academic Curricula Engine (14 Tracks / 1,196 MCQs)
- Complete coverage of university syllabus with unit-wise filters, difficulty breakdown, and step-by-step academic explanations.
- Tracks include: **Web Development (100 Qs)**, **DSA (80 Qs)**, **HTML Lab (80 Qs)**, **Computer Networks (70 Qs)**, **Operating Systems (60 Qs)**, **Software Engineering (60 Qs)**, **ADA (65 Qs)**, **CSS & JS (70 Qs)**, **IKS (65 Qs)**, **MERN Full Stack (70 Qs)**, **Machine Learning with Python (181 Qs)**, **Discrete Math (70 Qs)**, **PHP Engineering (155 Qs)**, and **Analytical Skills-II (70 Qs)**.

### 2. ⚔️ "The Arena" — Multi-Language Coding Workspace
- Built on VS Code's **Monaco Editor** with syntax highlighting, auto-complete, and error markers.
- **7 First-Class Language Tracks**: Python 3.10, C++20, JavaScript (Node.js 18), SQL (PostgreSQL/SQLite), Java 15, C17, and C# (.NET 6.0).
- **Dual Verification Engines**:
  - `RUN` (`Ctrl + Enter`): Fast in-browser execution against visible sample test cases.
  - `SUBMIT` (`Ctrl + Shift + Enter`): Evaluates against private edge-case suites (Accepted, Wrong Answer, TLE, Runtime Error).
- **52-Week GitHub Habit Matrix**: Daily activity tracking with commit synchronization.

### 3. 🛡️ In-Browser Privacy-Preserving AI Proctoring
- **Zero Raw Video Upload**: Video frames are analyzed locally in the browser via an offscreen HTML5 Canvas (160x120 downsampling) and WebGL.
- **Real-Time Detection Loops**:
  - **500ms Face Loop**: Skin chromaticity clustering detects single candidate, absence (0 faces), or unauthorized multiple individuals ($\ge 2$ faces).
  - **1.0s Debounced Hard Lockout**: Automatically terminates the exam immediately upon sustained secondary face presence.
  - **2000ms Device Loop**: High-contrast luminance scanner detects mobile phones.
  - **Acoustic Surveillance**: Web Audio API RMS decibel meter flags speech $>68\text{ dB}$.
  - **Browser Lockout**: Intercepts `Ctrl+C`, `Ctrl+V`, `F12`, right-click menus, and tab-switching.

### 4. 🖥️ Faculty Live Command Center (`/faculty/live`)
- Real-time candidate monitoring room with live exam progress bars and dynamic risk score meters (Green <30, Amber 30–70, Red >70).
- **Evidence Drawer**: Inspect timestamped violation audit logs and captured frame snapshot images.
- **One-Click Remote Disqualification**: Faculty can instantly terminate any suspicious exam session via Supabase Realtime WebSocket broadcast.

### 5. 🌌 3D Spatial Presentation & Dynamic Performance
- Interactive Three.js / React Three Fiber **Gyro Monolith Core** on the hero canvas and **3D Holographic Bio-Auth Gateway**.
- Lenis smooth inertia physics and custom trailing magnetic cursor.
- Sub-second page loads achieved via granular route-level code splitting (`React.lazy` + `<Suspense>`).

---

## 🛠️ Technology Stack

| Domain | Technologies |
|---|---|
| **Core Framework** | React 19, Vite 8.0, React Router DOM 7 |
| **3D Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| **Styling & Motion** | Tailwind CSS 4.3, Framer Motion 13, GSAP 3.15, Lenis 1.3 |
| **Code Editor** | `@monaco-editor/react` (VS Code Core Engine) |
| **Database & Auth** | Supabase Cloud, PostgreSQL 15, PKCE Authentication, Realtime Channels, RLS |
| **Compiler Gateway** | Piston Execution API v2 + Web Workers |
| **Deployment** | Vercel Edge Serverless Network |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/harsh98001/TEST-MAZA-AI-PROCTORED-TEST-PLATFORM-.git
cd TEST-MAZA-AI-PROCTORED-TEST-PLATFORM-

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be accessible at `http://127.0.0.1:5173/`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
