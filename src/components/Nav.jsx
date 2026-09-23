import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Mark } from "./ui.jsx";

const products = [
  { to: "/products/issuance", ic: "Is", title: "Issuance", desc: "Create, tokenize, and manage assets" },
  { to: "/products/markets", ic: "Mk", title: "Markets", desc: "Trading, liquidity, and access" },
  { to: "/products/settlement", ic: "St", title: "Settlement", desc: "On-chain transfer and settlement" },
  { to: "/products/data", ic: "Da", title: "Data", desc: "Market and blockchain data" },
];

const platform = [
  { to: "/tokenization", ic: "01", title: "Tokenization", desc: "From asset to onchain record" },
  { to: "/technology", ic: "02", title: "Technology", desc: "Contracts, identity, monitoring" },
  { to: "/developers", ic: "03", title: "Developers", desc: "API and integration guides" },
  { to: "/ecosystem", ic: "04", title: "Ecosystem", desc: "Partners and networks" },
];

const company = [
  { to: "/company", ic: "Ab", title: "Company", desc: "What we build and why" },
  { to: "/news", ic: "Nw", title: "News", desc: "Infrastructure notes" },
  { to: "/community", ic: "Cm", title: "Community", desc: "Institutions and builders" },
  { to: "/careers", ic: "Hr", title: "Careers", desc: "Open roles" },
  { to: "/contact", ic: "→", title: "Contact", desc: "Talk to the team" },
];

function Rows({ items }) {
  return items.map((item) => (
    <Link className="row" to={item.to} key={item.to}>
      <span className="ic">{item.ic}</span>
      <span>
        <strong>{item.title}</strong>
        <small>{item.desc}</small>
      </span>
    </Link>
  ));
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const holdClosed = useRef(false);
  const loc = useLocation();

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [loc.pathname]);

  useEffect(() => {
    const close = () => {
      setOpen(false);
      setMenu(null);
      holdClosed.current = true;
    };
    window.addEventListener("tm-close-nav", close);
    return () => window.removeEventListener("tm-close-nav", close);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="nav-wrap">
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="brand" aria-label="Token Metrics home">
          <Mark />
          Token Metrics
        </Link>
        <nav className="nav-links link-group" aria-label="Main navigation">
          <div
            className={`nav-item ${menu === "products" ? "menu-open" : ""}`}
            onMouseEnter={() => {
              if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
              if (!holdClosed.current) setMenu("products");
            }}
            onMouseLeave={() => { holdClosed.current = false; setMenu(null); }}
          >
            <button
              className={`nav-btn ${menu === "products" ? "open" : ""}`}
              type="button"
              aria-expanded={menu === "products"}
              onClick={() => {
                if (menu === "products") {
                  setMenu(null);
                  holdClosed.current = true;
                } else {
                  holdClosed.current = false;
                  setMenu("products");
                }
              }}
            >
              Products <Caret />
            </button>
            <div className="mega">
              <div className="mega-col link-group">
                <div className="mega-label">Products</div>
                <Rows items={products} />
              </div>
              <Link to="/tokenization" className="feature-card">
                <span>Real-world assets</span>
                <div>
                  <h3>Issue once. Settle anywhere.</h3>
                  <p>Tokenization, controls, and distribution for institutional assets.</p>
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`nav-item ${menu === "platform" ? "menu-open" : ""}`}
            onMouseEnter={() => {
              if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
              if (!holdClosed.current) setMenu("platform");
            }}
            onMouseLeave={() => { holdClosed.current = false; setMenu(null); }}
          >
            <button
              className={`nav-btn ${menu === "platform" ? "open" : ""}`}
              type="button"
              aria-expanded={menu === "platform"}
              onClick={() => {
                if (menu === "platform") {
                  setMenu(null);
                  holdClosed.current = true;
                } else {
                  holdClosed.current = false;
                  setMenu("platform");
                }
              }}
            >
              Platform <Caret />
            </button>
            <div className="mega">
              <div className="mega-col link-group">
                <div className="mega-label">Platform</div>
                <Rows items={platform} />
              </div>
              <Link to="/developers" className="feature-card warm">
                <span>Developers</span>
                <div>
                  <h3>APIs, SDKs, and documentation.</h3>
                  <p>Market infrastructure, asset data, blockchain integrations, and settlement.</p>
                </div>
              </Link>
            </div>
          </div>
          <NavLink className="nav-a" to="/news">News</NavLink>
          <div
            className={`nav-item ${menu === "company" ? "menu-open" : ""}`}
            onMouseEnter={() => {
              if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
              if (!holdClosed.current) setMenu("company");
            }}
            onMouseLeave={() => { holdClosed.current = false; setMenu(null); }}
          >
            <button
              className={`nav-btn ${menu === "company" ? "open" : ""}`}
              type="button"
              aria-expanded={menu === "company"}
              onClick={() => {
                if (menu === "company") {
                  setMenu(null);
                  holdClosed.current = true;
                } else {
                  holdClosed.current = false;
                  setMenu("company");
                }
              }}
            >
              Company <Caret />
            </button>
            <div className="mega slim">
              <div className="mega-col link-group">
                <Rows items={company} />
              </div>
            </div>
          </div>
        </nav>
        <div className="nav-right">
          <Link className="btn sm desk" to="/contact">Talk to us</Link>
          <button className={`menu-toggle ${open ? "is-open" : ""}`} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-panel link-group ${open ? "open" : ""}`}>
        {[
          ["/products", "Products"],
          ["/tokenization", "Tokenization"],
          ["/technology", "Technology"],
          ["/ecosystem", "Ecosystem"],
          ["/developers", "Developers"],
          ["/community", "Community"],
          ["/news", "News"],
          ["/careers", "Careers"],
          ["/company", "Company"],
          ["/contact", "Contact"],
        ].map(([to, label]) => (
          <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link className="btn" to="/contact" style={{ marginTop: 18 }} onClick={() => setOpen(false)}>Talk to us</Link>
      </div>
    </div>
  );
}

function Caret() {
  return (
    <svg className="caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
