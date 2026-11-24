# Aariz Shadman — Personal Portfolio

An understated, thoughtful, and high-performance personal portfolio website for **Aariz Shadman**, inspired by the intellectual rigor, editorial typography, and builder ethos of South Park Commons.

Built with **React 19**, **TypeScript**, **Vite**, and **pure semantic CSS**.

---

## Highlights
- **Centralized Data Store**: All personal info, projects, essays, reading recommendations, and timeline milestones are located in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts) for effortless editing.
- **Zero Heavy UI Dependencies**: Pure React + TypeScript + custom CSS. No bloated CSS frameworks or tracking scripts, ensuring sub-second page loads.
- **Interactive Deep Dives**:
  - **Live Storage Engine Simulation**: In the LoomKV project modal, test `PUT`, `GET`, and `Flush to SSTable` operations with live Write-Ahead Log offsets and CRC32 checksums.
  - **Backpropagation Visualizer**: In the SynapseVis project modal, explore interactive weight updates and gradient descent.
  - **Command Palette (`Cmd+K` or `/`)**: Keyboard-first search across projects, essays, sections, and quick actions.
  - **Quick Resume / CV Drawer**: Clean, printable CV with dedicated `@media print` styling for recruiters and collaborators.
  - **Instant Project Search & Tag Filtering**: Live keyword search across all projects with category count badges.
  - **Scroll Reading Progress Bar**: Smooth progress indicator tracking reading depth on the sticky header.
  - **High-Performance Image Delivery**: High-fidelity WebP illustrations with responsive dimensions, pre-triggered reveal transitions, and priority loading.

---

## Project Structure

```
aariz-proto/
├── public/                 # Static assets served as-is (SVG icons, robots.txt, sitemap.xml)
│   ├── img/                # Architectural ornament SVGs (orbit, squiggle)
│   ├── og-image.svg        # Social sharing OpenGraph card
│   ├── robots.txt          # Search engine crawler instructions
│   └── sitemap.xml         # XML sitemap for SEO
├── src/
│   ├── assets/             # Optimized WebP illustrations & artwork
│   ├── components/         # Modular React components
│   │   ├── ArrowGlyph.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── Contact.tsx
│   │   ├── Currently.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── EssayModal.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Pathways.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ProjectSimulators.tsx
│   │   ├── Projects.tsx
│   │   ├── ReadingShelf.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── Reveal.tsx
│   │   ├── Timeline.tsx
│   │   ├── Toast.tsx
│   │   └── Writing.tsx
│   ├── data/
│   │   └── portfolioData.ts # Single source of truth for all portfolio content
│   ├── styles/
│   │   ├── main.css        # Layout, components, typography & responsiveness
│   │   └── theme.css       # Color tokens, typography families & design system variables
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces and models
│   ├── App.tsx             # Root application orchestrator with lazy modal loading
│   └── main.tsx            # React DOM mounting & ErrorBoundary wrapping
├── index.html              # HTML entry point with instant app shell
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # Strict TypeScript configuration
├── vercel.json             # Vercel deployment routing & caching headers
└── vite.config.ts          # Vite build pipeline
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/aarizshadman/My-Proto.git
cd My-Proto

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Deployment

The project is preconfigured for [Vercel](https://vercel.com/) via [`vercel.json`](./vercel.json) with SPA rewrites, static caching headers, and security policies.

---

## License

MIT © [Aariz Shadman](https://github.com/aarizshadman)
