# LUMINA Sales Pilot — Ambient Intelligence Platform (React + Vite)

A state-of-the-art enterprise B2B sales automation platform UI built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and interactive **WebGL Shaders**, derived from Google Stitch design specifications.

---

## 💎 Features & Architecture

- **Aether Glass Design System**: Deep spatial glassmorphism using multi-tier backdrop blur layers (`glass-panel`, `glass-modal`, `glass-card-dark`, `glass-panel-highlight`), electric blue/cyan accents, and luminous gradient borders.
- **Interactive WebGL Aurora Shader**: Real-time interactive GPU shader background with mouse reactivity and simulation speed controls.
- **Executive Sales Dashboard**:
  - Live revenue wave chart with real-time deal alerts.
  - SVG circular pipeline gauge (75% / $3.4M capacity).
  - Win-rate analytics and trend comparison.
  - Filterable live activity stream (Deals, Discovery Calls, Closed Won/Lost).
  - Quick action FAB for pipeline additions.
- **High-Converting Landing Page**:
  - Hero section with gradient text and CTA triggers.
  - Infinite smooth social proof marquee with linear gradient edge masks.
  - Feature preview cards with radial glow effects.
- **Modular Capabilities Page**:
  - Interactive Prospect Match score simulator with real-time slider.
  - Autonomous outreach metrics and enterprise security specs.
- **Transparent Pricing Calculator**:
  - Interactive Annual / Monthly billing switch with ~20% discount calculation.
  - Starter, Professional (highlighted), and Enterprise tier cards.
  - Collapsible FAQ accordion.
- **Executive Briefing / Book Demo Modal**:
  - Modal lead capture dialog with validation and confirmation animation.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```

---

## 📁 Directory Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/             # Shared glassmorphic UI components
│   │   │   ├── BookDemoModal.tsx
│   │   │   ├── FloatingActionButton.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ShaderBackground.tsx
│   │   ├── dashboard/          # Metrics, gauges, revenue charts, feeds
│   │   ├── features/           # Capability cards, prospect match simulator
│   │   ├── landing/            # Hero, marquee, preview cards
│   │   └── pricing/            # Pricing tiers, billing toggle, FAQ accordion
│   ├── data/
│   │   └── mockData.ts         # Centralized mock data
│   ├── pages/                  # Page-level views
│   │   ├── DashboardPage.tsx
│   │   ├── FeaturesPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── PricingPage.tsx
│   │   └── ShaderSandboxPage.tsx
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Root layout & page switcher
│   ├── index.css               # Tailwind & Glassmorphism design tokens
│   └── main.tsx                # React DOM entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
