/* global React */
const { useEffect, useRef, useState } = React;

// =============================================================
// Variation B — Terminal-inspired
// Monospace-forward, tighter density, command-prompt motifs
// =============================================================

const B_PALETTE = {
  bg: "#0b0c0d",
  bgElev: "#111315",
  line: "#1f2225",
  text: "#dcdcd6",
  dim: "#7c7e7a",
  dimmer: "#4a4c48",
  accent: "oklch(0.82 0.13 145)", // soft terminal green
  accentSoft: "oklch(0.82 0.13 145 / 0.10)",
  warn: "oklch(0.82 0.13 70)",
};

const bStyles = {
  page: {
    background: B_PALETTE.bg,
    color: B_PALETTE.text,
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
    fontFeatureSettings: '"liga" 0',
    lineHeight: 1.55,
    minHeight: "100%",
  },
  sans: {
    fontFamily: "'Inter', system-ui, sans-serif",
  },
};

function BReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 600ms ease, transform 600ms ease",
      }}
    >
      {children}
    </div>
  );
}

// Background grid
function BGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: `linear-gradient(${B_PALETTE.line} 1px, transparent 1px), linear-gradient(90deg, ${B_PALETTE.line} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        opacity: 0.35,
        maskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
      }}
    />
  );
}

function BPrompt({ user = "wj", host = "boshoff.dev", path = "~", cmd, children }) {
  return (
    <div style={{ fontSize: 13, lineHeight: 1.7 }}>
      <span style={{ color: B_PALETTE.accent }}>{user}@{host}</span>
      <span style={{ color: B_PALETTE.dim }}>:</span>
      <span style={{ color: "oklch(0.78 0.10 250)" }}>{path}</span>
      <span style={{ color: B_PALETTE.dim }}>$ </span>
      <span style={{ color: B_PALETTE.text }}>{cmd}</span>
      {children && <div style={{ marginTop: 6 }}>{children}</div>}
    </div>
  );
}

function BNav() {
  const items = [
    { href: "#work", label: "work" },
    { href: "#exp", label: "experience" },
    { href: "#stack", label: "stack" },
    { href: "#about", label: "about" },
    { href: "#contact", label: "contact" },
  ];
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: `${B_PALETTE.bg}d9`,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${B_PALETTE.line}`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12.5,
        }}
      >
        <div>
          <span style={{ color: B_PALETTE.accent }}>~/wj-boshoff</span>
          <span style={{ color: B_PALETTE.dim, marginLeft: 8 }}>(main)</span>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              style={{
                color: B_PALETTE.dim,
                textDecoration: "none",
                fontSize: 12.5,
                transition: "color 180ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = B_PALETTE.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = B_PALETTE.dim;
              }}
            >
              ./{it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function BHero({ data }) {
  const [typed, setTyped] = useState("");
  const fullCmd = "cat about.md";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(fullCmd.slice(0, i));
      if (i >= fullCmd.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px 100px", position: "relative", zIndex: 1 }}>
      <div
        style={{
          border: `1px solid ${B_PALETTE.line}`,
          background: B_PALETTE.bgElev,
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* terminal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            borderBottom: `1px solid ${B_PALETTE.line}`,
            background: B_PALETTE.bg,
            gap: 8,
          }}
        >
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#3a3c39" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#3a3c39" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#3a3c39" }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: B_PALETTE.dim }}>
            wj@boshoff — bash — 100×30
          </div>
        </div>

        <div style={{ padding: "28px 28px 36px" }}>
          <BPrompt cmd={`whoami`}>
            <div style={{ color: B_PALETTE.text, fontSize: 13, paddingLeft: 0 }}>WJ Boshoff</div>
          </BPrompt>

          <div style={{ height: 14 }} />

          <BPrompt cmd={typed + (typed.length < fullCmd.length ? "▌" : "")}>
            {typed.length >= fullCmd.length && (
              <BReveal delay={80}>
                <div style={{ paddingLeft: 0, marginTop: 10 }}>
                  <div
                    style={{
                      ...bStyles.sans,
                      fontSize: "clamp(36px, 5.5vw, 64px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      fontWeight: 500,
                      color: B_PALETTE.text,
                      marginBottom: 18,
                    }}
                  >
                    Software engineer.
                    <br />
                    <span style={{ color: B_PALETTE.accent }}>Full-stack</span>, <span style={{ color: B_PALETTE.accent }}>cloud-native</span>, <span style={{ color: B_PALETTE.accent }}>AI-augmented</span>.
                  </div>
                  <div style={{ ...bStyles.sans, fontSize: 16, lineHeight: 1.6, color: B_PALETTE.dim, maxWidth: 620, marginBottom: 22 }}>
                    {data.shortAbout}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <BTag label="📍 Centurion, ZA" />
                    <BTag label="● Available" accent />
                    <BTag label={`since ${data.startedPro}`} />
                  </div>
                </div>
              </BReveal>
            )}
          </BPrompt>

          {typed.length >= fullCmd.length && (
            <BReveal delay={300}>
              <div style={{ marginTop: 28 }}>
                <BPrompt cmd="ls ./quick-links" />
                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, fontSize: 12.5 }}>
                  <BFile name="email" value={data.email} href={`mailto:${data.email}`} />
                  <BFile name="github" value="github.com/WJ-Bos" href={data.github} />
                  <BFile name="phone" value="079 873 7177" />
                  <BFile name="resume.pdf" value="download" href="./resume.pdf" />
                </div>
              </div>
            </BReveal>
          )}

          {typed.length >= fullCmd.length && (
            <BReveal delay={500}>
              <div style={{ marginTop: 22 }}>
                <BPrompt cmd="" />
                <div style={{ display: "inline-block", width: 8, height: 16, background: B_PALETTE.accent, marginLeft: -8, animation: "bblink 1s step-end infinite", verticalAlign: "middle" }} />
              </div>
            </BReveal>
          )}
        </div>
      </div>

      <style>{`@keyframes bblink { 50% { opacity: 0; } }`}</style>
    </section>
  );
}

function BTag({ label, accent = false }) {
  return (
    <span
      style={{
        fontSize: 11.5,
        padding: "5px 10px",
        border: `1px solid ${accent ? B_PALETTE.accent : B_PALETTE.line}`,
        borderRadius: 4,
        color: accent ? B_PALETTE.accent : B_PALETTE.dim,
        background: accent ? B_PALETTE.accentSoft : "transparent",
      }}
    >
      {label}
    </span>
  );
}

function BFile({ name, value, href }) {
  const [hover, setHover] = useState(false);
  const Wrap = href ? "a" : "div";
  return (
    <Wrap
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        padding: "10px 12px",
        border: `1px solid ${B_PALETTE.line}`,
        borderRadius: 4,
        background: hover ? B_PALETTE.accentSoft : "transparent",
        textDecoration: "none",
        color: "inherit",
        cursor: href ? "pointer" : "default",
        transition: "background 180ms",
      }}
    >
      <div style={{ color: hover ? B_PALETTE.accent : B_PALETTE.text, fontSize: 12.5 }}>
        ./{name}
      </div>
      <div style={{ color: B_PALETTE.dim, fontSize: 11, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value}
      </div>
    </Wrap>
  );
}

function BSectionHeader({ tag, count, sub }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        marginBottom: 32,
        paddingBottom: 14,
        borderBottom: `1px dashed ${B_PALETTE.line}`,
      }}
    >
      <span style={{ color: B_PALETTE.accent, fontSize: 14 }}>$</span>
      <span style={{ color: B_PALETTE.text, fontSize: 14 }}>{tag}</span>
      {count != null && <span style={{ color: B_PALETTE.dim, fontSize: 12 }}>// {count} entries</span>}
      {sub && <span style={{ color: B_PALETTE.dim, fontSize: 12, marginLeft: "auto" }}>{sub}</span>}
    </div>
  );
}

function BWork({ data }) {
  return (
    <section id="work" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 80px", position: "relative", zIndex: 1 }}>
      <BSectionHeader tag={`grep -r "shipped" ./projects`} count={data.projects.length} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {data.projects.map((p, i) => (
          <BReveal key={p.name} delay={i * 70}>
            <BProjectCard project={p} />
          </BReveal>
        ))}
      </div>
    </section>
  );
}

function BProjectCard({ project }) {
  const [hover, setHover] = useState(false);
  const isLink = !!project.url;
  const Wrap = isLink ? "a" : "div";
  return (
    <Wrap
      href={project.url}
      target={isLink ? "_blank" : undefined}
      rel={isLink ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        background: B_PALETTE.bgElev,
        border: `1px solid ${hover ? B_PALETTE.accent : B_PALETTE.line}`,
        borderRadius: 6,
        padding: 20,
        textDecoration: "none",
        color: "inherit",
        cursor: isLink ? "pointer" : "default",
        transition: "border-color 200ms, transform 200ms",
        transform: hover ? "translateY(-2px)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* file-tab corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "4px 10px",
          fontSize: 10,
          color: B_PALETTE.dim,
          background: B_PALETTE.bg,
          borderLeft: `1px solid ${B_PALETTE.line}`,
          borderBottom: `1px solid ${B_PALETTE.line}`,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {project.kind} · {project.year}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
        <span style={{ color: B_PALETTE.accent, fontSize: 13 }}>▸</span>
        <span style={{ ...bStyles.sans, fontSize: 22, fontWeight: 600, color: B_PALETTE.text, letterSpacing: "-0.01em" }}>
          {project.name}
        </span>
        {isLink && (
          <span
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: hover ? B_PALETTE.accent : B_PALETTE.dim,
              transform: hover ? "translate(2px,-2px)" : "none",
              transition: "transform 180ms, color 180ms",
            }}
          >
            ↗
          </span>
        )}
      </div>
      <div style={{ ...bStyles.sans, fontSize: 13, color: B_PALETTE.accent, marginTop: 4, marginBottom: 12, fontStyle: "italic" }}>
        {project.tag}
      </div>
      <p style={{ ...bStyles.sans, margin: 0, fontSize: 13.5, color: B_PALETTE.dim, lineHeight: 1.55, marginBottom: 14 }}>
        {project.description}
      </p>

      <div style={{ borderTop: `1px dashed ${B_PALETTE.line}`, paddingTop: 12 }}>
        <div style={{ fontSize: 10, color: B_PALETTE.dimmer, letterSpacing: "0.14em", marginBottom: 6, textTransform: "uppercase" }}>
          // stack
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 10.5,
                color: B_PALETTE.dim,
                padding: "2px 7px",
                background: B_PALETTE.bg,
                border: `1px solid ${B_PALETTE.line}`,
                borderRadius: 3,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {project.urlLabel && (
        <div style={{ fontSize: 11, color: B_PALETTE.dim, marginTop: 12 }}>
          <span style={{ color: B_PALETTE.dimmer }}>↳ </span>
          {project.urlLabel}
        </div>
      )}
    </Wrap>
  );
}

function BExperience({ data }) {
  return (
    <section id="exp" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 80px", position: "relative", zIndex: 1 }}>
      <BSectionHeader tag="git log --author='WJ' --since='2025-01'" />
      {data.experience.map((job) => (
        <BReveal key={job.company}>
          <div
            style={{
              border: `1px solid ${B_PALETTE.line}`,
              borderRadius: 6,
              background: B_PALETTE.bgElev,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${B_PALETTE.line}`,
                background: B_PALETTE.bg,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div style={{ ...bStyles.sans, fontSize: 20, fontWeight: 600, color: B_PALETTE.text, letterSpacing: "-0.01em" }}>
                  {job.role} <span style={{ color: B_PALETTE.dim, fontWeight: 400 }}>@</span>{" "}
                  <span style={{ color: B_PALETTE.accent }}>{job.company}</span>
                </div>
                <div style={{ fontSize: 11.5, color: B_PALETTE.dim, marginTop: 2 }}>
                  {job.location}
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: B_PALETTE.dim }}>
                <span style={{ color: B_PALETTE.accent }}>{job.from}</span> → {job.to}
              </div>
            </div>
            <div style={{ padding: "20px 20px 24px", display: "grid", gap: 22 }}>
              {job.groups.map((g) => (
                <div key={g.title}>
                  <div style={{ fontSize: 12, color: B_PALETTE.accent, marginBottom: 8 }}>
                    <span style={{ color: B_PALETTE.dimmer }}>// </span>
                    {g.title}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
                    {g.bullets.map((b, i) => (
                      <li
                        key={i}
                        style={{
                          ...bStyles.sans,
                          fontSize: 13.5,
                          lineHeight: 1.55,
                          color: B_PALETTE.text,
                          paddingLeft: 18,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: B_PALETTE.dimmer, fontFamily: "'JetBrains Mono', monospace" }}>+</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </BReveal>
      ))}
    </section>
  );
}

function BStack({ data }) {
  const entries = Object.entries(data.stack);
  return (
    <section id="stack" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 80px", position: "relative", zIndex: 1 }}>
      <BSectionHeader tag="cat ~/.toolbox" count={entries.length} />
      <div
        style={{
          background: B_PALETTE.bgElev,
          border: `1px solid ${B_PALETTE.line}`,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {entries.map(([cat, items], i) => (
          <BReveal key={cat} delay={i * 40}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: 24,
                padding: "16px 20px",
                borderBottom: i === entries.length - 1 ? "none" : `1px solid ${B_PALETTE.line}`,
                alignItems: "baseline",
              }}
            >
              <div style={{ fontSize: 12.5, color: B_PALETTE.accent }}>
                {cat.toLowerCase()}/
              </div>
              <div style={{ ...bStyles.sans, fontSize: 13.5, color: B_PALETTE.text, lineHeight: 1.7 }}>
                {items.join("  ·  ")}
              </div>
            </div>
          </BReveal>
        ))}
      </div>
    </section>
  );
}

function BAbout({ data }) {
  return (
    <section id="about" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 80px", position: "relative", zIndex: 1 }}>
      <BSectionHeader tag="cat about.md" />
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 40, alignItems: "start" }}>
        <BReveal>
          <div
            style={{
              aspectRatio: "1",
              background: B_PALETTE.bgElev,
              border: `1px solid ${B_PALETTE.line}`,
              borderRadius: 6,
              display: "grid",
              placeItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 6px, ${B_PALETTE.line} 6px, ${B_PALETTE.line} 7px)`,
                opacity: 0.6,
              }}
            />
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: B_PALETTE.dim, letterSpacing: "0.16em" }}>./photo.jpg</div>
              <div style={{ fontSize: 10, color: B_PALETTE.dimmer, marginTop: 4 }}>placeholder</div>
            </div>
          </div>
        </BReveal>
        <BReveal delay={100}>
          <div style={{ ...bStyles.sans, display: "grid", gap: 16, fontSize: 15, lineHeight: 1.6, color: B_PALETTE.text }}>
            {data.longAbout.map((p, i) => (
              <p key={i} style={{ margin: 0 }}>{p}</p>
            ))}
          </div>

          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 11.5, color: B_PALETTE.accent, marginBottom: 10 }}>// education</div>
              {data.education.map((e) => (
                <div key={e.qualification} style={{ marginBottom: 12 }}>
                  <div style={{ ...bStyles.sans, fontSize: 13, color: B_PALETTE.text }}>{e.qualification}</div>
                  <div style={{ fontSize: 11, color: B_PALETTE.dim, marginTop: 2 }}>
                    {e.school} · {e.from}–{e.to}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: B_PALETTE.accent, marginBottom: 10 }}>// languages</div>
              {data.languages.map((l) => (
                <div key={l.name} style={{ ...bStyles.sans, fontSize: 13, color: B_PALETTE.text, marginBottom: 4 }}>
                  {l.name} <span style={{ color: B_PALETTE.dim, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>— {l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </BReveal>
      </div>
    </section>
  );
}

function BContact({ data }) {
  return (
    <section id="contact" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px 100px", position: "relative", zIndex: 1 }}>
      <BSectionHeader tag="curl mailto:wjbosdev@gmail.com" />
      <BReveal>
        <div
          style={{
            background: B_PALETTE.bgElev,
            border: `1px solid ${B_PALETTE.line}`,
            borderRadius: 6,
            padding: 32,
          }}
        >
          <div
            style={{
              ...bStyles.sans,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: B_PALETTE.text,
              marginBottom: 8,
            }}
          >
            Let's build something.
          </div>
          <div style={{ ...bStyles.sans, fontSize: 15, color: B_PALETTE.dim, marginBottom: 28, maxWidth: 540 }}>
            Open to roles in Centurion / Johannesburg / Pretoria, remote-friendly across SA. Always happy to chat about systems, side projects, or coffee.
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <BContactLine icon="@" label="email" value={data.email} href={`mailto:${data.email}`} />
            <BContactLine icon="☎" label="phone" value={data.phone} href={`tel:${data.phone.replace(/\s/g, "")}`} />
            <BContactLine icon="⎇" label="github" value="github.com/WJ-Bos" href={data.github} />
            <BContactLine icon="⌖" label="location" value={data.location} />
          </div>
        </div>
      </BReveal>

      <div
        style={{
          marginTop: 60,
          paddingTop: 20,
          borderTop: `1px dashed ${B_PALETTE.line}`,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: B_PALETTE.dim,
        }}
      >
        <span>$ exit 0</span>
        <span>© {new Date().getFullYear()} · last commit: today</span>
      </div>
    </section>
  );
}

function BContactLine({ icon, label, value, href }) {
  const [hover, setHover] = useState(false);
  const Wrap = href ? "a" : "div";
  return (
    <Wrap
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "30px 100px 1fr 24px",
        gap: 14,
        alignItems: "baseline",
        padding: "10px 12px",
        borderRadius: 4,
        background: hover ? B_PALETTE.accentSoft : "transparent",
        textDecoration: "none",
        color: "inherit",
        cursor: href ? "pointer" : "default",
        transition: "background 180ms",
      }}
    >
      <span style={{ color: B_PALETTE.accent, fontSize: 14, textAlign: "center" }}>{icon}</span>
      <span style={{ color: B_PALETTE.dim, fontSize: 12 }}>{label}</span>
      <span style={{ ...bStyles.sans, color: hover && href ? B_PALETTE.accent : B_PALETTE.text, fontSize: 14.5 }}>{value}</span>
      {href && (
        <span style={{ color: hover ? B_PALETTE.accent : B_PALETTE.dimmer, transform: hover ? "translateX(3px)" : "none", transition: "transform 180ms, color 180ms" }}>
          →
        </span>
      )}
    </Wrap>
  );
}

function VariationB() {
  const data = window.PORTFOLIO;
  return (
    <div style={bStyles.page}>
      <BGrid />
      <BNav />
      <BHero data={data} />
      <BWork data={data} />
      <BExperience data={data} />
      <BStack data={data} />
      <BAbout data={data} />
      <BContact data={data} />
    </div>
  );
}

window.VariationB = VariationB;
