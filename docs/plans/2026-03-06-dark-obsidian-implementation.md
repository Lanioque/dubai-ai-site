# Dark Obsidian Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the website from a navy+gold theme to a premium "Dark Obsidian" aesthetic with near-black backgrounds, electric blue accent, refined typography, and polished animations.

**Architecture:** Single-file SPA rewrite of App.jsx, plus updates to index.css and tailwind.config.js. No new files needed. All existing data arrays preserved, visual presentation completely reworked.

**Tech Stack:** React + Vite, Tailwind CSS, HeroUI (Navbar/Button only), Framer Motion

---

### Task 1: Update Global Config Files

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

**Step 1: Rewrite tailwind.config.js**

Replace entire file with:

```js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base:      "#09090B",
        surface:   "#111113",
        elevated:  "#18181B",
        "b-subtle":"#27272A",
        "b-hover": "#3F3F46",
        "t-primary":  "#FAFAFA",
        "t-secondary":"#A1A1AA",
        "t-tertiary": "#71717A",
        accent:    "#3B82F6",
        "accent-glow":"#60A5FA",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "mesh-drift": {
          "0%":   { transform: "translate(0, 0) scale(1)" },
          "33%":  { transform: "translate(30px, -50px) scale(1.1)" },
          "66%":  { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "mesh-drift-2": {
          "0%":   { transform: "translate(0, 0) scale(1)" },
          "33%":  { transform: "translate(-40px, 30px) scale(1.15)" },
          "66%":  { transform: "translate(25px, -35px) scale(0.95)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
      },
      animation: {
        marquee:      "marquee 45s linear infinite",
        "mesh-1":     "mesh-drift 20s ease-in-out infinite",
        "mesh-2":     "mesh-drift-2 25s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary:   { DEFAULT: "#3B82F6", foreground: "#FFFFFF" },
            secondary: { DEFAULT: "#60A5FA", foreground: "#FFFFFF" },
          },
        },
      },
    }),
  ],
};
```

**Step 2: Rewrite src/index.css**

Replace entire file with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background-color: #09090B;
    color: #FAFAFA;
    overflow-x: hidden;
  }
}

@layer utilities {
  .text-gradient-accent {
    background: linear-gradient(135deg, #FAFAFA 30%, #60A5FA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glow-accent {
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.20), 0 0 100px rgba(59, 130, 246, 0.05);
  }
  .noise-overlay {
    position: relative;
  }
  .noise-overlay::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
  }
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #09090B; }
::-webkit-scrollbar-thumb { background: #27272A; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3B82F6; }
```

**Step 3: Update index.html**

Remove the Space Grotesk font import — only keep Inter:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
```

**Step 4: Commit**

```bash
git add tailwind.config.js src/index.css index.html
git commit -m "chore: update config for Dark Obsidian theme"
```

---

### Task 2: Rewrite Theme Constants, Utility Components & Data Arrays

**Files:**
- Modify: `src/App.jsx` (lines 1-199)

**Step 1: Replace the imports, theme object, NeuralCanvas, Reveal, Counter, SectionLabel, and all data arrays**

Replace lines 1-199 of App.jsx with:

```jsx
import { useEffect, useRef, useState } from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
  Button,
} from "@heroui/react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   THEME
────────────────────────────────────────────────────────── */
const C = {
  base:      "#09090B",
  surface:   "#111113",
  elevated:  "#18181B",
  border:    "#27272A",
  borderHov: "#3F3F46",
  text1:     "#FAFAFA",
  text2:     "#A1A1AA",
  text3:     "#71717A",
  accent:    "#3B82F6",
  accentGlow:"#60A5FA",
};

/* ──────────────────────────────────────────────────────────
   REVEAL ANIMATION
────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANIMATED COUNTER
────────────────────────────────────────────────────────── */
function Counter({ value, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, start = performance.now();
    const tick = (ts) => {
      const p = Math.min((ts - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ──────────────────────────────────────────────────────────
   SECTION LABEL
────────────────────────────────────────────────────────── */
function SectionLabel({ children, center = false }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${center ? "justify-center" : ""}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      <span className="text-t-tertiary text-[0.75rem] font-medium tracking-[0.05em] uppercase">{children}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Document AI & Smart OCR",
    desc: "Automatically extract, classify, and validate data from any document — purchase orders, invoices, contracts, KYC forms. 95%+ accuracy, Arabic & English, any format.",
    tags: ["OCR Engine", "Data Extraction", "Auto-Validation", "Arabic Support"],
    featured: true,
  },
  {
    num: "02",
    title: "AI Workflow Automation",
    desc: "Integrate intelligent automation directly into your SAP, Oracle, or Microsoft 365 environment. No rip-and-replace — we make your existing systems exponentially smarter.",
    tags: ["SAP Integration", "M365 AI", "RPA + AI", "Real-time Alerts"],
  },
  {
    num: "03",
    title: "Digital Transformation Advisory",
    desc: "Strategy-to-execution consulting for GCC enterprises. We audit your operations, build your AI roadmap, select the right vendors, and guide implementation from A to Z.",
    tags: ["AI Roadmap", "Process Audit", "Change Management", "ROI Modeling"],
  },
];

const WHY_US = [
  { num: "01", title: "Mixed Business + Technical Profile",  desc: "We speak CFO and CTO in the same meeting. Our team bridges the gap between technical capability and business ROI — no translation needed." },
  { num: "02", title: "Deeply Rooted in Dubai & the GCC",   desc: "Local entity, local team, local network. We understand the region's business culture, procurement cycles, and decision-making dynamics." },
  { num: "03", title: "POC-First. Results Before Contract.", desc: "30-day proof of concept on your real data, at reduced or zero cost. You see measurable results before signing anything." },
  { num: "04", title: "Credible Traction from Day One",      desc: "We're already in active discussions with regional references. We accelerate from existing relationships and proven use cases." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call",    desc: "30 minutes to map your biggest operational pain point and identify the highest-ROI automation opportunity." },
  { num: "02", title: "POC Design",        desc: "We design a targeted proof of concept scoped around your actual data. Clear deliverables, clear success metrics." },
  { num: "03", title: "30-Day Deployment", desc: "We build and deploy. Live results on your real workflows — measurable impact, zero disruption to your teams." },
  { num: "04", title: "Scale & Expand",    desc: "We productionize, integrate fully, and roll out to other departments. Ongoing support and optimization included." },
];

const INDUSTRIES = [
  { title: "Conglomerates",        names: "Al Futtaim · MAF · Emaar" },
  { title: "Quasi-Government",     names: "DP World · DEWA · RTA" },
  { title: "Banking & Finance",     names: "Emirates NBD · FAB · Mashreq" },
  { title: "Aviation & Logistics",  names: "Emirates · Etihad · DP World" },
  { title: "Healthcare",            names: "Aster DM · Pure Health" },
  { title: "Real Estate",           names: "Aldar · Nakheel · Meraas" },
  { title: "Energy & Utilities",    names: "ENOC · DEWA · ADNOC" },
  { title: "Retail & Luxury",       names: "Chalhoub · AW Rostamani" },
];

const MARQUEE_ITEMS = [
  "Al Futtaim Group","Majid Al Futtaim","DP World","Emirates NBD","DEWA",
  "Emaar Properties","Etihad Airways","Pure Health","Chalhoub Group","ENOC","FAB","Aldar Properties",
];

const NAV_LINKS = ["Services","Use Cases","Process","Industries"];
```

Note what changed:
- Removed `Card`, `CardBody`, `CardHeader`, `Chip`, `Divider`, `Progress` imports (no longer needed)
- Removed `NeuralCanvas` entirely
- New theme object with obsidian palette
- `SectionLabel` uses accent dot instead of gold line
- Data arrays simplified: removed emoji icons, colors, `time` fields; added `featured` flag on first service
- `Reveal` uses a refined easing curve

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: replace theme, utility components, and data arrays for Dark Obsidian"
```

---

### Task 3: Rewrite the App Component — Nav + Hero + Marquee + Stats

**Files:**
- Modify: `src/App.jsx` — replace the `App` component's opening through the Stats section

**Step 1: Replace from `export default function App()` through the end of the Stats section**

Replace the App component opening, Nav, Hero, Marquee, and Stats sections with:

```jsx
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-base text-t-primary overflow-x-hidden noise-overlay">

      {/* ══════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════ */}
      <Navbar
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        className={`transition-all duration-300 fixed top-0 z-50 ${
          scrolled
            ? "bg-base/80 backdrop-blur-xl border-b border-b-subtle"
            : "bg-transparent"
        }`}
        maxWidth="xl"
      >
        <NavbarContent>
          <NavbarMenuToggle className="sm:hidden text-t-primary" />
          <NavbarBrand>
            <span className="font-bold text-lg text-t-primary tracking-tight">
              [YOUR COMPANY]
            </span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {NAV_LINKS.map((l) => (
            <NavbarItem key={l}>
              <a href={`#${l.toLowerCase().replace(" ", "-")}`}
                className="text-t-tertiary hover:text-t-primary text-sm font-medium transition-colors duration-200">
                {l}
              </a>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button as="a" href="mailto:alexandre.arnaud@mho.ae"
              className="bg-accent text-white font-semibold text-sm"
              radius="md" size="sm">
              Book a Call
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-base/95 backdrop-blur-xl pt-6">
          {NAV_LINKS.map((l) => (
            <NavbarMenuItem key={l}>
              <a href={`#${l.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMenuOpen(false)}
                className="text-t-secondary hover:text-t-primary text-lg font-medium py-2 block transition-colors">
                {l}
              </a>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <a href="mailto:alexandre.arnaud@mho.ae"
              className="text-accent font-semibold text-lg py-2 block">
              Book a Call →
            </a>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/[0.07] blur-[120px] animate-mesh-1" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-glow/[0.04] blur-[100px] animate-mesh-2" />
        </div>

        {/* Radial glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.06] blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-t-secondary text-xs font-medium tracking-wide">AI Solutions for GCC Enterprises</span>
            </motion.div>

            <h1 className="text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-[-0.035em] mb-6">
              Your Enterprise.{" "}
              <span className="text-gradient-accent">Powered by AI.</span>
            </h1>

            <p className="text-t-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              We build custom AI solutions for the Gulf's largest organizations —
              cutting costs, eliminating manual processes, and delivering results in 30 days.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                as="a" href="mailto:alexandre.arnaud@mho.ae"
                size="lg"
                className="bg-accent text-white font-semibold px-8 text-[0.95rem] glow-accent"
              >
                Schedule a Free POC
              </Button>
              <Button
                as="a" href="#services" size="lg"
                variant="bordered"
                className="border-b-subtle text-t-secondary hover:border-accent hover:text-t-primary text-[0.95rem] transition-colors"
              >
                Explore Solutions
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-b-subtle flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-t-tertiary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════════════ */}
      <div className="border-t border-b-subtle py-6 overflow-hidden select-none">
        <Reveal>
          <div className="text-center mb-4">
            <span className="text-t-tertiary text-[0.7rem] font-medium tracking-[0.1em] uppercase">Trusted by leading GCC enterprises</span>
          </div>
        </Reveal>
        <div className="flex gap-16 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-t-tertiary/50 hover:text-t-secondary text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-colors duration-300 cursor-default flex items-center gap-4">
              <span className="text-[5px] text-b-subtle">●</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { val: 320, suffix: "B$",  label: "Projected AI impact on MENA GDP by 2030" },
              { val: 85,  suffix: "%",   label: "GCC enterprises planning AI investments in 2025" },
              { val: 30,  suffix: "",    label: "Days to first measurable results with our POC" },
              { val: 1,   prefix: "#",   label: "Dubai ranked top smart city in the Middle East" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`text-center py-8 ${i < 3 ? "lg:border-r lg:border-b-subtle" : ""}`}>
                  <div className="text-[3rem] font-bold text-t-primary leading-none tracking-tight mb-3">
                    <Counter value={s.val} suffix={s.suffix} prefix={s.prefix || ""} />
                  </div>
                  <div className="text-[0.7rem] text-t-tertiary tracking-[0.03em] uppercase leading-snug max-w-[160px] mx-auto">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite Nav, Hero, Marquee, Stats with Dark Obsidian design"
```

---

### Task 4: Rewrite the Problem Section

**Files:**
- Modify: `src/App.jsx` — replace the Problem section

**Step 1: Replace the Problem section with:**

```jsx
      {/* ══════════════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="problem">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold leading-tight tracking-[-0.025em] mb-10 max-w-2xl">
              Manual processes are costing GCC enterprises millions.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {[
                { num: "73%", desc: "of documents still processed manually across GCC enterprises" },
                { num: "5-7 days", desc: "average approval cycle for routine procurement" },
                { num: "30%", desc: "of operational time absorbed by low-value manual tasks" },
              ].map((s, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-[2rem] font-bold text-t-primary tracking-tight mb-1">{s.num}</div>
                  <div className="text-sm text-t-secondary leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-surface border border-b-subtle rounded-2xl p-8 sm:p-10 border-l-4 border-l-accent">
              <div className="text-[3.5rem] sm:text-[4rem] font-bold text-t-primary tracking-tight leading-none mb-3">
                $1.5M+
              </div>
              <p className="text-t-secondary text-lg leading-relaxed max-w-lg">
                Average annual loss per large enterprise via manual, inefficient processes.
                Our clients recover 500K–2M AED/year by automating just 3 core workflows.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite Problem section with minimal stat layout"
```

---

### Task 5: Rewrite the Services Section (Bento Grid)

**Files:**
- Modify: `src/App.jsx` — replace the Services section

**Step 1: Replace the Services section with:**

```jsx
      {/* ══════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="services">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-4 max-w-xl">
              Three capabilities, one integrated platform.
            </h2>
            <p className="text-t-secondary text-lg max-w-lg">
              From day-one document automation to long-term strategic transformation —
              we cover the full AI journey.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.1} className={svc.featured ? "md:row-span-2" : ""}>
                <motion.div
                  whileHover={{ borderColor: C.borderHov }}
                  className={`h-full bg-surface border border-b-subtle rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_60px_rgba(59,130,246,0.04)] ${svc.featured ? "flex flex-col justify-between" : ""}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-accent text-sm font-semibold">{svc.num}</span>
                      <div className="h-px flex-1 bg-b-subtle" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.015em] mb-3">{svc.title}</h3>
                    <p className="text-t-secondary text-[0.95rem] leading-relaxed mb-6">{svc.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-md bg-elevated text-t-tertiary text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite Services as bento grid layout"
```

---

### Task 6: Rewrite Use Case Section

**Files:**
- Modify: `src/App.jsx` — replace the Use Case section

**Step 1: Replace the Use Case section with:**

```jsx
      {/* ══════════════════════════════════════════════════
          USE CASE
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="use-cases">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Use Case</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight max-w-xl">
              From 100% manual to fully automated — in 6 weeks.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-surface border border-b-subtle rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Narrative */}
                <div className="p-8 sm:p-10 lg:border-r lg:border-b-subtle">
                  <p className="text-t-secondary text-[0.95rem] leading-relaxed mb-6">
                    A major regional conglomerate processed hundreds of POs and supplier invoices manually each month.
                    Frequent errors, 5–7 day approval delays, zero real-time visibility for the finance team.
                  </p>
                  <p className="text-t-secondary text-[0.95rem] leading-relaxed mb-6">
                    We deployed an AI-powered procurement dashboard with integrated OCR engine — automatic data extraction, intelligent validation rules, instant approval workflows, live spend analytics.
                  </p>
                  <p className="text-t-primary text-[0.95rem] leading-relaxed font-medium">
                    Finance team now processes 3x the volume with the same headcount. Approval time dropped from days to under 2 hours.
                  </p>
                </div>

                {/* Metrics */}
                <div className="p-8 sm:p-10 flex flex-col">
                  {[
                    { val: "−80%",     label: "Reduction in document processing time" },
                    { val: "95%+",     label: "OCR extraction accuracy" },
                    { val: "6 weeks",  label: "From kickoff to full production" },
                    { val: "500K AED", label: "Estimated annual savings (Year 1)" },
                  ].map((m, i) => (
                    <div key={i} className={`flex items-start gap-4 py-5 ${i > 0 ? "border-t border-b-subtle" : ""}`}>
                      <div className="w-1 h-full min-h-[40px] bg-accent/30 rounded-full flex-shrink-0" />
                      <div>
                        <div className="text-[1.75rem] font-bold text-t-primary tracking-tight leading-none mb-1">{m.val}</div>
                        <div className="text-sm text-t-tertiary">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite Use Case with split card layout"
```

---

### Task 7: Rewrite Why Us + Process Sections

**Files:**
- Modify: `src/App.jsx` — replace Why Us and Process sections

**Step 1: Replace Why Us and Process with:**

```jsx
      {/* ══════════════════════════════════════════════════
          WHY US
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="whyus">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-4 max-w-lg">
              We're not a typical IT vendor.
            </h2>
            <p className="text-t-secondary text-lg max-w-lg">
              A Dubai-based team combining deep technical expertise with enterprise business acumen.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHY_US.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ borderColor: C.borderHov }}
                  className="bg-surface border border-b-subtle rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_60px_rgba(59,130,246,0.04)] h-full"
                >
                  <span className="text-accent text-sm font-semibold mb-4 block">{w.num}</span>
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] mb-3">{w.title}</h3>
                  <p className="text-t-secondary text-sm leading-relaxed">{w.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="process">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-lg mx-auto mb-16">
            <SectionLabel center>How We Work</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em]">
              From first call to full ROI in 90 days.
            </h2>
          </Reveal>

          {/* Horizontal stepper — desktop */}
          <div className="hidden lg:block mb-16">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-3 left-0 right-0 h-px bg-b-subtle" />

              <div className="grid grid-cols-4 gap-8">
                {PROCESS_STEPS.map((step, i) => (
                  <Reveal key={i} delay={i * 0.15}>
                    <div className="relative">
                      {/* Node */}
                      <div className="w-6 h-6 rounded-full bg-base border-2 border-accent flex items-center justify-center mb-6 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <h4 className="font-semibold text-[1rem] mb-2">{step.title}</h4>
                      <p className="text-t-secondary text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical stepper — mobile */}
          <div className="lg:hidden mb-16">
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-3 w-px bg-b-subtle" />

              <div className="flex flex-col gap-10">
                {PROCESS_STEPS.map((step, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-base border-2 border-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <h4 className="font-semibold text-[1rem] mb-2">{step.title}</h4>
                      <p className="text-t-secondary text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="text-center">
            <Button as="a" href="mailto:alexandre.arnaud@mho.ae"
              size="lg"
              className="bg-accent text-white font-semibold px-8 glow-accent">
              Start with a 30-day proof of concept
            </Button>
          </Reveal>
        </div>
      </section>
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite Why Us with numbered grid and Process with stepper"
```

---

### Task 8: Rewrite Industries + CTA + Footer (and Remove FAB)

**Files:**
- Modify: `src/App.jsx` — replace Industries, CTA, Footer, FAB, and closing tags

**Step 1: Replace from Industries section through end of file with:**

```jsx
      {/* ══════════════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="industries">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Industries</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight">
              Built for the GCC's most complex organizations.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -2, borderColor: C.borderHov }}
                  className="bg-surface border border-b-subtle rounded-xl p-5 transition-all duration-300 cursor-default"
                >
                  <h4 className="font-medium text-sm text-t-primary mb-1.5">{ind.title}</h4>
                  <p className="text-t-tertiary text-xs leading-relaxed">{ind.names}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/[0.06] blur-[150px] rounded-full pointer-events-none" />

        <div className="bg-surface border border-b-subtle rounded-3xl max-w-5xl mx-auto relative z-10">
          <div className="py-20 px-6 text-center">
            <Reveal>
              <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-5">
                Ready to transform your operations?
              </h2>
              <p className="text-t-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                No commitment. No lengthy proposals. Just 30 minutes to identify your
                biggest automation opportunity — then we prove it works.
              </p>
              <Button as="a" href="mailto:alexandre.arnaud@mho.ae" size="lg"
                className="bg-accent text-white font-semibold px-10 text-[1rem] glow-accent">
                Book a Discovery Call
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="border-t border-b-subtle px-6 py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-bold text-lg mb-3 text-t-primary">[YOUR COMPANY]</p>
            <p className="text-t-tertiary text-sm leading-relaxed max-w-xs">
              Enterprise AI & IT solutions for the Gulf's most ambitious organizations.
              Based in Dubai, operating across the GCC.
            </p>
          </div>

          <div>
            <h5 className="text-t-tertiary text-xs font-medium uppercase tracking-[0.08em] mb-4">Navigation</h5>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                className="block text-t-tertiary text-sm mb-2.5 hover:text-t-secondary transition-colors">
                {l}
              </a>
            ))}
          </div>

          <div>
            <h5 className="text-t-tertiary text-xs font-medium uppercase tracking-[0.08em] mb-4">Contact</h5>
            <a href="mailto:alexandre.arnaud@mho.ae"
              className="text-t-tertiary text-sm hover:text-t-secondary block mb-2 transition-colors">
              alexandre.arnaud@mho.ae
            </a>
            <p className="text-t-tertiary text-sm">Dubai, UAE</p>
          </div>
        </div>

        <div className="border-t border-b-subtle pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-t-tertiary text-xs">
          <span>&copy; 2026 [Your Company]. All rights reserved.</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>

    </div>
  );
}
```

Note: The floating action button is completely removed.

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite Industries, CTA, Footer; remove floating action button"
```

---

### Task 9: Visual QA & Polish

**Step 1: Run dev server**

```bash
npm run dev
```

**Step 2: Review each section visually and fix any issues**

Check for:
- Tailwind class conflicts (especially border colors — `border-b-subtle` may conflict with `border-b` which means border-bottom)
- Spacing inconsistencies
- Mobile responsiveness (test at 375px, 768px, 1024px, 1440px widths)
- Animation timing — ensure staggered reveals feel smooth
- Color consistency — no leftover gold/navy references

**Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: visual QA and polish pass"
```

---

### Summary

| Task | Description | Estimated Changes |
|------|-------------|-------------------|
| 1 | Config files (Tailwind, CSS, HTML) | 3 files |
| 2 | Theme, utility components, data arrays | Top of App.jsx |
| 3 | Nav + Hero + Marquee + Stats | Main App body start |
| 4 | Problem section | ~30 lines |
| 5 | Services bento grid | ~40 lines |
| 6 | Use Case section | ~50 lines |
| 7 | Why Us + Process sections | ~80 lines |
| 8 | Industries + CTA + Footer | ~70 lines |
| 9 | Visual QA pass | Varies |
