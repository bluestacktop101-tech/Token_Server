import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import { useSiteMotion } from "./motion.jsx";

const titles = {
  "/": "Token Metrics | Infrastructure for tokenized assets",
  "/products": "Products | Token Metrics",
  "/tokenization": "Tokenization | Token Metrics",
  "/technology": "Technology | Token Metrics",
  "/ecosystem": "Ecosystem | Token Metrics",
  "/developers": "Developers | Token Metrics",
  "/community": "Community | Token Metrics",
  "/news": "News | Token Metrics",
  "/careers": "Careers | Token Metrics",
  "/company": "Company | Token Metrics",
  "/contact": "Contact | Token Metrics",
  "/privacy": "Privacy | Token Metrics",
  "/terms": "Terms | Token Metrics",
};

export default function Layout() {
  const { pathname, hash } = useLocation();
  useSiteMotion();
  useEffect(() => {
    document.title = pathname.startsWith("/products/")
      ? "Product | Token Metrics"
      : pathname.startsWith("/news/")
        ? "News | Token Metrics"
        : titles[pathname] || "Token Metrics";
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="app">
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
