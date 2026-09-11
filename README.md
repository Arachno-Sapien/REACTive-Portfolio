# Syed Junaid Khalander | Developer Portfolio

A modern, high-performance developer portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and animated interaction components powered by **Motion**, **GSAP**, and **React Bits**.

---

## Features

- **Interactive 3D Certificate Stack**: Smooth 3D depth perspective cycling through all 29 certifications, with live card counter, active title badge, and keyboard support.
- **Certificate Gallery & Lightbox**: Modal view with real-time keyword search across all 29 credentials and a full-resolution lightbox viewer.
- **Micro-Interactions & Fluid Motion**: Dynamic animations including magnetic buttons, spotlight hover effects, particle canvas, and encrypted header animations.
- **Responsive & Accessible**: Fully optimized for mobile, tablet, and desktop viewports with WCAG AA compliance and keyboard navigation.
- **Modern Performance**: Sub-second build times via Vite, optimized asset bundling, and clean code splitting.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS design tokens |
| **Animation & 3D** | [Motion](https://motion.dev/), [GSAP](https://gsap.com/), [Three.js](https://threejs.org/), [OGL](https://github.com/oframe/ogl), [Lenis](https://lenis.darkroom.engineering/) |
| **Components** | Curated [React Bits](https://reactbits.dev/) animation components |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## Project Structure

```text
├── public/
│   ├── assets/                 # Static images, profile picture, projects, and 29 certificates
│   ├── favicon.svg             # Vector site icon
│   └── icons.svg               # SVG sprite map for skill icons
├── src/
│   ├── assets/                 # App-level assets (hero graphic)
│   ├── components/
│   │   └── react-bits/         # Interactive animated components (Stack, CardSwap, Aurora, etc.)
│   ├── data/
│   │   └── portfolio.ts        # Single source of truth for portfolio data (projects, skills, certs)
│   ├── sections/               # Page sections (Hero, About, Education, Skills, Certifications, etc.)
│   ├── App.tsx                 # Root layout and section composition
│   ├── index.css               # Design tokens, theme variables, and global styles
│   └── main.tsx                # React application entry point
├── index.html                  # HTML template with SEO meta tags & preconnects
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite bundler configuration with Tailwind & path aliases
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd "Portfolio-2 with react"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with hot module replacement (HMR). |
| `npm run build` | Type-checks via `tsc` and compiles production assets into `dist/`. |
| `npm run preview` | Locally serves the production build from `dist/` for testing. |
| `npm run lint` | Runs Oxlint to check code quality and detect potential issues. |

---

## Deployment

The project builds to static files in the `dist/` folder and can be deployed to any static hosting provider:

### Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Netlify
1. Connect repository on [Netlify](https://www.netlify.com).
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### GitHub Pages
1. Build the production bundle: `npm run build`
2. Deploy the generated `dist/` folder using GitHub Pages or the `gh-pages` npm package.

---

## Author

**Syed Junaid Khalander**
- LinkedIn: [linkedin.com/in/syed-junaid-khalander](https://www.linkedin.com/in/syed-junaid-khalander)
- GitHub: [github.com/Junaid-028](https://github.com/Junaid-028)
