import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   3D ASSET COMPONENT
────────────────────────────────────────────────────────── */
function Floating3DAsset({ src, alt, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${className} cursor-pointer z-10`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain drop-shadow-2xl transition-all duration-300"
          style={{ filter: "grayscale(1) sepia(1) hue-rotate(175deg) saturate(5) brightness(1.1) opacity(0.9)" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   THEME
────────────────────────────────────────────────────────── */
const C = {
  base: "#09090B",
  surface: "#111113",
  elevated: "#18181B",
  border: "#27272A",
  borderHov: "#3F3F46",
  text1: "#FAFAFA",
  text2: "#A1A1AA",
  text3: "#71717A",
  accent: "#3B82F6",
  accentGlow: "#60A5FA",
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
    title: "Artificial Intelligence",
    desc: "Custom AI solutions built for your workflows — intelligent document processing, predictive analytics, and AI-powered decision automation.",
    asset: "https://framerusercontent.com/images/kqfXy2DSH4ezWAxlYJmCnBco.png?scale-down-to=1024",
    col: "md:col-span-1",
    layout: "vertical",
  },
  {
    num: "02",
    title: "DevOps & Cloud",
    desc: "End-to-end DevOps pipelines, CI/CD automation, and cloud infrastructure on AWS, Azure, or GCP. We accelerate your delivery cycles without disrupting your existing teams.",
    asset: "https://framerusercontent.com/images/vB2MtWwZpfQllMWCRyLNFppKWyw.png?scale-down-to=2048",
    col: "md:col-span-2",
    layout: "horizontal",
  },
  {
    num: "03",
    title: "MLOps & Model Deployment",
    desc: "We operationalize your AI models — from experimentation to production. Model monitoring, retraining pipelines, versioning, and scalable serving infrastructure.",
    asset: "https://framerusercontent.com/images/xzqytNjMR8W7ZxcYvm5hRGTNWw.png?scale-down-to=1024",
    col: "md:col-span-2",
    layout: "horizontal",
  },
  {
    num: "04",
    title: "IT Strategy",
    desc: "Technology advisory and managed IT for GCC enterprises. We audit your stack, align your IT roadmap with business goals, and provide ongoing support.",
    asset: "https://framerusercontent.com/images/mVL46B6gqgVAy2ekLtccgvaaWU.png?scale-down-to=1024",
    col: "md:col-span-1",
    layout: "vertical",
  },
];



const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call", desc: "A focused conversation to understand your operations, technology stack, and the highest-impact opportunities." },
  { num: "02", title: "Scoped POC", desc: "We design a targeted proof of concept on your actual data and environment. Clear deliverables, clear success criteria." },
  { num: "03", title: "Rapid Deployment", desc: "We build and ship fast. Live results on your real workflows with zero disruption to your teams." },
  { num: "04", title: "Scale & Operate", desc: "We productionize, integrate, and support. Ongoing optimization included — we remain your technology partner." },
];

const INDUSTRIES = [
  { title: "Conglomerates", names: "Al Futtaim · MAF · Emaar" },
  { title: "Quasi-Government", names: "DP World · DEWA · RTA" },
  { title: "Banking & Finance", names: "Emirates NBD · FAB · Mashreq" },
  { title: "Aviation & Logistics", names: "Emirates · Etihad · DP World" },
  { title: "Healthcare", names: "Aster DM · Pure Health" },
  { title: "Real Estate", names: "Aldar · Nakheel · Meraas" },
  { title: "Energy & Utilities", names: "ENOC · DEWA · ADNOC" },
  { title: "Retail & Luxury", names: "Chalhoub · AW Rostamani" },
];

const MARQUEE_ITEMS = [
  "Al Futtaim Group", "Majid Al Futtaim", "DP World", "Emirates NBD", "DEWA",
  "Emaar Properties", "Etihad Airways", "Pure Health", "Chalhoub Group", "ENOC", "FAB", "Aldar Properties",
];

const NAV_LINKS = ["Services", "Use Cases", "Process", "Industries"];

/* ──────────────────────────────────────────────────────────
   APP
────────────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────
   3D CARD HOOK
────────────────────────────────────────────────────────── */
function use3DTilt() {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [14, -14]), { stiffness: 280, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-14, 14]), { stiffness: 280, damping: 30 });
  const shineX = useTransform(rawX, [-0.5, 0.5], ["120%", "-20%"]);
  const shineY = useTransform(rawY, [-0.5, 0.5], ["120%", "-20%"]);

  const onMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, shineX, shineY, onMove, onLeave };
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tilt = use3DTilt();

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-base/80 backdrop-blur-xl border-b border-b-subtle" : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Brand */}
          <a href="#hero" className="flex items-center gap-2 font-bold text-xl tracking-tight text-t-primary select-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-7 h-7">
              <g strokeLinejoin="round" strokeWidth="1">
                {/* Bottom Layer (Dark Blue) */}
                <g>
                  <path d="M 50,46 L 90,66 L 50,86 L 10,66 Z" fill="#1e40af" stroke="#1e40af" />
                  <path d="M 10,66 L 50,86 L 50,94 L 10,74 Z" fill="#1e3a8a" stroke="#1e3a8a" />
                  <path d="M 50,86 L 90,66 L 90,74 L 50,94 Z" fill="#172554" stroke="#172554" />
                </g>
                {/* Middle Layer (Medium Blue) */}
                <g>
                  <path d="M 50,28 L 90,48 L 50,68 L 10,48 Z" fill="#3b82f6" stroke="#3b82f6" />
                  <path d="M 10,48 L 50,68 L 50,76 L 10,56 Z" fill="#2563eb" stroke="#2563eb" />
                  <path d="M 50,68 L 90,48 L 90,56 L 50,76 Z" fill="#1d4ed8" stroke="#1d4ed8" />
                </g>
                {/* Top Layer (White/Lightest Blue) */}
                <g>
                  <path d="M 50,10 L 90,30 L 50,50 L 10,30 Z" fill="#ffffff" stroke="#ffffff" />
                  <path d="M 10,30 L 50,50 L 50,58 L 10,38 Z" fill="#dbeafe" stroke="#dbeafe" />
                  <path d="M 50,50 L 90,30 L 90,38 L 50,58 Z" fill="#bfdbfe" stroke="#bfdbfe" />
                </g>
              </g>
            </svg>
            altis
          </a>

          {/* Desktop CTA */}
          <a
            href="mailto:alexandre.arnaud@mho.ae"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-t-secondary hover:text-t-primary transition-colors duration-200 group"
          >
            Book a Discovery Call
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8 text-t-secondary"
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-current origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }}
              className="block w-5 h-px bg-current" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-current origin-center" />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="sm:hidden bg-base/95 backdrop-blur-xl border-b border-b-subtle"
            >
              <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-t-secondary hover:text-t-primary text-sm font-medium py-1 transition-colors">
                    {l}
                  </a>
                ))}
                <a href="mailto:alexandre.arnaud@mho.ae" onClick={() => setMenuOpen(false)}
                  className="text-accent text-sm font-semibold pt-3 border-t border-b-subtle mt-1 inline-flex items-center gap-1.5">
                  Book a Discovery Call →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════════════════════════
      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden" id="hero">

        {/* ── Video Background ── */}
        <div className="absolute inset-0 w-full h-full bg-accent/20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 grayscale mix-blend-screen"
            src="https://framerusercontent.com/assets/1g8IkhtJmlWcC4zEYWKUmeGWzI.mp4"
          />
          <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
          {/* Top/bottom gradient fades to blend with the rest of the page */}
          <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-transparent to-base" />
        </div>

        {/* ── Centered Content ── */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center"
          >
            {/* Pill label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[0.65rem] font-medium tracking-[0.1em] text-t-secondary uppercase">
                New Gen AI Automation Partner
              </span>
            </motion.div>

            {/* Prominent 3D Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] mx-auto relative z-10">
                  <g strokeLinejoin="round" strokeWidth="1">
                    {/* Bottom Layer (Dark Blue) */}
                    <g>
                      <path d="M 50,46 L 90,66 L 50,86 L 10,66 Z" fill="#1e40af" stroke="#1e40af" />
                      <path d="M 10,66 L 50,86 L 50,94 L 10,74 Z" fill="#1e3a8a" stroke="#1e3a8a" />
                      <path d="M 50,86 L 90,66 L 90,74 L 50,94 Z" fill="#172554" stroke="#172554" />
                    </g>
                    {/* Middle Layer (Medium Blue) */}
                    <g>
                      <path d="M 50,28 L 90,48 L 50,68 L 10,48 Z" fill="#3b82f6" stroke="#3b82f6" />
                      <path d="M 10,48 L 50,68 L 50,76 L 10,56 Z" fill="#2563eb" stroke="#2563eb" />
                      <path d="M 50,68 L 90,48 L 90,56 L 50,76 Z" fill="#1d4ed8" stroke="#1d4ed8" />
                    </g>
                    {/* Top Layer (White/Lightest Blue) */}
                    <g>
                      <path d="M 50,10 L 90,30 L 50,50 L 10,30 Z" fill="#ffffff" stroke="#ffffff" />
                      <path d="M 10,30 L 50,50 L 50,58 L 10,38 Z" fill="#dbeafe" stroke="#dbeafe" />
                      <path d="M 50,50 L 90,30 L 90,38 L 50,58 Z" fill="#bfdbfe" stroke="#bfdbfe" />
                    </g>
                  </g>
                </svg>
                {/* Glow behind the logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/40 blur-[60px] rounded-full pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.04em] mb-6 text-t-primary">
              Automate Smarter.<br /> Grow Faster.{" "}
              <em className="font-serif italic font-normal text-t-secondary">With AI.</em>
            </h1>

            {/* Subtext */}
            <p className="text-t-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              AI, DevOps, MLOps, and managed IT — built for Gulf enterprises that need speed, reliability, and modern automation made simple.
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-4 flex-wrap w-full">
              <a
                href="mailto:alexandre.arnaud@mho.ae"
                className="group relative inline-flex items-center justify-center gap-2 bg-white text-base hover:bg-white/90 font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] animate-shimmer" />
                <span className="relative z-10 text-base">Book A Free Call</span>
                <svg className="w-4 h-4 ml-1 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ══════════════
          MARQUEE
      ══════════════ */}
      <div className="border-t border-b-subtle py-6 overflow-hidden select-none">
        <Reveal>
          <div className="text-center mb-4">
            <span className="text-t-tertiary text-[0.7rem] font-medium tracking-[0.1em] uppercase">
              Trusted by leading GCC enterprises
            </span>
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
          CONTEXT BAND (replaces Stats)
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-b-subtle rounded-2xl overflow-hidden border border-b-subtle">
            {[
              { label: "The Gulf's fastest-growing AI market", sub: "GCC · 2025" },
              { label: "Most enterprises still run on legacy processes", sub: "The opportunity" },
              { label: "From discovery to live system in weeks", sub: "Our pace" },
              { label: "Dubai — a global hub for AI adoption", sub: "Our base" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-base text-center py-10 px-6 h-full flex flex-col items-center justify-center gap-2">
                  <div className="text-t-primary text-sm font-medium leading-snug max-w-[160px] text-center">{s.label}</div>
                  <div className="text-t-tertiary text-[0.7rem] uppercase tracking-widest">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════
          PROBLEM
      ══════════════ */}
      <section className="relative py-20 px-6 overflow-hidden" id="problem">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold leading-tight tracking-[-0.025em] mb-10 max-w-2xl">
              Legacy systems and slow delivery are costing GCC enterprises their edge.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { asset: "https://framerusercontent.com/images/lwzl05NderimTGi1g65hAh1YM.png?scale-down-to=1024", label: "Manual processes", desc: "Critical workflows still routed by email, documents processed by hand, no real-time visibility." },
                { asset: "https://framerusercontent.com/images/rL9aXUROkOnl8jVFOpmyBGPLv8.png?scale-down-to=1024", label: "Slow delivery", desc: "Long cycles and fragile infra prevent teams from shipping improvements quickly." },
                { asset: "https://framerusercontent.com/images/tGMNowtpfbH8patPUsQxfCFlIU.png?scale-down-to=1024", label: "AI without strategy", desc: "Companies experiment with AI in isolation, no plan to scale or embed it into real operations." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  style={{ perspective: "800px", transformStyle: "preserve-3d" }}
                  className="relative h-full min-h-[380px] bg-surface border border-b-subtle rounded-2xl p-8 flex flex-col justify-end cursor-default transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

                  <div className="absolute top-[-5%] md:top-[-10%] left-1/2 -translate-x-1/2 w-[240px] pointer-events-none scale-100 group-hover:scale-110 transition-transform duration-700">
                    <Floating3DAsset src={s.asset} alt={s.label} className="w-full h-full" />
                  </div>

                  <div className="relative z-10 mt-32">
                    <div className="text-t-primary font-semibold text-lg mb-3 drop-shadow-md">{s.label}</div>
                    <div className="text-[0.95rem] text-t-secondary leading-relaxed drop-shadow-sm">{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden border border-b-subtle">
              {/* Unsplash: dark enterprise office */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=75&auto=format&fit=crop')", opacity: 0.12 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/60" />
              <div className="relative z-10 p-8 sm:p-10">
                <div className="text-t-primary text-xl font-semibold mb-3">
                  The cost of inaction compounds every quarter.
                </div>
                <p className="text-t-secondary text-lg leading-relaxed max-w-2xl">
                  While competitors modernize, organizations stuck on manual processes and fragmented IT lose speed, talent, and market share.
                  The window to act is now — and we make it fast.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════
          SERVICES
      ══════════════ */}
      <section className="relative py-20 px-6 overflow-hidden" id="services">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <div className="text-left">
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-4 max-w-xl">
                AI · DevOps · MLOps · IT — end to end.
              </h2>
              <p className="text-t-secondary text-lg max-w-lg">
                Four integrated capabilities. One team. Built for the demands of large GCC organizations.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4">
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.08} className={svc.col}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateX: -1.5, rotateY: 2 }}
                  style={{ perspective: "900px", transformStyle: "preserve-3d" }}
                  className="relative h-full min-h-[420px] md:min-h-[480px] bg-surface border border-b-subtle rounded-2xl p-8 cursor-default transition-all duration-300 hover:border-accent/40 hover:shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-end group"
                >
                  {/* Top shine */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

                  {svc.layout === 'horizontal' ? (
                    <div className="absolute top-[-10%] md:top-[10%] right-[-20%] md:right-[-10%] w-[380px] md:w-[480px] pointer-events-none opacity-80 md:opacity-100 scale-[1.1] md:scale-125 transition-transform duration-700 group-hover:scale-[1.2] md:group-hover:scale-[1.35]">
                      <Floating3DAsset src={svc.asset} alt={svc.title} className="w-full h-full" />
                    </div>
                  ) : (
                    <div className="absolute top-[-15%] md:top-[-20%] left-1/2 -translate-x-1/2 w-[300px] pointer-events-none scale-110 md:scale-125 transition-transform duration-700 group-hover:scale-125 md:group-hover:scale-150">
                      <Floating3DAsset src={svc.asset} alt={svc.title} className="w-full h-full" />
                    </div>
                  )}

                  <div className={`relative z-10 mt-48 md:mt-32 ${svc.layout === 'horizontal' ? 'md:w-[55%]' : ''}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-accent text-sm font-semibold">{svc.num}</span>
                      <div className="h-px flex-[0_0_40px] bg-b-subtle" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.015em] mb-3 drop-shadow-md text-t-primary">{svc.title}</h3>
                    <p className="text-t-secondary text-[0.95rem] leading-relaxed relative z-10">{svc.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════
          USE CASE
      ══════════════ */}
      <section className="py-20 px-6" id="use-cases">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Use Case</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight max-w-xl">
              From fragmented tooling to a fully automated operation.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-surface border border-b-subtle rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* 3D Visual side */}
                <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden flex items-center justify-center bg-b-subtle/30">
                  <Floating3DAsset
                    src="https://framerusercontent.com/images/vB2MtWwZpfQllMWCRyLNFppKWyw.png?scale-down-to=2048"
                    alt="Enterprise operations 3D Object"
                    className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/40 lg:from-transparent lg:to-surface/20 pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 backdrop-blur-sm text-accent text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Real deployment · GCC conglomerate
                    </div>
                  </div>
                </div>

                {/* Narrative + metrics */}
                <div>
                  <div className="p-8 sm:p-10 border-b border-b-subtle">
                    <p className="text-t-secondary text-[0.95rem] leading-relaxed mb-4">
                      A regional conglomerate was running critical procurement workflows manually — approvals routed by email, documents processed by hand, no real-time visibility for the finance team.
                    </p>
                    <p className="text-t-primary text-[0.95rem] leading-relaxed font-medium">
                      We deployed an AI-powered procurement layer integrated with their existing ERP — automated extraction, intelligent validation, instant approval routing.
                    </p>
                  </div>
                  <div className="p-8 sm:p-10 grid grid-cols-2 gap-4">
                    {[
                      { val: "Significantly faster", label: "Processing time" },
                      { val: "High accuracy", label: "AI extraction" },
                      { val: "Weeks, not months", label: "Kickoff to prod" },
                      { val: "Measurable savings", label: "Cost reduction" },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        className="bg-elevated border border-b-subtle rounded-xl p-4 cursor-default"
                      >
                        <div className="text-[1.1rem] font-bold text-t-primary leading-tight mb-1">{m.val}</div>
                        <div className="text-xs text-t-tertiary">{m.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>



      {/* ══════════════
          PROCESS
      ══════════════ */}
      <section className="relative py-20 px-6 overflow-hidden" id="process">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="flex-1 max-w-lg text-left">
                <SectionLabel>How We Work</SectionLabel>
                <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight">
                  From first call to live system — fast.
                </h2>
              </div>
              <Floating3DAsset
                src="https://framerusercontent.com/images/NiVn6Asi8d1V7EYj1Nz9jecbaJI.png?scale-down-to=1024"
                alt="Abstract 3D Shape"
                className="relative w-[160px] h-[160px] md:w-[240px] md:h-[240px] shrink-0"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.04, rotateY: 3, rotateX: -2 }}
                  style={{ perspective: "700px", transformStyle: "preserve-3d" }}
                  className="relative bg-surface border border-b-subtle rounded-2xl p-6 cursor-default h-full hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {/* Step number */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 font-bold text-sm"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", color: "#3B82F6" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="font-semibold text-[1rem] mb-2 text-t-primary">{step.title}</h4>
                  <p className="text-t-secondary text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <a
              href="mailto:alexandre.arnaud@mho.ae"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl glow-accent transition-all duration-200"
            >
              Start a conversation
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════
          INDUSTRIES
      ══════════════ */}
      <section className="py-20 px-6" id="industries">
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
                  whileHover={{ scale: 1.05, rotateY: 3, borderColor: "rgba(59,130,246,0.45)" }}
                  style={{ perspective: "600px", transformStyle: "preserve-3d" }}
                  className="relative bg-surface border border-b-subtle rounded-xl p-5 cursor-default hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <h4 className="font-semibold text-sm text-t-primary mb-1.5">{ind.title}</h4>
                  <p className="text-t-tertiary text-xs leading-relaxed">{ind.names}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════
          CTA
      ══════════════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-base/60 to-base/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/[0.07] blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          whileHover={{ scale: 1.005 }}
          className="relative z-10 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl max-w-5xl mx-auto overflow-hidden flex flex-col md:flex-row items-center"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* 3D Visual Left Side */}
          <div className="w-full md:w-1/3 flex justify-center py-10 md:py-0">
            <Floating3DAsset
              src="https://framerusercontent.com/images/mVL46B6gqgVAy2ekLtccgvaaWU.png?scale-down-to=1024"
              alt="Abstract CTA 3D icon"
              className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px]"
            />
          </div>

          <div className="w-full md:w-2/3 py-20 px-6 text-left border-l border-white/5">
            <Reveal>
              <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-5">
                Ready to modernize your operations?
              </h2>
              <p className="text-t-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                No lengthy RFPs. No bloated proposals. Just a direct conversation about where technology
                can give you an edge — and a fast path to proving it.
              </p>
              <a
                href="mailto:alexandre.arnaud@mho.ae"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-3.5 rounded-xl text-[1rem] glow-accent transition-all duration-200"
              >
                Book a Discovery Call
              </a>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="border-t border-b-subtle px-6 py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-8 h-8">
                <g strokeLinejoin="round" strokeWidth="1">
                  {/* Bottom Layer (Dark Blue) */}
                  <g>
                    <path d="M 50,46 L 90,66 L 50,86 L 10,66 Z" fill="#1e40af" stroke="#1e40af" />
                    <path d="M 10,66 L 50,86 L 50,94 L 10,74 Z" fill="#1e3a8a" stroke="#1e3a8a" />
                    <path d="M 50,86 L 90,66 L 90,74 L 50,94 Z" fill="#172554" stroke="#172554" />
                  </g>
                  {/* Middle Layer (Medium Blue) */}
                  <g>
                    <path d="M 50,28 L 90,48 L 50,68 L 10,48 Z" fill="#3b82f6" stroke="#3b82f6" />
                    <path d="M 10,48 L 50,68 L 50,76 L 10,56 Z" fill="#2563eb" stroke="#2563eb" />
                    <path d="M 50,68 L 90,48 L 90,56 L 50,76 Z" fill="#1d4ed8" stroke="#1d4ed8" />
                  </g>
                  {/* Top Layer (White/Lightest Blue) */}
                  <g>
                    <path d="M 50,10 L 90,30 L 50,50 L 10,30 Z" fill="#ffffff" stroke="#ffffff" />
                    <path d="M 10,30 L 50,50 L 50,58 L 10,38 Z" fill="#dbeafe" stroke="#dbeafe" />
                    <path d="M 50,50 L 90,30 L 90,38 L 50,58 Z" fill="#bfdbfe" stroke="#bfdbfe" />
                  </g>
                </g>
              </svg>
              <span>altis</span>
            </div>
            <p className="text-t-tertiary text-sm leading-relaxed max-w-xs">
              IT · AI · DevOps · MLOps for the Gulf's most ambitious organizations.
              Based in Dubai, operating across the GCC.
            </p>
          </div>

          <div>
            <h5 className="text-t-tertiary text-xs font-medium uppercase tracking-[0.08em] mb-4">Navigation</h5>
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(" ", "-")}`}
                className="block text-t-tertiary text-sm mb-2.5 hover:text-t-secondary transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          <div>
            <h5 className="text-t-tertiary text-xs font-medium uppercase tracking-[0.08em] mb-4">Contact</h5>
            <a
              href="mailto:alexandre.arnaud@mho.ae"
              className="text-t-tertiary text-sm hover:text-t-secondary block mb-2 transition-colors"
            >
              alexandre.arnaud@mho.ae
            </a>
            <p className="text-t-tertiary text-sm">Dubai, UAE</p>
          </div>
        </div>

        <div className="border-t border-b-subtle pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-t-tertiary text-xs">
          <span>&copy; 2026 altis. All rights reserved.</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>

    </div>
  );
}
