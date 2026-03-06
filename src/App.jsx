import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        {/* Gradient overlay on top of image */}
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/40 to-base" />

        {/* Animated mesh glows */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-[120px] animate-mesh-1" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-glow/[0.03] blur-[100px] animate-mesh-2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-t-secondary text-xs font-medium tracking-wide">IT · AI · DevOps · MLOps for GCC Enterprises</span>
            </motion.div>

            <h1 className="text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-[-0.035em] mb-6">
              Technology that moves{" "}
              <span className="text-gradient-accent">at your speed.</span>
            </h1>

            <p className="text-t-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              We deliver AI, DevOps, MLOps, and managed IT services to Gulf enterprises —
              cutting complexity, accelerating delivery, and building systems that last.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:alexandre.arnaud@mho.ae"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl text-[0.95rem] glow-accent transition-all duration-200"
              >
                Start a Conversation
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-b-hover text-t-secondary hover:border-accent hover:text-t-primary px-8 py-3 rounded-xl text-[0.95rem] transition-all duration-200"
              >
                Our Services
              </a>
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
            <span className="text-t-tertiary text-[0.7rem] font-medium tracking-[0.1em] uppercase">
              Trusted by leading GCC enterprises
            </span>
          </div>
        </Reveal>
        <div className="flex gap-16 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-t-tertiary/50 hover:text-t-secondary text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-colors duration-300 cursor-default flex items-center gap-4"
            >
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

      {/* ══════════════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="problem">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold leading-tight tracking-[-0.025em] mb-10 max-w-2xl">
              Legacy systems and slow delivery are costing GCC enterprises their edge.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {[
                { label: "Manual processes", desc: "Most large enterprises in the region still handle critical workflows manually — approvals, reporting, onboarding." },
                { label: "Slow delivery", desc: "Long development cycles and fragile infrastructure prevent teams from shipping improvements quickly." },
                { label: "AI without strategy", desc: "Many companies experiment with AI tools in isolation, with no plan to scale or embed them into real operations." },
              ].map((s, i) => (
                <div key={i} className="border-l-2 border-b-subtle pl-5">
                  <div className="text-t-primary font-semibold text-base mb-1">{s.label}</div>
                  <div className="text-sm text-t-secondary leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-surface border border-b-subtle border-l-4 border-l-accent rounded-2xl p-8 sm:p-10">
              <div className="text-t-primary text-xl font-semibold mb-3">
                The cost of inaction compounds every quarter.
              </div>
              <p className="text-t-secondary text-lg leading-relaxed max-w-2xl">
                While competitors modernize, organizations stuck on manual processes and fragmented IT lose speed, talent, and market share.
                The window to act is now — and we make it fast.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════
          USE CASE
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" id="use-cases">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <SectionLabel>Use Case</SectionLabel>
            <h2 className="text-[2.8rem] sm:text-[3rem] font-bold tracking-[-0.025em] leading-tight max-w-xl">
              From fragmented tooling to a fully automated operation.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-surface border border-b-subtle rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Narrative */}
                <div className="p-8 sm:p-10 lg:border-r lg:border-b-subtle">
                  <p className="text-t-secondary text-[0.95rem] leading-relaxed mb-6">
                    A regional conglomerate was running critical procurement workflows manually — approvals routed by email, documents processed by hand, no real-time visibility for the finance team.
                  </p>
                  <p className="text-t-secondary text-[0.95rem] leading-relaxed mb-6">
                    We deployed an AI-powered procurement layer integrated with their existing ERP — automated document extraction, intelligent validation, instant approval routing, and spend dashboards.
                  </p>
                  <p className="text-t-primary text-[0.95rem] leading-relaxed font-medium">
                    The finance team now handles far higher volumes with the same headcount. Approval cycles went from days to hours.
                  </p>
                </div>

                {/* Outcomes */}
                <div className="p-8 sm:p-10 flex flex-col">
                  {[
                    { val: "Significantly faster", label: "Document processing time" },
                    { val: "High accuracy", label: "AI extraction — Arabic & English" },
                    { val: "Weeks, not months", label: "From kickoff to production" },
                    { val: "Measurable savings", label: "Annualized operational cost reduction" },
                  ].map((m, i) => (
                    <div key={i} className={`flex items-start gap-4 py-5 ${i > 0 ? "border-t border-b-subtle" : ""}`}>
                      <div className="w-1 h-full min-h-[40px] bg-accent/30 rounded-full flex-shrink-0" />
                      <div>
                        <div className="text-[1.4rem] font-bold text-t-primary tracking-tight leading-none mb-1">{m.val}</div>
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
              A Dubai-based team that combines deep technical expertise with enterprise business acumen.
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
              From first call to live system — fast.
            </h2>
          </Reveal>

          {/* Horizontal stepper — desktop */}
          <div className="hidden lg:block mb-16">
            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-px bg-b-subtle" />
              <div className="grid grid-cols-4 gap-8">
                {PROCESS_STEPS.map((step, i) => (
                  <Reveal key={i} delay={i * 0.15}>
                    <div className="relative">
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
            <a
              href="mailto:alexandre.arnaud@mho.ae"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl glow-accent transition-all duration-200"
            >
              Start a conversation
            </a>
          </Reveal>
        </div>
      </section>

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/[0.06] blur-[150px] rounded-full pointer-events-none" />

        <div className="bg-surface border border-b-subtle rounded-3xl max-w-5xl mx-auto relative z-10">
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
        </div>
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
