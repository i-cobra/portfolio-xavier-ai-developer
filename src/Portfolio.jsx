import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

const resumeUrl = "/Xavier-Perez-AI-Developer.pdf";

const contact = {
  email: "xavieraperez8@outlook.com",
  phone: "+1 (832) 399-9578",
  location: "Harker Heights, TX",
  github: "https://github.com/xavierperez",
  linkedin: "https://linkedin.com/in/xavierperez",
};

const meetingUrl = "https://calendly.com/xavieraperez8";

const highlights = [
  ["9+", "years", "briefcase"],
  ["15%", "fewer payment failures", "chart"],
  ["25%", "risk prediction lift", "shield"],
  ["20%", "lower ops cost", "timer"],
];

const projects = [
  {
    title: "AI-Powered Healthcare Risk Prediction",
    company: "Origin Hubs",
    logo: "origin",
    year: "2020-2023",
    category: "Healthcare AI",
    description:
      "Deep learning models predicted patient risk from historical health data, supporting clinical decisions in a HIPAA-compliant environment.",
    tags: ["Deep Learning", "NLP", "AWS", "EHR APIs"],
  },
  {
    title: "Secure Payment AI Pipeline",
    company: "Supreme Optimization",
    logo: "supreme",
    year: "2023-Present",
    category: "FinTech AI",
    description:
      "Production ML pipelines for payment optimization, fraud detection, anomaly detection, and real-time transaction success prediction.",
    tags: ["Python", "Kubernetes", "AWS", "Anomaly Detection"],
  },
  {
    title: "NLP Chatbot for Healthcare",
    company: "Origin Hubs",
    logo: "origin",
    year: "2020-2023",
    category: "Conversational AI",
    description:
      "GPT-powered assistant for patient health questions, improving engagement and accessibility while integrating with secure healthcare workflows.",
    tags: ["GPT", "Transformers", "FastAPI", "NLP"],
  },
  {
    title: "Sentiment Analysis for Financial Services",
    company: "Supreme Optimization",
    logo: "supreme",
    year: "2023-Present",
    category: "Financial NLP",
    description:
      "NLP models analyzed market and financial news signals for investor decision support and early market-movement insight.",
    tags: ["BERT", "Text Classification", "SQL", "Kafka"],
  },
];

const skillGroups = [
  {
    label: "ML Frameworks",
    icon: "brain",
    items: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "OpenCV", "Hugging Face"],
  },
  {
    label: "NLP",
    icon: "message",
    items: ["NER", "Text Classification", "Sentiment Analysis", "Transformers", "BERT", "GPT"],
  },
  {
    label: "Data & Analytics",
    icon: "chart",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "SQL"],
  },
  {
    label: "Cloud & DevOps",
    icon: "cloud",
    items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    label: "Languages",
    icon: "code",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "Tools & Databases",
    icon: "database",
    items: ["Jupyter", "Apache Kafka", "FastAPI", "Nginx", "MongoDB", "PostgreSQL", "Redis", "MySQL"],
  },
];

const experience = [
  {
    role: "Senior AI Engineer",
    company: "Supreme Optimization",
    logo: "supreme",
    location: "Dallas, TX (Remote)",
    dates: "08/2023-Present",
    bullets: [
      "Spearheaded ML model design and deployment for secure payment processing, fraud detection, and transaction optimization.",
      "Architected scalable AI pipelines on AWS and Kubernetes for large-scale data ingestion and real-time inference.",
      "Built models predicting transaction success rates, reducing failures by 15%.",
    ],
  },
  {
    role: "AI Solutions Engineer",
    company: "Origin Hubs",
    logo: "origin",
    location: "Apex, NC (Remote)",
    dates: "04/2020-07/2023",
    bullets: [
      "Developed HIPAA-compliant healthcare AI using NLP and ML to predict health risks and support clinician decisions.",
      "Built deep learning systems for medical record analysis, patient condition classification, and risk assessment.",
      "Helped migrate predictive services to AWS, improving scalability and cutting operational costs by 20%.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "AxisCare",
    logo: "axiscare",
    location: "Waco, TX (Onsite)",
    dates: "06/2016-03/2020",
    bullets: [
      "Built dynamic React front ends and integrated predictive analytics to improve UX and responsiveness.",
      "Developed payment microservices with AI-driven fraud detection and security features.",
      "Established Jest and Cypress automation for reliable delivery of AI-enabled features.",
    ],
  },
];

const certifications = [
  "Certified TensorFlow Developer",
  "AWS Certified Machine Learning - Specialty",
  "Deep Learning Specialization - Coursera (Andrew Ng)",
  "NLP with Deep Learning - Stanford University",
];

const navItems = ["Home", "Work", "Skills", "Experience", "Contact"];

function Icon({ name }) {
  const paths = {
    arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.8 12.5-1.3 6.3 4.5-2.5 4.5 2.5-1.3-6.3" />
      </>
    ),
    brain: (
      <>
        <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 5.5 1.7" />
        <path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-5.5 1.7" />
        <path d="M9 8h2m2 0h2M9 12h6m-3-8v16" />
      </>
    ),
    briefcase: (
      <>
        <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
        <rect x="4" y="6" width="16" height="13" rx="2" />
        <path d="M4 11h16m-8 0v2" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M8 3v4m8-4v4M4 10h16" />
      </>
    ),
    chart: <path d="M4 19V5m0 14h16M8 16l3-4 3 2 5-7" />,
    cloud: <path d="M17.5 18H8a4 4 0 1 1 .8-7.9A5.5 5.5 0 0 1 19 12.5 2.8 2.8 0 0 1 17.5 18Z" />,
    code: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />,
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      </>
    ),
    download: <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14" />,
    external: <path d="M14 4h6v6m0-6-8 8M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />,
    github: (
      <>
        <path d="M9 19c-5 1.5-5-2.5-7-3" />
        <path d="M15 22v-3.5c.1-1-.3-1.8-.8-2.3 2.8-.3 5.8-1.4 5.8-6.2a4.8 4.8 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 3.1 5.6 3.4 5.6 3.4a4.4 4.4 0 0 0-.1 3.3A4.8 4.8 0 0 0 4.2 10c0 4.8 3 5.9 5.8 6.2-.5.5-.9 1.2-.8 2.3V22" />
      </>
    ),
    linkedin: <path d="M6 9v11M6 5v.01M11 20v-7a4 4 0 0 1 8 0v7M11 9v11" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    mapPin: (
      <>
        <path d="M12 22s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm0-13v5m0 3v.01" />,
    spark: <path d="m12 3 1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3Z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
      </>
    ),
    timer: (
      <>
        <circle cx="12" cy="13" r="7" />
        <path d="M12 13V9m0 4 3 2M9 2h6" />
      </>
    ),
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] ?? paths.spark}
    </svg>
  );
}

function CompanyLogo({ name, label }) {
  if (name === "supreme") {
    return (
      <span className="company-logo company-logo-supreme" aria-label={`${label} logo`}>
        <svg viewBox="0 0 80 80" role="img">
          <rect width="80" height="80" rx="11" />
          <path d="M42 9v62" />
          <path d="M42 10C20 10 5 17 5 30c0 22 70 8 70 32 0 9-13 13-32 13" />
          <path d="M43 10C25 10 17 17 17 30c0 20 49 7 49 29 0 9-11 13-25 13" />
          <path d="M42 23H23" />
          <path d="M42 57h22" />
        </svg>
      </span>
    );
  }

  if (name === "origin") {
    return (
      <span className="company-logo company-logo-origin" aria-label={`${label} logo`}>
        <svg viewBox="0 0 80 80" role="img">
          <path className="origin-arc-yellow" d="M18 61A31 31 0 0 1 34 11" />
          <path className="origin-arc-blue" d="M39 8a31 31 0 0 1 25 12" />
          <path className="origin-arc-orange" d="M31 70a31 31 0 0 0 25-2" />
          <path className="origin-stem" d="M25 24v36" />
          <path className="origin-stem" d="M55 22v38" />
          <path className="origin-bridge" d="M25 43c12 15 25 13 30-3" />
          <circle className="origin-orange" cx="30" cy="15" r="8" />
          <circle className="origin-yellow" cx="58" cy="17" r="7" />
          <path className="origin-leaf" d="M14 60c2-10 10-17 22-19-1 12-9 20-22 19z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="company-logo company-logo-axis" aria-label={`${label} logo`}>
      <svg viewBox="0 0 80 80" role="img">
        <circle className="axis-yellow" cx="25" cy="11" r="7" />
        <circle className="axis-blue" cx="63" cy="35" r="7" />
        <circle className="axis-cyan" cx="18" cy="67" r="7" />
        <path className="axis-yellow-stroke" d="M25 18c18 13 22 36 3 49" />
        <path className="axis-cyan-stroke" d="M18 67c2-27 25-47 45-32" />
        <path className="axis-blue-stroke" d="M63 35C45 63 20 57 25 18" />
        <path className="axis-core" d="M30 55C37 36 50 27 65 35" />
      </svg>
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Section({ id, eyebrow, title, action, children, tone = "light" }) {
  const [ref, visible] = useInView();
  return (
    <section id={id.toLowerCase()} className={`section section-${tone}`}>
      <div className="section-inner">
        <div ref={ref} className={`section-heading ${visible ? "is-visible" : ""}`}>
          {eyebrow ? (
            <span>
              <Icon name="spark" />
              {eyebrow}
            </span>
          ) : null}
          {title ? <h2>{title}</h2> : null}
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

function Nav({ active, onNavigate }) {
  return (
    <nav className="nav">
      <button className="brand" onClick={() => onNavigate("Home")}>
        Xavier <em>Perez</em>
      </button>
      <div className="nav-links">
        {navItems.map((item) => (
          <button
            key={item}
            className={active === item ? "is-active" : ""}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="nav-actions">
        <a className="nav-cta nav-cta-secondary" href={resumeUrl} target="_blank" rel="noreferrer">
          Resume
          <Icon name="external" />
        </a>
        <a className="nav-cta" href={meetingUrl} target="_blank" rel="noreferrer">
          Schedule Meeting
          <Icon name="calendar" />
        </a>
      </div>
    </nav>
  );
}

function Hero({ onNavigate }) {
  return (
    <header id="home" className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <Icon name="spark" />
          Senior AI Engineer
        </div>
        <h1>
          Xavier <span>Perez</span>
        </h1>
        <p>
          I design and ship production-grade AI systems across healthcare and finance,
          combining machine learning, NLP, cloud infrastructure, and full-stack execution.
        </p>
        <div className="hero-actions">
          <button onClick={() => onNavigate("Work")}>
            View AI Projects
            <Icon name="arrowRight" />
          </button>
          <a href={`mailto:${contact.email}`}>
            Get in Touch
            <Icon name="mail" />
          </a>
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            Download Resume
            <Icon name="download" />
          </a>
        </div>
        <div className="contact-strip">
          <span>
            <Icon name="mapPin" />
            {contact.location}
          </span>
          <a href={`mailto:${contact.email}`}>
            <Icon name="mail" />
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
            <Icon name="phone" />
            {contact.phone}
          </a>
        </div>
      </div>
      <div className="hero-panel" aria-label="Career highlights">
        <div className="hero-card">
          <span>
            <Icon name="target" />
            Focus Areas
          </span>
          <strong>ML, NLP, Deep Learning</strong>
          <p>Scalable AI systems for regulated, high-volume product environments.</p>
        </div>
        <div className="metric-grid">
          {highlights.map(([value, label, icon]) => (
            <div className="metric" key={label}>
              <Icon name={icon} />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Work() {
  return (
    <Section
      id="Work"
      eyebrow="Selected AI Projects"
      action={
        <button className="section-action" type="button">
          View all projects
          <Icon name="arrowRight" />
        </button>
      }
    >
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="company-header">
              <CompanyLogo name={project.logo} label={project.company} />
              <small>{project.company}</small>
            </div>
            <div className="project-meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="Skills" eyebrow="Core Skills" tone="tint">
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.label}>
            <h3>
              <Icon name={group.icon} />
              {group.label}
            </h3>
            <div className="tag-row">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
        <article className="certifications">
          <h3>
            <Icon name="award" />
            Certifications
          </h3>
          {certifications.map((cert) => (
            <span key={cert}>{cert}</span>
          ))}
        </article>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="Experience" eyebrow="Professional Experience">
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-card" key={`${item.company}-${item.dates}`}>
            <div className="experience-topline">
              <div className="experience-company">
                <CompanyLogo name={item.logo} label={item.company} />
                <div>
                  <h3>{item.role}</h3>
                  <p>
                    {item.company} - {item.location}
                  </p>
                </div>
              </div>
              <span>{item.dates}</span>
            </div>
            <div className="experience-details">
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <article className="education-card">
        <span>Education</span>
        <h3>Bachelor of Science in Computer Science</h3>
        <p>University of Mary Hardin-Baylor - Belton, TX</p>
        {/* <small>
          Relevant coursework: Machine Learning, Artificial Intelligence, Data Structures &
          Algorithms, Computational Neuroscience, Cloud Computing, Data Science.
        </small> */}
      </article>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <Section id="Contact" tone="tint">
      <div className="contact-layout">
        <div className="contact-intro">
          <span className="eyebrow">
            <Icon name="mail" />
            Contact
          </span>
          <h2>Build the next AI product together</h2>
          <p>I'm open to discussing AI engineering roles, collaborations, and impactful projects.</p>
        </div>
        <div className="contact-card">
          <a href={`mailto:${contact.email}`}>
            <Icon name="mail" />
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
            <Icon name="phone" />
            {contact.phone}
          </a>
          <span>
            <Icon name="mapPin" />
            {contact.location}
          </span>
          <a href={contact.github} target="_blank" rel="noreferrer">
            <Icon name="github" />
            GitHub
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            <Icon name="linkedin" />
            LinkedIn
          </a>
        </div>
        {sent ? (
          <div className="form-card success-card">
            <h3>Message ready</h3>
            <p>Thanks. Xavier will be in touch soon.</p>
          </div>
        ) : (
          <form
            className="form-card"
            onSubmit={(event) => {
              event.preventDefault();
              if (form.name && form.email && form.message) setSent(true);
            }}
          >
            <label>
              Name
              <input name="name" value={form.name} onChange={updateField} placeholder="Alex Johnson" />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="alex@company.com"
              />
            </label>
            <label className="full">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="I would like to discuss a senior AI engineering role..."
              />
            </label>
            <button type="submit">
              Send Message
              <Icon name="arrowRight" />
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Xavier Perez</span>
      <small>Senior AI Engineer - Harker Heights, TX - 2026</small>
      <div>
        <a href={contact.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${contact.email}`}>Email</a>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;700&display=swap";
    document.head.appendChild(fontLink);
    return () => document.head.removeChild(fontLink);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    function updateActiveSection() {
      const navHeight = document.querySelector(".nav")?.offsetHeight ?? 0;
      const probeY = navHeight + window.innerHeight * 0.28;
      let currentSection = "Home";

      navItems.forEach((item) => {
        const section = document.getElementById(item.toLowerCase());
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > navHeight + 12) {
          currentSection = item;
        }
      });

      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (isAtPageBottom) currentSection = "Contact";

      setActive((current) => (current === currentSection ? current : currentSection));
    }

    function handleScroll() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function handleNavigate(item) {
    const section = document.getElementById(item.toLowerCase());
    if (!section) return;

    const navHeight = document.querySelector(".nav")?.offsetHeight ?? 0;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - navHeight;
    setActive(item);
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  }

  return (
    <div className="portfolio-shell">
      <Nav active={active} onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <Work />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
