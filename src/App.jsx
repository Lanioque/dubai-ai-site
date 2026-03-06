import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

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
    desc: "Custom AI solutions built for your workflows — intelligent document processing, predictive analytics, LLM integrations, and AI-powered decision automation. Arabic & English, any stack.",
    tags: ["LLM Integration", "Predictive Analytics", "Document AI", "Arabic NLP"],
    featured: true,
  },
  {
    num: "02",
    title: "DevOps & Cloud",
    desc: "End-to-end DevOps pipelines, CI/CD automation, and cloud infrastructure on AWS, Azure, or GCP. We accelerate your delivery cycles without disrupting your existing teams.",
    tags: ["CI/CD", "Kubernetes", "Cloud Migration", "Infrastructure as Code"],
  },
  {
    num: "03",
    title: "MLOps & Model Deployment",
    desc: "We operationalize your AI models — from experimentation to production. Model monitoring, retraining pipelines, versioning, and scalable serving infrastructure.",
    tags: ["Model Serving", "Pipeline Automation", "Monitoring", "Retraining"],
  },
  {
    num: "04",
    title: "IT Strategy & Managed Services",
    desc: "Technology advisory and managed IT for GCC enterprises. We audit your stack, align your IT roadmap with business goals, and provide ongoing support so your teams can focus on growth.",
    tags: ["IT Audit", "Managed Services", "Roadmap", "Vendor Management"],
  },
];

const WHY_US = [
  { num: "01", title: "Business + Technical in One Team", desc: "We speak CFO and CTO in the same meeting. Our team bridges the gap between technical capability and business ROI — no translation needed." },
  { num: "02", title: "Deeply Rooted in Dubai & the GCC", desc: "Local entity, local team, local network. We understand the region's business culture, procurement cycles, and decision-making dynamics." },
  { num: "03", title: "POC-First. Results Before Contract.", desc: "We run a short proof of concept on your real environment and data. You see tangible impact before signing anything." },
  { num: "04", title: "Full-Stack Capability", desc: "From AI models and backend infrastructure to DevOps pipelines and IT governance — we cover the entire technology stack." },
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
          <a href="#hero" className="font-extrabold text-xl tracking-[-0.045em] text-t-primary select-none">
            MHO<span className="text-accent">.AI</span>
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
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">

        {/* ── Backgrounds ── */}
        {/* Unsplash: dark abstract tech/network */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80&auto=format&fit=crop')",
            opacity: 0.08,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-base via-base/95 to-base/80" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating orbs — layered at different depths */}
        <motion.div
          animate={{ y: [0, -28, 0], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/[0.05] blur-[110px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-accent/[0.04] blur-[80px] pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* ── LEFT: Content ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-accent text-[0.7rem] font-semibold tracking-[0.12em] uppercase mb-5"
              >
                Enterprise Technology · GCC
              </motion.p>

              <h1 className="text-[2.9rem] sm:text-[3.5rem] lg:text-[3.8rem] font-bold leading-[1.08] tracking-[-0.03em] mb-6 text-t-primary">
                Technology that delivers{" "}
                <em className="not-italic text-gradient-accent">real results.</em>
              </h1>

              <p className="text-t-secondary text-[1.05rem] leading-relaxed mb-9 max-w-md">
                AI, DevOps, MLOps, and managed IT — built for Gulf enterprises that need speed,
                reliability, and a team that understands the region.
              </p>

              <div className="flex items-center gap-4 flex-wrap mb-6">
                <a
                  href="mailto:alexandre.arnaud@mho.ae"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-7 py-3 rounded-lg text-sm glow-accent transition-all duration-200"
                >
                  Book a Discovery Call
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-sm text-t-secondary hover:text-t-primary font-medium transition-colors group"
                >
                  Explore services
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>

              <p className="text-t-tertiary text-xs flex items-center gap-2">
                <span>🚀</span>
                30-day proof of concept · No upfront commitment
              </p>
            </motion.div>

            {/* ── RIGHT: Dashboard screenshot in 3D browser frame ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden lg:block"
              style={{ perspective: "1400px" }}
            >
              {/* Levitation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* 3D tilt on mouse */}
                <motion.div
                  ref={tilt.ref}
                  onMouseMove={tilt.onMove}
                  onMouseLeave={tilt.onLeave}
                  style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
                  className="relative cursor-default"
                >
                  {/* Ambient glow */}
                  <div className="absolute -inset-8 bg-accent/[0.12] blur-[60px] rounded-3xl pointer-events-none" />

                  {/* Browser chrome frame */}
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08) inset, 0 0 0 1px rgba(255,255,255,0.04)",
                    }}
                  >
                    {/* Title bar */}
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ background: "#161B2A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                      <div
                        className="ml-3 flex-1 rounded-md px-3 py-1 text-[0.65rem] text-white/30 font-mono"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        app.mho.ai/dashboard
                      </div>
                    </div>
                    {/* Dashboard screenshot */}
                    <img
                      src="/ai-dashboard.png"
                      alt="MHO.AI Dashboard"
                      className="w-full block"
                      style={{ maxHeight: "360px", objectFit: "cover", objectPosition: "top" }}
                    />
                    {/* Bottom shimmer */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base/80 to-transparent" />
                  </div>

                  {/* Floating badge — top right */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-400"
                    style={{ background: "rgba(16,24,22,0.96)", border: "1px solid rgba(52,211,153,0.35)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", transform: "translateZ(40px)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    All systems live
                  </motion.div>

                  {/* Floating badge — bottom left */}
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute -bottom-3 -left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-accent"
                    style={{ background: "rgba(9,9,11,0.96)", border: "1px solid rgba(59,130,246,0.35)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", transform: "translateZ(40px)" }}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    New model deployed
                  </motion.div>

                </motion.div>
              </motion.div>
            </motion.div>

          </div>
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

      {/* ══════════════
          PLATFORM PREVIEWS
      ══════════════ */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel center>The Platform</SectionLabel>
            <h2 className="text-[2.4rem] sm:text-[2.8rem] font-bold tracking-[-0.025em] leading-tight mb-4">
              Tools built for enterprise scale.
            </h2>
            <p className="text-t-secondary text-lg max-w-lg mx-auto">
              A unified platform for AI, MLOps, and DevOps — from first model to full production.
            </p>
          </Reveal>

          <div className="flex flex-col gap-20">
            {/* Row 1: AI Dashboard — large, slightly tilted */}
            <Reveal>
              <div className="relative" style={{ perspective: "1200px" }}>
                <motion.div
                  whileHover={{ rotateX: -2, rotateY: 3, scale: 1.01 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative"
                >
                  <div className="absolute -inset-10 bg-accent/[0.06] blur-[80px] rounded-full pointer-events-none" />
                  <div className="flex items-start gap-8 lg:gap-16">
                    <div className="flex-shrink-0 w-72 pt-4 hidden lg:block">
                      <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-3 block">AI Analytics</span>
                      <h3 className="text-2xl font-bold tracking-tight mb-3">Real-time model monitoring</h3>
                      <p className="text-t-secondary text-sm leading-relaxed mb-5">Track inference latency, accuracy drift, and pipeline health across all your deployed models from a single pane.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Model Tracking", "Drift Detection", "Live Metrics"].map(t => (
                          <span key={t} className="text-[0.65rem] font-medium text-t-tertiary bg-elevated border border-b-subtle px-2.5 py-1 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative rounded-xl overflow-hidden" style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07) inset" }}>
                      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#161B2A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                        <span className="ml-2 text-[0.6rem] text-white/25 font-mono">app.mho.ai/analytics</span>
                      </div>
                      <img src="/ai-dashboard.png" alt="AI Analytics Dashboard" className="w-full block" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            {/* Row 2: MLOps — right-aligned */}
            <Reveal>
              <div className="relative" style={{ perspective: "1200px" }}>
                <motion.div
                  whileHover={{ rotateX: -2, rotateY: -3, scale: 1.01 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative"
                >
                  <div className="absolute -inset-10 bg-purple-600/[0.06] blur-[80px] rounded-full pointer-events-none" />
                  <div className="flex items-start gap-8 lg:gap-16 flex-row-reverse">
                    <div className="flex-shrink-0 w-72 pt-4 hidden lg:block">
                      <span className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3 block">MLOps</span>
                      <h3 className="text-2xl font-bold tracking-tight mb-3">Model health monitoring</h3>
                      <p className="text-t-secondary text-sm leading-relaxed mb-5">Detect data drift, monitor prediction quality, and manage the full ML lifecycle from training to production deployment.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Data Drift", "Auto Retraining", "Model Registry"].map(t => (
                          <span key={t} className="text-[0.65rem] font-medium text-t-tertiary bg-elevated border border-b-subtle px-2.5 py-1 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative rounded-xl overflow-hidden" style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07) inset" }}>
                      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#161B2A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                        <span className="ml-2 text-[0.6rem] text-white/25 font-mono">app.mho.ai/mlops</span>
                      </div>
                      <img src="/mlops-dashboard.png" alt="MLOps Dashboard" className="w-full block" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>

            {/* Row 3: DevOps — left */}
            <Reveal>
              <div className="relative" style={{ perspective: "1200px" }}>
                <motion.div
                  whileHover={{ rotateX: -2, rotateY: 3, scale: 1.01 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative"
                >
                  <div className="absolute -inset-10 bg-emerald-600/[0.05] blur-[80px] rounded-full pointer-events-none" />
                  <div className="flex items-start gap-8 lg:gap-16">
                    <div className="flex-shrink-0 w-72 pt-4 hidden lg:block">
                      <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-3 block">DevOps</span>
                      <h3 className="text-2xl font-bold tracking-tight mb-3">CI/CD pipelines at a glance</h3>
                      <p className="text-t-secondary text-sm leading-relaxed mb-5">Full visibility into every deployment. Real-time stage tracking, terminal logs, and environment health — all in one view.</p>
                      <div className="flex flex-wrap gap-2">
                        {["Pipeline Runs", "Deploy Logs", "Env Status"].map(t => (
                          <span key={t} className="text-[0.65rem] font-medium text-t-tertiary bg-elevated border border-b-subtle px-2.5 py-1 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 relative rounded-xl overflow-hidden" style={{ boxShadow: "0 32px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07) inset" }}>
                      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#161B2A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                        <span className="ml-2 text-[0.6rem] text-white/25 font-mono">app.mho.ai/devops</span>
                      </div>
                      <img src="/devops-dashboard.png" alt="DevOps Pipeline" className="w-full block" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
      <section className="py-28 px-6" id="problem">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold leading-tight tracking-[-0.025em] mb-10 max-w-2xl">
              Legacy systems and slow delivery are costing GCC enterprises their edge.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: "⚙", label: "Manual processes", desc: "Critical workflows still routed by email, documents processed by hand, no real-time visibility." },
                { icon: "⏳", label: "Slow delivery", desc: "Long cycles and fragile infra prevent teams from shipping improvements quickly." },
                { icon: "🧩", label: "AI without strategy", desc: "Companies experiment with AI in isolation, no plan to scale or embed it into real operations." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  style={{ perspective: "800px", transformStyle: "preserve-3d" }}
                  className="bg-surface border border-b-subtle rounded-2xl p-7 cursor-default transition-all duration-300 hover:border-accent/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                >
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="text-t-primary font-semibold text-base mb-2">{s.label}</div>
                  <div className="text-sm text-t-secondary leading-relaxed">{s.desc}</div>
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
      <section className="py-28 px-6" id="services">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-4 max-w-xl">
              AI · DevOps · MLOps · IT — end to end.
            </h2>
            <p className="text-t-secondary text-lg max-w-lg">
              Four integrated capabilities. One team. Built for the demands of large GCC organizations.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.08} className={svc.featured ? "md:row-span-2" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateX: -1.5, rotateY: 2 }}
                  style={{ perspective: "900px", transformStyle: "preserve-3d" }}
                  className={`h-full bg-surface border border-b-subtle rounded-2xl p-8 cursor-default transition-all duration-300 hover:border-accent/40 hover:shadow-[0_24px_80px_rgba(0,0,0,0.5)] ${svc.featured ? "flex flex-col justify-between" : ""}`}
                >
                  {/* Top shine */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />
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

      {/* ══════════════
          USE CASE
      ══════════════ */}
      <section className="py-28 px-6" id="use-cases">
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
                {/* Photo side */}
                <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&auto=format&fit=crop"
                    alt="Enterprise operations"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 lg:from-transparent lg:to-surface/60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 backdrop-blur-sm text-accent text-xs font-semibold px-3 py-1.5 rounded-full">
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
          WHY US
      ══════════════ */}
      <section className="py-28 px-6" id="whyus">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight mb-4 max-w-lg">
              We're not a typical IT vendor.
            </h2>
            <p className="text-t-secondary text-lg max-w-lg">
              A Dubai-based team that combines deep technical expertise with enterprise business acumen.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHY_US.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateX: -1, rotateY: i % 2 === 0 ? 2 : -2 }}
                  style={{ perspective: "900px", transformStyle: "preserve-3d" }}
                  className="relative bg-surface border border-b-subtle rounded-2xl p-8 cursor-default transition-all duration-300 hover:border-accent/35 hover:shadow-[0_20px_70px_rgba(0,0,0,0.45)] h-full overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-accent text-sm font-semibold mb-4 block">{w.num}</span>
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] mb-3">{w.title}</h3>
                  <p className="text-t-secondary text-sm leading-relaxed">{w.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════
          PROCESS
      ══════════════ */}
      <section className="py-28 px-6" id="process">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center max-w-lg mx-auto mb-16">
            <SectionLabel center>How We Work</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em]">
              From first call to live system — fast.
            </h2>
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
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Unsplash: Dubai skyline night */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80&auto=format&fit=crop')",
            opacity: 0.12,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-base/60 to-base/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/[0.07] blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          whileHover={{ scale: 1.005 }}
          className="relative z-10 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl max-w-5xl mx-auto overflow-hidden"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="py-20 px-6 text-center">
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
            <p className="font-extrabold text-xl tracking-[-0.04em] mb-3">
              MHO<span className="text-accent">.AI</span>
            </p>
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
          <span>&copy; 2026 MHO.AI. All rights reserved.</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>

    </div>
  );
}
