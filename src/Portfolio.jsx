import { useState, useEffect, useRef } from "react";

function useLottieReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (window.customElements && window.customElements.get("lottie-player")) {
        setReady(true);
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);
  return ready;
}

function Lottie({ src, width = 280, height = 280, loop = true, autoplay = true, style = {} }) {
  const ready = useLottieReady();
  if (!ready) return <div style={{ width, height, ...style }} />;
  return (
    <lottie-player
      src={src}
      background="transparent"
      speed="1"
      style={{ width, height, ...style }}
      loop={loop ? "" : undefined}
      autoplay={autoplay ? "" : undefined}
    />
  );
}

const LOTTIES = {
  hero:    "https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json",
  payment: "https://assets9.lottiefiles.com/packages/lf20_06a6pf9i.json",
  health:  "https://assets3.lottiefiles.com/packages/lf20_5njp3udl.json",
  cloud:   "https://assets6.lottiefiles.com/packages/lf20_qp1q7mct.json",
  mobile:  "https://assets5.lottiefiles.com/packages/lf20_qm8eqzse.json",
  rocket:  "https://assets4.lottiefiles.com/packages/lf20_jR229r.json",
  about:   "https://assets1.lottiefiles.com/packages/lf20_hy4txm7l.json",
  contact: "https://assets10.lottiefiles.com/packages/lf20_u25cckyh.json",
  success: "https://assets2.lottiefiles.com/packages/lf20_jDtzXD.json",
};

const C = {
  cream: "#fdf8f3",
  purple: "#7b8fd4",
  purpleLight: "#dde3f7",
  purpleDark: "#1e2a4a",
  purpleMid: "#4a5fa8",
  blue: "#7ab3cc",
  blueLight: "#d4eaf5",
  blueDark: "#1e4a6a",
  teal: "#6bbfb0",
  tealLight: "#d4f0ea",
  coralLight: "#fde8d8",
  muted: "#5a6680",
  white: "#ffffff",
};

const projects = [
  { title: "FinTech Payment Gateway", company: "Supreme Optimization", category: "Full Stack · FinTech", year: "2023–Now", description: "Led design and development of a secure, scalable payment gateway. Migrated monolith to microservices; integrated GraphQL & Redis to cut load times during peak hours.", tags: ["React.js", "Node.js", "MongoDB", "GraphQL", "Redis"], bg: C.purpleLight, accent: C.purpleMid, lottie: LOTTIES.payment },
  { title: "HIPAA Healthcare Platform", company: "Origin Hubs", category: "Full Stack · Healthcare", year: "2020–2023", description: "Built a HIPAA-compliant clinical platform with AI risk prediction and NLP for medical record analysis, improving clinical decision-making at scale.", tags: ["Vue.js", "Node.js", "MySQL", "AWS", "TypeScript"], bg: C.tealLight, accent: "#2a7a6a", lottie: LOTTIES.health },
  { title: "Cloud Infrastructure & CI/CD", company: "Supreme Optimization", category: "DevOps · Cloud", year: "2023–Now", description: "Implemented end-to-end CI/CD pipelines with Docker, Kubernetes, and AWS — dramatically improving deployment velocity and reducing production downtime.", tags: ["Docker", "Kubernetes", "AWS", "CI/CD", "Nginx"], bg: C.blueLight, accent: C.blueDark, lottie: LOTTIES.cloud },
  { title: "Multi-Device Payment UI", company: "AxisCare", category: "Front-End · FinTech", year: "2016–2020", description: "Engineered dynamic responsive front-end components and integrated payment APIs into a microservices-backed platform built to handle high transaction volumes.", tags: ["React.js", "Jest", "Cypress", "REST API"], bg: C.coralLight, accent: "#9b5b3d", lottie: LOTTIES.mobile },
];

const skills = [
  { name: "React / Next.js / Vue / Angular", level: 97 },
  { name: "Node.js / NestJS / Express", level: 95 },
  { name: "SQL & NoSQL Databases", level: 90 },
  { name: "AWS / GCP / Azure / Firebase", level: 88 },
  { name: "GraphQL / REST / Kafka", level: 87 },
  { name: "Docker & Kubernetes", level: 85 },
];

const techStack = [
  { label: "Languages",     items: "JavaScript · TypeScript · HTML5 · CSS3" },
  { label: "Front-End",     items: "React · Next.js · Vue · Angular · Svelte · Tailwind · MUI · Bootstrap" },
  { label: "Back-End",      items: "Node.js · NestJS · Express · GraphQL · Kafka · REST API" },
  { label: "Cloud & DevOps",items: "AWS · GCP · Azure · Firebase · Docker · Kubernetes · CI/CD · Nginx" },
  { label: "Databases",     items: "PostgreSQL · MongoDB · MySQL · Redis · DynamoDB" },
  { label: "Testing & Tools",items: "Jest · Cypress · Playwright · Selenium · Postman · Swagger · GitHub · Jira" },
];

const timeline = [
  { year: "2023–Now",  role: "Senior Software Engineer", company: "Supreme Optimization",       location: "Dallas, TX (Remote)", bg: C.purpleLight, accent: C.purpleMid },
  { year: "2020–2023", role: "Senior Software Engineer", company: "Origin Hubs",                location: "Apex, NC (Remote)",   bg: C.tealLight,   accent: "#2a7a6a" },
  { year: "2016–2020", role: "Full Stack Developer",     company: "AxisCare",                   location: "Waco, TX (Onsite)",   bg: C.blueLight,   accent: C.blueDark },
  { year: "2012–2016", role: "B.S. Computer Science",   company: "Univ. of Mary Hardin-Baylor", location: "Belton, TX",          bg: C.coralLight,  accent: "#9b5b3d" },
];

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Blob({ style, color, size = 300, br }) {
  return <div style={{ position: "absolute", width: size, height: size, background: color, borderRadius: br || "60% 40% 30% 70% / 60% 30% 70% 40%", opacity: 0.38, pointerEvents: "none", ...style }} />;
}

/* ── NAV ── */
function Nav({ active, setActive }) {
  const links = ["Home", "Work", "Skills", "About", "Contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 44px", background: "rgba(253,248,243,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(74,95,168,0.1)" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: C.purpleDark }}>
        Xavier <span style={{ color: C.purple, fontStyle: "italic" }}>Perez</span>
      </div>
      <div style={{ display: "flex", gap: 26 }}>
        {links.map(l => (
          <button key={l} onClick={() => setActive(l)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: active === l ? 500 : 400, color: active === l ? C.purpleMid : C.muted, padding: 0, borderBottom: active === l ? `2px solid ${C.purple}` : "2px solid transparent", paddingBottom: 2, transition: "color 0.2s" }}>{l}</button>
        ))}
      </div>
      <a href="mailto:xavieraperez8@outlook.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, padding: "9px 20px", borderRadius: 30, background: C.purpleMid, color: "#fff", textDecoration: "none" }}>Hire Me</a>
    </nav>
  );
}

/* ── HERO ── */
function Hero({ setActive }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", background: C.cream }}>
      <Blob style={{ top: -100, right: -80 }} color={C.purpleLight} size={440} />
      <Blob style={{ bottom: -100, left: -80 }} color={C.blueLight} size={380} br="30% 60% 70% 40% / 50% 60% 30% 60%" />
      <Blob style={{ top: "35%", right: "22%" }} color={C.tealLight} size={170} br="50% 50% 30% 70% / 40% 60% 40% 60%" />

      <div style={{ position: "relative", zIndex: 2, padding: "0 48px", maxWidth: 620, flex: "0 0 auto" }}>
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: "opacity 0.7s, transform 0.7s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 30, height: 1, background: C.purple, opacity: 0.5 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, letterSpacing: "2.5px", textTransform: "uppercase" }}>Senior Full Stack Engineer</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px,6.5vw,82px)", fontWeight: 300, color: C.purpleDark, lineHeight: 1.05, margin: "0 0 6px", letterSpacing: "-1px" }}>Xavier Ali</h1>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px,6.5vw,82px)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-1px" }}>
            <em style={{ color: C.purple, fontStyle: "italic", fontWeight: 400 }}>Perez.</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: C.muted, lineHeight: 1.78, maxWidth: 480, margin: "0 0 12px" }}>
            I build scalable, high-performance web applications across FinTech and Healthcare — turning complex systems into experiences that feel effortless.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, fontWeight: 300, margin: "0 0 34px" }}>
            📍 Harker Heights, TX &nbsp;·&nbsp;
            <a href="mailto:xavieraperez8@outlook.com" style={{ color: C.purpleMid, textDecoration: "none" }}>xavieraperez8@outlook.com</a>
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => setActive("Work")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "13px 30px", borderRadius: 40, background: C.purpleMid, color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(74,95,168,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,95,168,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,95,168,0.28)"; }}>View Projects</button>
            <button onClick={() => setActive("Contact")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400, padding: "13px 30px", borderRadius: 40, background: "transparent", color: C.purpleMid, border: `1.5px solid ${C.purple}`, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = C.purpleLight} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>Get In Touch</button>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", opacity: vis ? 1 : 0, transition: "opacity 1s 0.4s", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ borderRadius: 32, overflow: "hidden", background: "rgba(221,227,247,0.35)", backdropFilter: "blur(8px)", padding: 8, boxShadow: "0 16px 48px rgba(74,95,168,0.14)" }}>
          <Lottie src={LOTTIES.hero} width={290} height={290} />
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 290 }}>
          {[["9+", "Yrs Exp", C.purpleLight, C.purpleMid], ["3", "Industries", C.tealLight, "#2a7a6a"], ["20+", "Tech", C.blueLight, C.blueDark]].map(([n, l, bg, ac]) => (
            <div key={l} style={{ background: bg, borderRadius: 16, padding: "12px 18px", boxShadow: "0 4px 16px rgba(74,95,168,0.1)", flex: 1, minWidth: 72, textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: ac, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: ac, opacity: 0.75, marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {["FinTech", "Healthcare", "AI/LLM"].map((t, i) => (
            <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, padding: "3px 10px", borderRadius: 20, background: [C.purpleLight, C.tealLight, C.blueLight][i], color: [C.purpleMid, "#2a7a6a", C.blueDark][i] }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECT CARD (own component so hooks are valid) ── */
function ProjectCard({ p, index }) {
  const [r, pv] = useInView();
  const [h, setH] = useState(false);
  return (
    <div ref={r} style={{ opacity: pv ? 1 : 0, transform: pv ? "none" : "translateY(40px)", transition: `opacity 0.6s ${index * 0.1}s, transform 0.6s ${index * 0.1}s` }}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ borderRadius: 24, overflow: "hidden", background: C.white, border: `1px solid rgba(74,95,168,${h ? 0.28 : 0.1})`, transform: h ? "translateY(-6px)" : "none", boxShadow: h ? "0 24px 56px rgba(74,95,168,0.15)" : "0 2px 16px rgba(74,95,168,0.06)", transition: "all 0.3s", cursor: "pointer", height: "100%" }}>
        <div style={{ height: 190, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <Lottie src={p.lottie} width={155} height={155} />
          <div style={{ position: "absolute", top: 12, right: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: p.accent, background: C.white, padding: "3px 10px", borderRadius: 20 }}>{p.year}</div>
          <div style={{ position: "absolute", bottom: 10, left: 14, fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: p.accent, opacity: 0.7 }}>{p.company}</div>
        </div>
        <div style={{ padding: "18px 22px 22px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: p.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 7, fontWeight: 500 }}>{p.category}</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: C.purpleDark, margin: "0 0 8px", lineHeight: 1.2 }}>{p.title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.65, margin: "0 0 14px" }}>{p.description}</p>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {p.tags.map(t => <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, padding: "3px 9px", borderRadius: 20, background: p.bg, color: p.accent }}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── WORK ── */
function Work() {
  const [ref, iv] = useInView();
  return (
    <section style={{ padding: "96px 48px", background: C.cream, position: "relative", overflow: "hidden" }}>
      <Blob style={{ top: -60, right: -90 }} color={C.blueLight} size={300} br="50% 50% 30% 70%" />
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: 52, opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(24px)", transition: "all 0.6s" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>Selected Projects</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,52px)", fontWeight: 300, color: C.purpleDark, margin: 0, lineHeight: 1.1 }}>Things I've <em style={{ color: C.purple }}>shipped</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ── SKILL BAR (own component) ── */
function SkillBar({ s, index }) {
  const [r, sv] = useInView();
  return (
    <div ref={r} style={{ marginBottom: 18, opacity: sv ? 1 : 0, transition: `opacity 0.5s ${index * 0.07}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.purpleDark }}>{s.name}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted }}>{s.level}%</span>
      </div>
      <div style={{ height: 7, background: C.purpleLight, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 10, background: `linear-gradient(90deg,${C.purple},${C.teal})`, width: sv ? `${s.level}%` : "0%", transition: `width 1s ${index * 0.1}s cubic-bezier(0.4,0,0.2,1)` }} />
      </div>
    </div>
  );
}

/* ── TECH STACK CARD (own component) ── */
function TechCard({ label, items, index }) {
  const [r, tv] = useInView();
  return (
    <div ref={r} style={{ background: C.white, borderRadius: 14, padding: "14px 18px", border: "1px solid rgba(74,95,168,0.1)", opacity: tv ? 1 : 0, transform: tv ? "none" : "translateX(20px)", transition: `opacity 0.5s ${index * 0.08}s, transform 0.5s ${index * 0.08}s` }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.purple, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500, marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 300, lineHeight: 1.5 }}>{items}</div>
    </div>
  );
}

/* ── SKILLS ── */
function Skills() {
  const [ref, iv] = useInView();
  return (
    <section style={{ padding: "96px 48px", background: "#f4f1fb", position: "relative", overflow: "hidden" }}>
      <Blob style={{ bottom: -80, left: -60 }} color={C.blueLight} size={300} br="40% 60% 60% 40%" />
      <Blob style={{ top: 40, right: -40 }} color={C.purpleLight} size={220} br="60% 40% 50% 50%" />
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(24px)", transition: "all 0.6s", marginBottom: 52 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>Technical Skills</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,52px)", fontWeight: 300, color: C.purpleDark, margin: 0, lineHeight: 1.1 }}>My <em style={{ color: C.purple }}>tech stack</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
              <div style={{ background: C.purpleLight, borderRadius: 24, padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: 16, boxShadow: "0 4px 20px rgba(74,95,168,0.1)" }}>
                <Lottie src={LOTTIES.rocket} width={80} height={80} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: C.purpleMid }}>Full-Stack</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, fontWeight: 300 }}>9+ years of craft</div>
                </div>
              </div>
            </div>
            {skills.map((s, i) => <SkillBar key={s.name} s={s} index={i} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {techStack.map(({ label, items }, i) => <TechCard key={label} label={label} items={items} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TIMELINE ITEM (own component) ── */
function TimelineItem({ item, index, isLast }) {
  const [r, tv] = useInView();
  return (
    <div ref={r} style={{ display: "flex", gap: 14, marginBottom: 18, opacity: tv ? 1 : 0, transform: tv ? "none" : "translateX(20px)", transition: `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: item.accent, marginTop: 4, flexShrink: 0 }} />
        {!isLast && <div style={{ width: 1.5, flex: 1, background: `${item.accent}33`, marginTop: 4 }} />}
      </div>
      <div style={{ background: item.bg, borderRadius: 14, padding: "13px 16px", flex: 1, marginBottom: 4 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: item.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontWeight: 500 }}>{item.year}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: C.purpleDark, marginBottom: 2 }}>{item.role}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: item.accent }}>{item.company}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, fontWeight: 300, marginTop: 2 }}>{item.location}</div>
      </div>
    </div>
  );
}

/* ── ABOUT ── */
function About() {
  const [ref, iv] = useInView();
  return (
    <section style={{ padding: "96px 48px", background: C.cream, position: "relative", overflow: "hidden" }}>
      <Blob style={{ top: -60, right: -80 }} color={C.purpleLight} size={280} />
      <Blob style={{ bottom: -80, left: -40 }} color={C.tealLight} size={240} br="50% 50% 70% 30%" />
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div ref={ref} style={{ opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(24px)", transition: "all 0.6s", marginBottom: 50 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>About</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,52px)", fontWeight: 300, color: C.purpleDark, margin: 0, lineHeight: 1.1 }}>The journey <em style={{ color: C.purple }}>so far</em></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: 28, borderRadius: 28, overflow: "hidden", background: `linear-gradient(135deg,${C.purpleLight},${C.blueLight})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, boxShadow: "0 12px 40px rgba(74,95,168,0.14)" }}>
              <Lottie src={LOTTIES.about} width={260} height={200} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.82, marginBottom: 16 }}>
              I'm a Senior Full Stack Engineer with 9+ years of experience building production-grade applications across FinTech, Healthcare, and AI/LLM domains.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.82, marginBottom: 28 }}>
              I specialize in architecting scalable microservices, leading cloud migrations, and mentoring engineering teams — always with an eye for clean, maintainable code.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[["9+", "Yrs Exp"], ["3", "Industries"], ["20+", "Tech"]].map(([n, l]) => (
                <div key={l} style={{ background: C.purpleLight, borderRadius: 16, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: C.purpleMid, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.purpleMid, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {timeline.map((item, i) => <TimelineItem key={item.year} item={item} index={i} isLast={i === timeline.length - 1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [ref, iv] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const iStyle = { width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: C.purpleDark, background: C.white, border: "1.5px solid rgba(74,95,168,0.18)", borderRadius: 12, padding: "13px 16px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  return (
    <section style={{ padding: "96px 48px", background: "#f4f1fb", position: "relative", overflow: "hidden" }}>
      <Blob style={{ top: -80, right: -80 }} color={C.blueLight} size={340} />
      <Blob style={{ bottom: -60, left: -60 }} color={C.purpleLight} size={260} br="50% 50% 70% 30%" />
      <div ref={ref} style={{ maxWidth: 600, margin: "0 auto", opacity: iv ? 1 : 0, transform: iv ? "none" : "translateY(24px)", transition: "all 0.7s" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <Lottie src={LOTTIES.contact} width={140} height={110} />
        </div>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>Let's Work Together</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 300, color: C.purpleDark, margin: "0 0 12px", lineHeight: 1.1 }}>Got a project <em style={{ color: C.purple }}>in mind?</em></h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.7 }}>Open to senior engineering and tech lead roles. Let's build something great.</p>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {[["📧", "xavieraperez8@outlook.com"], ["📞", "+1 (832) 399-9578"], ["📍", "Harker Heights, TX"]].map(([ic, val]) => (
            <div key={val} style={{ background: C.white, borderRadius: 30, padding: "7px 16px", border: "1px solid rgba(74,95,168,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, fontWeight: 300 }}>{ic} {val}</div>
          ))}
        </div>
        {sent ? (
          <div style={{ textAlign: "center", padding: "44px 28px", background: C.purpleLight, borderRadius: 24 }}>
            <Lottie src={LOTTIES.success} width={120} height={120} loop={false} />
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: C.purpleDark, margin: "8px 0 8px" }}>Message sent!</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, margin: 0 }}>Xavier will be in touch soon.</p>
          </div>
        ) : (
          <div style={{ background: C.white, borderRadius: 26, padding: "34px", boxShadow: "0 8px 40px rgba(74,95,168,0.1)", border: "1px solid rgba(74,95,168,0.1)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              {[["Your name", "name", "Alex Johnson"], ["Email", "email", "alex@company.com"]].map(([label, key, ph]) => (
                <div key={key}>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, display: "block", marginBottom: 5 }}>{label}</label>
                  <input style={iStyle} value={form[key]} placeholder={ph} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} onFocus={e => e.currentTarget.style.borderColor = C.purple} onBlur={e => e.currentTarget.style.borderColor = "rgba(74,95,168,0.18)"} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, display: "block", marginBottom: 5 }}>Your message</label>
              <textarea style={{ ...iStyle, minHeight: 104, resize: "vertical", lineHeight: 1.6 }} value={form.message} placeholder="I'd love to discuss a senior engineering opportunity…" onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={e => e.currentTarget.style.borderColor = C.purple} onBlur={e => e.currentTarget.style.borderColor = "rgba(74,95,168,0.18)"} />
            </div>
            <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }} style={{ width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "14px", borderRadius: 40, background: C.purpleMid, color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(74,95,168,0.25)", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(74,95,168,0.38)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,95,168,0.25)"; }}>Send Message ✨</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background: C.purpleDark, padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 400, color: "#e8eaf6", fontStyle: "italic" }}>Xavier Ali Perez</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(232,234,246,0.32)", letterSpacing: "0.5px" }}>Senior Full Stack Engineer · Harker Heights, TX · 2026</div>
      <div style={{ display: "flex", gap: 18 }}>
        {["GitHub", "LinkedIn", "Email"].map(s => (
          <a key={s} href={s === "Email" ? "mailto:xavieraperez8@outlook.com" : "#"} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(232,234,246,0.38)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#c5caf5"} onMouseLeave={e => e.currentTarget.style.color = "rgba(232,234,246,0.38)"}>{s}</a>
        ))}
      </div>
    </footer>
  );
}

/* ── ROOT ── */
const SECTION_MAP = { Work, Skills, About, Contact };

export default function Portfolio() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(fonts);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const all = [
    { key: "hero",    El: () => <Hero setActive={setActive} /> },
    { key: "work",    El: Work },
    { key: "skills",  El: Skills },
    { key: "about",   El: About },
    { key: "contact", El: Contact },
  ];

  const toRender = active === "Home" ? all : [{ key: active, El: SECTION_MAP[active] }];

  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>
      <Nav active={active} setActive={setActive} />
      <div style={{ paddingTop: active !== "Home" ? 60 : 0 }}>
        {toRender.map(({ key, El }) => <El key={key} setActive={setActive} />)}
      </div>
      <Footer />
    </div>
  );
}
