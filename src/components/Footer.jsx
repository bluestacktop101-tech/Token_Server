import { Link } from "react-router-dom";
import { Mark } from "./ui.jsx";
import { company, products, socials } from "../data.js";

const cols = [
  {
    title: "Products",
    links: [["/products", "Overview"], ...products.map((p) => [p.href, p.kicker])],
  },
  {
    title: "Platform",
    links: [
      ["/technology", "Technology"],
      ["/developers", "Developers"],
      ["/ecosystem", "Ecosystem"],
      ["/community", "Community"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/company", "About"],
      ["/news", "News"],
      ["/careers", "Careers"],
      ["/contact", "Contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["/privacy", "Privacy"],
      ["/terms", "Terms"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site" id="footer">
      <div className="wrap-wide">
        <div className="foot-grid">
          <div>
            <Link to="/" className="brand">
              <Mark /> Token Metrics
            </Link>
            <p className="muted" style={{ maxWidth: 280, marginTop: 14 }}>
              {company.short}
            </p>
            <p className="muted" style={{ maxWidth: 280, marginTop: 14, fontSize: 14 }}>
              {company.legalName}<br />
              {company.address}<br />
              <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
            </p>
            <p className="link-group" style={{ display: "flex", gap: 14, marginTop: 14 }}>
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer">{s.name}</a>
              ))}
            </p>
          </div>
          {cols.map((col) => (
            <div className="link-group" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map(([to, label]) => (
                <Link key={to} to={to}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="legal-row">
          <span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
          <span>{company.location}</span>
        </div>
      </div>
    </footer>
  );
}
