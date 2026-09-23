import { useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

let arriving = false;
let transitionDone = Promise.resolve();

const groups = [
  [".hero", false],
  [".page-hero", false],
  [".stats", false],
  [".product-grid", false],
  [".secure-grid", false],
  [".eco-grid", false],
  [".steps", false],
  [".post-grid", false],
  [".logo-wall", true],
  [".split", false],
  [".two", true],
  [".form-grid", true],
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mark(el, index, section) {
  if (el.dataset.entered === "1") return el;
  el.classList.add("enter", "enter--pending");
  el.classList.toggle("enter--section", section);
  el.style.setProperty("--enter-index", String(index));
  return el;
}

function reveal(el) {
  el.dataset.entered = "1";
  el.classList.remove("enter--pending");
}

export function useSiteMotion() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("site-motion");
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const raw = anchor.getAttribute("href") || "";
      if (raw.startsWith("mailto:") || raw.startsWith("tel:")) return;
      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePage) {
        flushSync(() => window.dispatchEvent(new Event("tm-close-nav")));
        return;
      }
      if (typeof document.startViewTransition !== "function" || prefersReducedMotion()) {
        flushSync(() => window.dispatchEvent(new Event("tm-close-nav")));
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      arriving = true;
      const to = `${url.pathname}${url.search}${url.hash}`;
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          window.dispatchEvent(new Event("tm-close-nav"));
          navigate(to);
        });
        window.scrollTo(0, 0);
      });
      transitionDone = transition.finished.catch(() => {});
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  useLayoutEffect(() => {
    const main = document.getElementById("main");
    if (!main || prefersReducedMotion()) return undefined;

    const stamped = [];
    for (const [selector, section] of groups) {
      main.querySelectorAll(selector).forEach((parent) => {
        [...parent.children].forEach((child, index) => {
          if (child.classList.contains("reveal-words") || child.classList.contains("scroll-scrub")) return;
          stamped.push(mark(child, index, section));
        });
      });
    }
    main.querySelectorAll(".section-head, .marquee-wrap, .article.prose").forEach((el) => {
      if (el.closest(".enter") && el.parentElement?.classList.contains("enter")) return;
      stamped.push(mark(el, 0, true));
    });
    main.querySelectorAll("article.panel").forEach((el, index) => {
      if (el.closest(".enter")) return;
      stamped.push(mark(el, index % 6, false));
    });

    const fromTransition = arriving;
    arriving = false;
    const fold = window.innerHeight * 0.92;
    const above = [];
    const below = [];
    for (const el of stamped) {
      if (el.dataset.entered === "1") continue;
      if (fromTransition && el.getBoundingClientRect().top < fold) above.push(el);
      else below.push(el);
    }
    if (fromTransition) above.forEach((el) => el.classList.remove("enter--pending"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    const watch = fromTransition ? below : stamped.filter((el) => el.dataset.entered !== "1");
    watch.forEach((el) => io.observe(el));

    let cancelled = false;
    if (fromTransition) {
      transitionDone.then(() => {
        if (cancelled) return;
        above.forEach((el) => el.classList.add("enter--pending"));
        requestAnimationFrame(() => {
          if (cancelled) return;
          above.forEach(reveal);
        });
      });
    }

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [pathname]);
}

export function RevealWords({ text, as: Tag = "h2", className, style }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const spans = [...el.querySelectorAll(".reveal-word")];
    if (prefersReducedMotion()) {
      spans.forEach((span) => {
        span.style.opacity = "1";
      });
      return undefined;
    }
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.38;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      spans.forEach((span, index) => {
        const local = Math.min(1, Math.max(0, progress * spans.length - index));
        span.style.opacity = String(0.18 + local * 0.82);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={`reveal-words ${className || ""}`} style={style}>
      {words.map((word, index) => (
        <span className="reveal-word" key={`${word}-${index}`}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export function ScrollFrame({ children }) {
  const outerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = outer?.querySelector(".scroll-scrub-inner");
    if (!outer || !inner) return undefined;
    if (prefersReducedMotion()) {
      outer.style.clipPath = "none";
      inner.style.transform = "none";
      return undefined;
    }
    outer.style.clipPath = "none";
    inner.style.transform = "none";
  }, []);

  return (
    <div className="scroll-scrub">
      <div className="scroll-scrub-outer" ref={outerRef}>
        <div className="scroll-scrub-inner">{children}</div>
      </div>
    </div>
  );
}
