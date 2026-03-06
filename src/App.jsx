import { useEffect, useRef, useState } from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
  Button, Card, CardBody, CardHeader,
  Chip, Divider, Progress,
} from "@heroui/react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   THEME
────────────────────────────────────────────────────────── */
const C = {
  navy:   "#0D1B3E",
  navy2:  "#122050",
  navy3:  "#1A2744",
  gold:   "#D4A843",
  goldLt: "#F0C96A",
  teal:   "#1A9DD9",
  tealLt: "#38B5EE",
  purple: "#A78BFA",
  green:  "#10B981",
  red:    "#EF4444",
  white:  "#FFFFFF",
  gray:   "#64748B",
  light:  "#F7F8FC",
};

/* ──────────────────────────────────────────────────────────
   NEURAL CANVAS BACKGROUND
────────────────────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const COLORS = [C.gold, C.teal, "rgba(255,255,255,0.9)"];
    const COUNT = 75;
    const DIST = 145;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    const init = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,168,67,${(1 - d / DIST) * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        const p = particles[i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    const onResize = () => { resize(); init(); };
    resize(); init(); draw();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ──────────────────────────────────────────────────────────
   REVEAL ANIMATION
────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
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
    <div className={`flex items-center gap-3 mb-3 ${center ? "justify-center" : ""}`}>
      <span className="w-6 h-0.5 bg-[#D4A843]" />
      <span className="text-[#D4A843] text-[11px] font-bold tracking-[3px] uppercase">{children}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01", icon: "📄", accentColor: C.gold,
    title: "Document AI & Smart OCR",
    desc: "Automatically extract, classify, and validate data from any document — purchase orders, invoices, contracts, KYC forms. 95%+ accuracy, Arabic & English, any format.",
    tags: ["OCR Engine", "Data Extraction", "Auto-Validation", "Arabic Support"],
  },
  {
    num: "02", icon: "⚡", accentColor: C.teal,
    title: "AI Workflow Automation",
    desc: "Integrate intelligent automation directly into your SAP, Oracle, or Microsoft 365 environment. No rip-and-replace — we make your existing systems exponentially smarter.",
    tags: ["SAP Integration", "M365 AI", "RPA + AI", "Real-time Alerts"],
  },
  {
    num: "03", icon: "🧭", accentColor: C.purple,
    title: "Digital Transformation Advisory",
    desc: "Strategy-to-execution consulting for GCC enterprises. We audit your operations, build your AI roadmap, select the right vendors, and guide implementation from A to Z.",
    tags: ["AI Roadmap", "Process Audit", "Change Management", "ROI Modeling"],
  },
];

const WHY_US = [
  { icon: "🧠", color: C.gold,   title: "Mixed Business + Technical Profile",  desc: "We speak CFO and CTO in the same meeting. Our team bridges the gap between technical capability and business ROI — no translation needed. You get real-world solutions." },
  { icon: "🏙️", color: C.teal,   title: "Deeply Rooted in Dubai & the GCC",   desc: "Local entity, local team, local network. We understand the region's business culture, procurement cycles, and decision-making dynamics where it counts." },
  { icon: "🎯", color: C.purple, title: "POC-First. Results Before Contract.", desc: "30-day proof of concept on your real data, at reduced or zero cost. You see measurable results before signing anything. That's our level of confidence." },
  { icon: "🤝", color: C.green,  title: "Credible Traction from Day One",      desc: "We're already in active discussions with regional references. We don't pitch from zero — we accelerate from existing relationships and proven use cases." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call",    desc: "30 minutes to map your biggest operational pain point and identify the highest-ROI automation opportunity.",   time: "30 minutes" },
  { num: "02", title: "POC Design",        desc: "We design a targeted proof of concept scoped around your actual data. Clear deliverables, clear success metrics.",  time: "1 week" },
  { num: "03", title: "30-Day Deployment", desc: "We build and deploy. Live results on your real workflows — measurable impact, zero disruption to your teams.",     time: "30 days" },
  { num: "04", title: "Scale & Expand",    desc: "We productionize, integrate fully, and roll out to other departments. Ongoing support and model optimization included.", time: "Ongoing" },
];

const INDUSTRIES = [
  { icon: "🏢", title: "Conglomerates",        names: "Al Futtaim · MAF · Emaar" },
  { icon: "🏛️", title: "Quasi-Government",     names: "DP World · DEWA · RTA" },
  { icon: "🏦", title: "Banking & Finance",     names: "Emirates NBD · FAB · Mashreq" },
  { icon: "✈️", title: "Aviation & Logistics",  names: "Emirates · Etihad · DP World" },
  { icon: "🏥", title: "Healthcare",            names: "Aster DM · Pure Health" },
  { icon: "🏗️", title: "Real Estate",           names: "Aldar · Nakheel · Meraas" },
  { icon: "⚡", title: "Energy & Utilities",    names: "ENOC · DEWA · ADNOC" },
  { icon: "🛍️", title: "Retail & Luxury",       names: "Chalhoub · AW Rostamani" },
];

const MARQUEE_ITEMS = [
  "Al Futtaim Group","Majid Al Futtaim","DP World","Emirates NBD","DEWA",
  "Emaar Properties","Etihad Airways","Pure Health","Chalhoub Group","ENOC","FAB","Aldar Properties",
];

const NAV_LINKS = ["Services","Use Cases","Process","Industries"];

/* ──────────────────────────────────────────────────────────
   APP
────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1B3E] text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════ */}
      <Navbar
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        className={`transition-all duration-400 fixed top-0 ${
          scrolled
            ? "bg-[#0D1B3E]/96 backdrop-blur-xl border-b border-[#D4A843]/15 shadow-2xl"
            : "bg-transparent"
        }`}
        maxWidth="xl"
      >
        <NavbarContent>
          <NavbarMenuToggle className="sm:hidden text-white" />
          <NavbarBrand>
            <span className="font-space font-bold text-xl text-white tracking-tight">
              [YOUR <span className="text-[#D4A843]">COMPANY</span>]
            </span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-7" justify="center">
          {NAV_LINKS.map((l) => (
            <NavbarItem key={l}>
              <a href={`#${l.toLowerCase().replace(" ", "-")}`}
                className="text-white/65 hover:text-[#D4A843] text-sm font-medium transition-colors duration-200">
                {l}
              </a>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button as="a" href="mailto:alexandre.arnaud@mho.ae"
              className="bg-[#D4A843] text-[#0D1B3E] font-bold text-sm"
              radius="md" size="sm">
              Book a Call →
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-[#0D1B3E]/97 backdrop-blur-xl pt-6">
          {NAV_LINKS.map((l) => (
            <NavbarMenuItem key={l}>
              <a href={`#${l.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMenuOpen(false)}
                className="text-white/75 hover:text-[#D4A843] text-lg font-medium py-2 block transition-colors">
                {l}
              </a>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <a href="mailto:alexandre.arnaud@mho.ae"
              className="text-[#D4A843] font-bold text-lg py-2 block">
              📧 Book a Free Call →
            </a>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
        <NeuralCanvas />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B3E]/92 via-[#0D1B3E]/72 to-[#1A9DD9]/10 z-10" />

        {/* Glow orb */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D4A843]/5 blur-3xl z-10 pointer-events-none" />

        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Chip
                startContent={<span className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse mx-1" />}
                variant="bordered"
                className="border-[#D4A843]/35 text-[#D4A843] mb-7 text-xs font-semibold tracking-widest"
              >
                🇦🇪 Dubai-based · GCC Focused
              </Chip>
            </motion.div>

            <h1 className="font-space text-5xl lg:text-[3.8rem] font-bold leading-[1.08] tracking-tight mb-7">
              Your Enterprise.<br />
              Powered by{" "}
              <span className="text-gradient-gold">AI.</span><br />
              Ready for{" "}
              <span className="text-[#38B5EE]">Tomorrow.</span>
            </h1>

            <p className="text-white/62 text-[1.1rem] leading-relaxed mb-9 max-w-lg">
              We build custom AI and IT solutions for the Gulf's largest organizations —
              cutting costs, eliminating manual processes, and delivering results in{" "}
              <strong className="text-white/85">30 days.</strong>
            </p>

            <div className="flex gap-4 flex-wrap">
              <Button
                as="a" href="mailto:alexandre.arnaud@mho.ae"
                size="lg"
                className="bg-[#D4A843] text-[#0D1B3E] font-bold px-8 text-[0.95rem] glow-gold"
                startContent={<span>🚀</span>}
              >
                Schedule a Free POC
              </Button>
              <Button
                as="a" href="#services" size="lg"
                variant="bordered"
                className="border-white/28 text-white hover:border-[#D4A843] hover:text-[#D4A843] text-[0.95rem]"
              >
                Explore Solutions ↓
              </Button>
            </div>
          </motion.div>

          {/* Right — floating stat cards */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "📄", stat: "95%+",   label: "OCR accuracy on enterprise documents",   color: C.gold,   anim: "float-1", delay: 0.3, indent: false },
              { icon: "⚡", stat: "30 days", label: "POC deployed — results you can measure",  color: C.teal,   anim: "float-2", delay: 0.5, indent: true  },
              { icon: "📉", stat: "−80%",   label: "Reduction in manual processing time",     color: C.green,  anim: "float-3", delay: 0.7, indent: false },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: card.indent ? 32 : 0 }}
                transition={{ duration: 0.7, delay: card.delay }}
                className={`animate-${card.anim}`}
              >
                <Card
                  className="glass-card border border-white/8"
                  shadow="none"
                >
                  <CardBody className="flex flex-row items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${card.color}22` }}>
                      {card.icon}
                    </div>
                    <div>
                      <div className="text-[1.6rem] font-bold font-space leading-none" style={{ color: card.color }}>
                        {card.stat}
                      </div>
                      <div className="text-xs text-white/50 mt-1 leading-snug">{card.label}</div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#D4A843]/7 border-y border-[#D4A843]/14 py-4 overflow-hidden select-none">
        <div className="flex gap-16 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-[#D4A843]/65 text-[11px] font-bold tracking-[2.5px] uppercase flex items-center gap-4">
              <span className="opacity-40 text-[7px]">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#122050] py-20 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: 320, suffix: "B$",  label: "Projected AI impact on MENA GDP by 2030" },
            { val: 85,  suffix: "%",   label: "GCC enterprises planning AI investments in 2025" },
            { val: 30,  suffix: "",    label: "Days to first measurable results with our POC" },
            { val: 1,   prefix: "#",   label: "Dubai ranked top smart city in the Middle East" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="text-5xl font-bold font-space text-[#D4A843] mb-2 leading-none">
                <Counter value={s.val} suffix={s.suffix} prefix={s.prefix || ""} />
              </div>
              <div className="text-sm text-white/50 leading-snug max-w-[180px] mx-auto">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-gradient-to-b from-[#122050] to-[#0D1B3E]" id="problem">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <Reveal>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-space text-[2.6rem] font-bold leading-tight mb-6">
              Your enterprise is<br />hemorrhaging time & money.
            </h2>
            <p className="text-white/58 text-lg leading-relaxed mb-10">
              Large GCC organizations still rely on manual, paper-heavy workflows —
              even as their competitors automate. Every month of delay costs real money.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "📋", title: "Manual Document Processing",   desc: "70%+ of GCC enterprises still manually handle POs, invoices, and contracts — error-prone and impossible to scale at the speed the market demands." },
                { icon: "🏚️", title: "Legacy System Silos",          desc: "Aging ERP platforms trap data in isolated systems, blocking automation and real-time business intelligence across departments." },
                { icon: "💸", title: "Hidden Operational Costs",     desc: "Up to 30% of operational time is absorbed by low-value tasks that AI can automate today — at a fraction of the cost." },
              ].map((p, i) => (
                <motion.div key={i} whileHover={{ x: 5 }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/3 border border-white/6 hover:bg-[#D4A843]/5 hover:border-[#D4A843]/18 transition-all cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-[0.95rem]">{p.title}</h4>
                    <p className="text-sm text-white/52 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Card className="bg-gradient-to-br from-[#D4A843]/9 to-[#1A9DD9]/9 border border-[#D4A843]/14" shadow="none" radius="2xl">
              <CardBody className="p-9 flex flex-col gap-6">
                <div className="text-center">
                  <div className="font-space text-6xl font-bold text-[#D4A843] leading-none">$1.5M+</div>
                  <div className="text-white/45 text-sm mt-3 leading-snug">
                    Average annual loss per large enterprise<br />via manual, inefficient processes
                  </div>
                </div>
                <Divider className="bg-white/8" />
                {[
                  { label: "Document processing overhead", val: 72, color: "danger"  },
                  { label: "Data entry error rate",        val: 48, color: "warning" },
                  { label: "Workflow automation potential",val: 85, color: "primary" },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/62">{bar.label}</span>
                      <span className="font-bold text-[#D4A843]">{bar.val}%</span>
                    </div>
                    <Progress value={bar.val} color={bar.color} size="sm" className="h-2" />
                  </div>
                ))}
                <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-sm text-white/62">
                  💡 <strong className="text-emerald-400">The opportunity:</strong>{" "}
                  Our clients recover 500K–2M AED/year by automating just 3 core workflows.
                </div>
              </CardBody>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#F7F8FC]" id="services">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <SectionLabel>Our Solutions</SectionLabel>
            <h2 className="font-space text-[2.6rem] font-bold text-[#0D1B3E] mb-4">
              Three ways we transform your business.
            </h2>
            <p className="text-[#64748B] text-lg max-w-xl">
              From day-one document automation to long-term strategic transformation —
              we cover the full AI journey.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -7 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                  <Card
                    className="h-full bg-white border border-[#E2E8F0] shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                    radius="xl"
                  >
                    {/* Top accent */}
                    <div className="h-1 w-full" style={{ background: svc.accentColor }} />
                    <CardHeader className="px-7 pt-7 pb-0">
                      <div className="font-space text-7xl font-bold leading-none mb-4"
                        style={{ color: `${C.navy}08` }}>
                        {svc.num}
                      </div>
                    </CardHeader>
                    <CardBody className="px-7 pb-7 pt-3 flex flex-col gap-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ background: `${svc.accentColor}18` }}>
                        {svc.icon}
                      </div>
                      <h3 className="font-space text-xl font-bold text-[#0D1B3E] leading-tight">{svc.title}</h3>
                      <p className="text-[#64748B] text-[0.9rem] leading-relaxed">{svc.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {svc.tags.map((tag) => (
                          <Chip key={tag} size="sm" variant="flat"
                            className="bg-[#F1F5F9] text-[#334155] text-xs font-semibold border-0">
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          USE CASE
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#0D1B3E] relative overflow-hidden" id="use-cases">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1A9DD9]/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-[#D4A843]/4 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Reveal>
            <SectionLabel>Real-World Impact</SectionLabel>
            <h2 className="font-space text-[2.6rem] font-bold mb-5 leading-tight">
              From 100% manual to<br />fully automated — in 6 weeks.
            </h2>
            <p className="text-white/58 text-lg leading-relaxed mb-10">
              See how our AI Procurement Board with Smart OCR is transforming
              operations for a major regional conglomerate.
            </p>

            <div className="flex flex-col divide-y divide-white/6">
              {[
                { num: "01", color: C.red,   title: "The Challenge",  desc: "Hundreds of POs and supplier invoices processed manually each month. Frequent errors, 5–7 day approval delays, zero real-time visibility for the finance team." },
                { num: "02", color: C.teal,  title: "Our Solution",   desc: "AI-powered procurement dashboard with integrated OCR engine: automatic data extraction from any document format, intelligent validation rules, instant approval workflows, live spend analytics." },
                { num: "03", color: C.green, title: "The Results",    desc: "Deployed in 6 weeks on existing ERP infrastructure. Finance team now processes 3× the volume with the same headcount. Approval time dropped from days to under 2 hours." },
              ].map((step, i) => (
                <div key={i} className="flex gap-5 py-7">
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[0.8rem] mt-0.5"
                    style={{ background: `${step.color}14`, color: step.color, border: `1px solid ${step.color}28` }}>
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-white/52 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button as="a" href="mailto:alexandre.arnaud@mho.ae"
              className="bg-[#D4A843] text-[#0D1B3E] font-bold mt-8"
              endContent="→">
              Get a Live Demo
            </Button>
          </Reveal>

          <Reveal delay={0.18}>
            <Card className="bg-[#122050] border border-[#D4A843]/12" shadow="none" radius="2xl">
              <CardBody className="p-8">
                <div className="text-[#D4A843] text-[11px] font-bold tracking-[2px] uppercase mb-6 pb-5 border-b border-[#D4A843]/14">
                  ⚡ Key Metrics Achieved
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { val: "−80%",    label: "Reduction in document processing time" },
                    { val: "95%+",    label: "OCR extraction accuracy across document types" },
                    { val: "6 weeks", label: "From project kickoff to full production" },
                    { val: "500K AED",label: "Estimated annual savings (Year 1)" },
                  ].map((m, i) => (
                    <motion.div key={i} whileHover={{ x: 4 }}
                      className="p-5 rounded-xl bg-white/3 border border-white/6 flex flex-col gap-1 transition-all hover:border-[#D4A843]/25 hover:bg-[#D4A843]/5">
                      <div className="font-space text-[2rem] font-bold text-[#D4A843] leading-none">{m.val}</div>
                      <div className="text-sm text-white/48">{m.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/18 text-sm text-white/58">
                  ✅{" "}
                  <strong className="text-emerald-400">Zero disruption</strong>{" "}
                  — deployed on top of existing ERP, no data migration required.
                </div>
              </CardBody>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY US
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#F7F8FC]" id="whyus">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-space text-[2.6rem] font-bold text-[#0D1B3E] mb-4">
              We're not a typical IT vendor.
            </h2>
            <p className="text-[#64748B] text-lg max-w-xl">
              A Dubai-based team combining deep technical expertise with enterprise business acumen —
              genuinely rare in the GCC market.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280 }}>
                  <Card
                    className="h-full bg-white shadow-sm hover:shadow-xl transition-shadow border-l-4"
                    shadow="none"
                    style={{ borderLeftColor: w.color }}
                    radius="xl"
                  >
                    <CardBody className="p-7">
                      <div className="text-3xl mb-5">{w.icon}</div>
                      <h3 className="font-space text-[1.05rem] font-bold text-[#0D1B3E] mb-3">{w.title}</h3>
                      <p className="text-[#64748B] text-sm leading-relaxed">{w.desc}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#0D1B3E]" id="process">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-lg mx-auto mb-16">
            <SectionLabel center>How We Work</SectionLabel>
            <h2 className="font-space text-[2.6rem] font-bold">
              From first call to full ROI in 90 days.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5, borderColor: "rgba(212,168,67,0.35)" }}
                  className="text-center p-8 rounded-2xl bg-white/3 border border-white/7 hover:bg-[#D4A843]/4 transition-all cursor-default">
                  <div className="w-14 h-14 rounded-full border-2 border-[#D4A843]/28 bg-[#122050] flex items-center justify-center font-bold font-space text-xl text-[#D4A843] mx-auto mb-6 transition-all hover:border-[#D4A843] hover:shadow-[0_0_20px_rgba(212,168,67,0.2)]">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-[1rem] mb-3">{step.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{step.desc}</p>
                  <Chip size="sm" className="bg-[#D4A843]/10 text-[#D4A843] font-semibold text-xs">
                    {step.time}
                  </Chip>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#122050]" id="industries">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <SectionLabel>Industries We Serve</SectionLabel>
            <h2 className="font-space text-[2.6rem] font-bold">
              Built for the GCC's most complex organizations.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(212,168,67,0.3)", backgroundColor: "rgba(212,168,67,0.06)" }}
                  className="p-6 rounded-2xl bg-white/4 border border-white/7 text-center cursor-default transition-all">
                  <div className="text-3xl mb-3">{ind.icon}</div>
                  <h4 className="font-bold text-sm mb-2">{ind.title}</h4>
                  <p className="text-[#D4A843]/60 text-xs italic leading-relaxed">{ind.names}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#0D1B3E] relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#D4A843]/5 blur-3xl pointer-events-none" />

        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <SectionLabel center>Ready to start?</SectionLabel>
          <h2 className="font-space text-5xl font-bold mb-6">
            Your 30-day POC starts<br />with one conversation.
          </h2>
          <p className="text-white/58 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            No commitment. No lengthy proposals. Just 30 minutes to identify your
            biggest automation opportunity — then we prove it works.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-9">
            <Button as="a" href="mailto:alexandre.arnaud@mho.ae" size="lg"
              className="bg-[#D4A843] text-[#0D1B3E] font-bold px-9 text-[1rem] glow-gold"
              startContent="📧">
              Book a Discovery Call
            </Button>
            <Button as="a" href="mailto:alexandre.arnaud@mho.ae" size="lg"
              variant="bordered"
              className="border-white/25 text-white hover:border-[#D4A843] hover:text-[#D4A843] text-[1rem]">
              Send Us a Message
            </Button>
          </div>
          <div className="flex gap-7 justify-center flex-wrap text-sm text-white/42">
            {["Free 30-min consultation","No vendor lock-in","Results in 30 days","Dubai-based team"].map((p) => (
              <span key={p} className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>{p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="bg-[#070F22] border-t border-white/5 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <p className="font-space text-xl font-bold mb-4">
              [YOUR <span className="text-[#D4A843]">COMPANY</span>]
            </p>
            <p className="text-white/38 text-sm leading-relaxed max-w-xs">
              Enterprise AI & IT solutions for the Gulf's most ambitious organizations.
              Based in Dubai, operating across the GCC.
            </p>
            <div className="flex gap-3 mt-5">
              {["in", "𝕏", "✉"].map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-lg bg-white/4 border border-white/9 flex items-center justify-center text-sm hover:bg-[#D4A843]/15 hover:border-[#D4A843] transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-white/28 text-[11px] font-bold uppercase tracking-[1.5px] mb-5">Services</h5>
            {["Document AI & OCR","Workflow Automation","Digital Transformation","Use Cases"].map((l) => (
              <a key={l} href="#" className="block text-white/48 text-sm mb-3 hover:text-[#D4A843] transition-colors">{l}</a>
            ))}
          </div>

          <div>
            <h5 className="text-white/28 text-[11px] font-bold uppercase tracking-[1.5px] mb-5">Contact</h5>
            <a href="mailto:alexandre.arnaud@mho.ae"
              className="text-white/48 text-sm hover:text-[#D4A843] block mb-2 transition-colors">
              alexandre.arnaud@mho.ae
            </a>
            <p className="text-white/28 text-sm mb-5">Dubai, UAE</p>
            <Button as="a" href="mailto:alexandre.arnaud@mho.ae" size="sm"
              className="bg-[#D4A843] text-[#0D1B3E] font-bold">
              Book a Call →
            </Button>
          </div>
        </div>

        <Divider className="bg-white/5 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-white/22 text-xs">
          <span>© 2026 [Your Company]. All rights reserved. Dubai, UAE.</span>
          <span>Built for the GCC&apos;s AI era.</span>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════
          FLOATING ACTION BUTTON
      ══════════════════════════════════════════════════ */}
      <motion.a
        href="mailto:alexandre.arnaud@mho.ae"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-[#D4A843] text-[#0D1B3E] px-5 py-3 rounded-full font-bold text-sm cursor-pointer"
        style={{ boxShadow: "0 8px 35px rgba(212,168,67,0.5)" }}
      >
        <span className="w-2 h-2 rounded-full bg-[#0D1B3E] animate-pulse" />
        Book a Free Call
      </motion.a>

    </div>
  );
}
