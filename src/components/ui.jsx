import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function Mark({ size = 26 }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#171717" />
      <path d="M8 9.2h3.1l4.9 8.2 4.9-8.2H24l-6.6 10.6V23h-2.8v-3.2L8 9.2Z" fill="#f6f5f1" />
      <rect x="22.5" y="20" width="4" height="4" rx="1" fill="#839f55" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Reveal({ children, className = "", style, as: Tag = "div" }) {
  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}

export function CountUp({ value, format = "usd" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        if (reduced) {
          setN(value);
          return;
        }
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const text =
    format === "usd"
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(n)
      : format === "year"
        ? String(Math.round(n))
        : new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 0 }).format(n);

  return (
    <strong ref={ref} className="tabular">
      {text}
    </strong>
  );
}

export function TextLink({ to, href, children }) {
  const inner = (
    <>
      {children} <Arrow />
    </>
  );
  if (to) return <Link className="link-arrow" to={to}>{inner}</Link>;
  return <a className="link-arrow" href={href}>{inner}</a>;
}

export function PageHero({ eyebrow, title, lede, actions }) {
  return (
    <header className="page-hero wrap">
      {eyebrow ? <div className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div> : null}
      <h1 className="display-m">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {actions ? <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>{actions}</div> : null}
    </header>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
