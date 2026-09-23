import { Link } from "react-router-dom";
import { company, ecosystem, integrationNote, integrations, markets, posts, products, socials, stack } from "../data.js";
import { BrandLogo } from "../components/logos.jsx";
import { RevealWords, ScrollFrame } from "../components/motion.jsx";
import { TextLink } from "../components/ui.jsx";

const cardImages = {
  "Real-World Assets": "/images/card-rwa.png",
  "Tokenized Securities": "/images/card-securities.png",
  "Private Markets": "/images/card-private.png",
  "Digital Funds": "/images/card-funds.png",
  "Institutional Digital Assets": "/images/card-institutional.png",
  "On-Chain Settlement": "/images/card-settlement.png",
};

export default function Home() {
  return (
    <>
      <section className="hero-band" id="hero">
        <div className="hero wrap">
          <Link className="pill" to="/company">
            {company.legalName} · {company.location}
          </Link>
          <h1 className="display">Infrastructure for tokenized assets</h1>
          <p className="lede">{company.positioning}</p>
          <div className="hero-cta">
            <Link className="btn xl" to="/products">View products</Link>
            <Link className="btn xl ghost" to="/contact">Talk to the team</Link>
            <div className="fine">Web3 infrastructure · Real-world assets · Digital assets</div>
          </div>
        </div>
      </section>

      <ScrollFrame>
        <div className="tiles">
          {markets.map((name) => (
            <div className="tile" key={name}>
              <img src={cardImages[name]} alt="" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </ScrollFrame>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee">
          {[...markets, ...markets].map((name, i) => (
            <span key={name + i}>{name}</span>
          ))}
        </div>
      </div>

      <section className="band" style={{ paddingTop: 28 }}>
        <div className="wrap stats">
          <div>
            <small>Headquarters</small>
            <strong>Zug</strong>
          </div>
          <div>
            <small>Company</small>
            <strong>AG</strong>
          </div>
          <div>
            <small>Products</small>
            <strong>{products.length}</strong>
          </div>
        </div>
      </section>

      <section className="band alt" id="products">
        <div className="wrap">
          <div className="section-head left">
            <div className="eyebrow">Products</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Issuance, markets, settlement, and data</h2>
            <p>{company.long}</p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <Link className="vcard" to={p.href} key={p.slug}>
                <div>
                  <div className="kicker">{p.kicker}</div>
                  <h3 style={{ marginTop: 8 }}>{p.name}</h3>
                  <p>{p.text}</p>
                </div>
                <span className="link-arrow">{p.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="tokenization">
        <div className="wrap">
          <div className="section-head left">
            <div className="eyebrow">RWA / Tokenization</div>
            <RevealWords className="display-s" style={{ marginTop: 8 }} text="Real-world assets, with a record that can move" />
            <p>Primary markets for institutions building tokenized assets and digital financial markets.</p>
          </div>
          <div className="secure-grid">
            {markets.map((name) => (
              <article className="eco" key={name}>
                <h3>{name}</h3>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <TextLink to="/products/issuance">Explore Issuance</TextLink>
          </div>
        </div>
      </section>

      <section className="band deep" id="technology">
        <div className="wrap">
          <div className="section-head left">
            <div className="eyebrow">Technology</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Issuance, markets, data, and settlement</h2>
            <p>The platform covers asset issuance, market operations, data, and on-chain settlement.</p>
          </div>
          <div className="secure-grid">
            {stack.map((s) => (
              <article className="step" key={s.name}>
                <h3 style={{ fontSize: 26 }}>{s.name}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band alt" id="ecosystem">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Ecosystem and partners</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Ecosystem integrations</h2>
            <p>{integrationNote}</p>
          </div>
          <div className="logo-wall marks">
            {integrations.map((item) => (
              <div className="logo-cell mark" key={item.name}>
                <BrandLogo name={item.name} />
                <small>{item.type}</small>
              </div>
            ))}
          </div>
          <div className="eco-grid" style={{ marginTop: 16 }}>
            {ecosystem.slice(0, 6).map((e) => (
              <article className="eco" key={e.name}>
                <div className="kicker">{e.kind}</div>
                <h3>{e.name}</h3>
                <p className="muted">{e.blurb}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <TextLink to="/ecosystem">See the ecosystem</TextLink>
          </div>
        </div>
      </section>

      <section className="band" id="developers">
        <div className="wrap two">
          <div>
            <div className="eyebrow">Developers</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Build on Token Metrics infrastructure</h2>
            <p className="lede" style={{ marginTop: 14 }}>
              APIs, SDKs, and documentation for market infrastructure, asset data, blockchain integrations, and settlement services.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              <a className="btn" href={company.docsUrl}>Start building</a>
              <Link className="btn ghost" to="/developers">API reference</Link>
            </div>
          </div>
          <pre className="code">{`GET ${company.apiBase}/assets
Authorization: Bearer YOUR_API_KEY`}</pre>
        </div>
      </section>

      <section className="band alt" id="community">
        <div className="wrap">
          <div className="section-head left">
            <div className="eyebrow">Community</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>X, LinkedIn, and Telegram</h2>
          </div>
          <div className="steps">
            {socials.map((s) => (
              <a className="step" href={s.href} key={s.name} target="_blank" rel="noreferrer">
                <h3>{s.name}</h3>
                <p>@{s.href.split("/").pop()}</p>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <TextLink to="/community">Join the community</TextLink>
          </div>
        </div>
      </section>

      <section className="band" id="news">
        <div className="wrap">
          <div className="section-head left">
            <div className="eyebrow">Resources / News</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Token Metrics Research</h2>
          </div>
          <div className="post-grid">
            {posts.slice(0, 3).map((p) => (
              <Link className="post" to={`/news/${p.slug}`} key={p.slug}>
                <div className="kicker">{p.tag}</div>
                <h3>{p.title}</h3>
                <p className="muted">{p.excerpt}</p>
                <div style={{ marginTop: 14, color: "var(--faint)", fontSize: 13 }}>{p.date}</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <TextLink to="/news">All research</TextLink>
          </div>
        </div>
      </section>

      <section className="band alt" id="careers">
        <div className="wrap split">
          <div>
            <div className="eyebrow">Careers</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Build the infrastructure for on-chain markets.</h2>
            <p className="lede" style={{ marginTop: 14 }}>
              We're building a technology company at the intersection of financial markets, blockchain infrastructure, and real-world assets.
            </p>
            <div style={{ marginTop: 18 }}>
              <Link className="btn" to="/careers">Open roles</Link>
            </div>
          </div>
          <figure className="figure">
            <img src="/images/office.png" alt="A quiet room in daylight, with a long table and a view of the water" />
            <figcaption className="muted">{company.address}</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
