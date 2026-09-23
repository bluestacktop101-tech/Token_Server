import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { apiResources, builderUses, company, docTopics, ecosystem, findPost, findProduct, findRole, integrationNote, integrations, markets, postRedirects, posts, products, roles, socials, stack } from "../data.js";
import { BrandLogo } from "../components/logos.jsx";
import { Faq, PageHero, TextLink } from "../components/ui.jsx";

export function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Issuance, markets, settlement, and data."
        lede={company.long}
        actions={<Link className="btn" to="/contact">Request a briefing</Link>}
      />
      <section className="band" style={{ paddingTop: 12 }}>
        <div className="wrap" style={{ display: "grid", gap: 16 }}>
          {products.map((p) => (
            <article className="panel" id={p.slug} key={p.slug}>
              <div className="kicker">{p.kicker}</div>
              <h2 className="display-s" style={{ marginTop: 8 }}>{p.name}</h2>
              <p className="lede" style={{ marginTop: 10 }}>{p.text}</p>
              <div style={{ marginTop: 16 }}>
                <TextLink to={p.href}>{p.cta}</TextLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const product = findProduct(slug);
  if (!product) {
    return (
      <div className="wrap page-hero">
        <h1 className="display-s">Product not found</h1>
        <Link to="/products">All products</Link>
      </div>
    );
  }
  return (
    <>
      <PageHero
        eyebrow={product.kicker}
        title={product.name}
        lede={product.text}
        actions={<Link className="btn" to="/contact">{product.cta}</Link>}
      />
      <section className="band" style={{ paddingTop: 8 }}>
        <div className="wrap two">
          <div className="panel">
            <div className="eyebrow">{company.legalName}</div>
            <h2 className="display-s" style={{ marginTop: 10 }}>Built for institutions</h2>
            <p className="muted">{company.positioning}</p>
          </div>
          <div className="panel">
            <div className="eyebrow">Primary markets</div>
            <div className="chain-pills" style={{ marginTop: 14 }}>
              {markets.map((m) => (
                <span className="chip" key={m}>{m}</span>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <TextLink to="/products">All products</TextLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Tokenization() {
  return (
    <>
      <PageHero
        eyebrow="RWA / Tokenization"
        title="Turn a real-world claim into an asset that can settle."
        lede={products[0].text}
        actions={<Link className="btn" to="/products/issuance">Explore Issuance</Link>}
      />
      <section className="band">
        <div className="wrap steps">
          {products.map((p, i) => (
            <Link className="step" to={p.href} key={p.slug}>
              <div className="num">0{i + 1}</div>
              <h3>{p.kicker}</h3>
              <p>{p.text}</p>
            </Link>
          ))}
        </div>
        <div className="wrap secure-grid" style={{ marginTop: 16 }}>
          {markets.map((name) => (
            <article className="eco" key={name}>
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Infrastructure for issuance, markets, data, and settlement."
        lede={company.long}
      />
      <section className="band">
        <div className="wrap secure-grid">
          {stack.map((s) => (
            <article className="step" key={s.name}>
              <h3 style={{ fontSize: 26 }}>{s.name}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function Ecosystem() {
  const kinds = ["All", ...new Set(ecosystem.map((e) => e.kind))];
  const [kind, setKind] = useState("All");
  const rows = ecosystem.filter((e) => kind === "All" || e.kind === kind);
  return (
    <>
      <PageHero
        eyebrow="Ecosystem and partners"
        title="Markets and infrastructure."
        lede={integrationNote}
      />
      <section className="band" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="logo-wall marks" style={{ marginBottom: 22 }}>
            {integrations.map((item) => (
              <div className="logo-cell mark" key={item.name}>
                <BrandLogo name={item.name} />
                <small>{item.type}</small>
              </div>
            ))}
          </div>
          <div className="filters">
            {kinds.map((k) => (
              <button key={k} className={k === kind ? "on" : ""} type="button" onClick={() => setKind(k)}>{k}</button>
            ))}
          </div>
          <div className="eco-grid">
            {rows.map((e) => (
              <article className="eco" key={e.name}>
                <div className="kicker">{e.kind}</div>
                <h3>{e.name}</h3>
                <p className="muted">{e.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Developers() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Build on Token Metrics infrastructure."
        lede="Our developer platform provides APIs, SDKs, and technical resources for accessing market infrastructure, asset data, blockchain integrations, and settlement services."
        actions={<a className="btn" href={company.docsUrl}>Start building</a>}
      />
      <section className="band" style={{ paddingTop: 8 }}>
        <div className="wrap two">
          <div>
            <div className="eyebrow">Documentation</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Developer documentation</h2>
            <p className="muted" style={{ marginTop: 8 }}><a href={company.docsUrl}>{company.docsUrl}</a></p>
            <div className="chain-pills" style={{ marginTop: 16 }}>
              {docTopics.map((topic) => (
                <span className="chip" key={topic}>{topic}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">API</div>
            <h2 className="display-s" style={{ marginTop: 8 }}>Base URL</h2>
            <pre className="code">{company.apiBase}</pre>
            <p className="muted" style={{ marginTop: 12 }}>The Token Metrics API provides programmatic access to tokenized asset data, market information, blockchain activity, and settlement infrastructure.</p>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 28 }}>
          <h2 className="display-s">Core API resources</h2>
          <div className="panel" style={{ marginTop: 16, padding: 8 }}>
            <div className="table-wrap">
              <table className="vaults">
                <thead>
                  <tr>
                    <th>Endpoint</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {apiResources.map((row) => (
                    <tr key={row.path}>
                      <td><code>{row.path}</code></td>
                      <td>{row.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="two" style={{ marginTop: 28 }}>
            <div>
              <h2 className="display-s">Authentication</h2>
              <p className="muted">API requests use API keys.</p>
              <pre className="code">{`GET ${company.apiBase}/assets
Authorization: Bearer YOUR_API_KEY`}</pre>
            </div>
            <div>
              <h2 className="display-s">Designed for teams building</h2>
              <ul className="muted" style={{ paddingLeft: 18, lineHeight: 1.7 }}>
                {builderUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="btn" href={company.docsUrl}>Start building</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Community() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title="X, LinkedIn, and Telegram."
        lede="Follow Token Metrics as @tokenmetrics."
      />
      <section className="band">
        <div className="wrap steps">
          {socials.map((s) => (
            <a className="step" href={s.href} key={s.name} target="_blank" rel="noreferrer">
              <h3>{s.name}</h3>
              <p>@tokenmetrics</p>
            </a>
          ))}
        </div>
        <div className="wrap" style={{ marginTop: 20 }}>
          <p className="muted">Questions: <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a></p>
        </div>
      </section>
    </>
  );
}

export function News() {
  return (
    <>
      <PageHero eyebrow="Resources / News" title="Token Metrics Research" lede="Notes on institutional markets, real-world assets, and on-chain settlement." />
      <section className="band" style={{ paddingTop: 8 }}>
        <div className="wrap post-grid">
          {posts.map((p) => (
            <Link className="post" to={`/news/${p.slug}`} key={p.slug}>
              <div className="kicker">{p.tag}</div>
              <h3>{p.title}</h3>
              <p className="muted">{p.excerpt}</p>
              <div style={{ marginTop: 16, color: "var(--faint)", fontSize: 13 }}>{p.date} · {p.author}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function Article() {
  const { slug } = useParams();
  const post = findPost(slug);
  if (postRedirects[slug]) {
    return <Navigate to={`/news/${postRedirects[slug]}`} replace />;
  }
  if (!post) {
    return (
      <div className="wrap page-hero">
        <h1 className="display-s">Note not found</h1>
        <Link to="/news">Back to news</Link>
      </div>
    );
  }
  return (
    <article className="band">
      <div className="wrap article prose">
        <Link to="/news" className="muted">← News</Link>
        <div className="kicker" style={{ marginTop: 18 }}>{post.tag}</div>
        <h1 className="display-s" style={{ marginTop: 10 }}>{post.title}</h1>
        <p className="updated">{post.date} · {post.author}</p>
        <p>{post.excerpt}</p>
        {post.sections?.map((section) => (
          <div key={section.heading || section.paragraphs[0]}>
            {section.heading ? <h2>{section.heading}</h2> : null}
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.ordered ? (
              <ol>
                {section.ordered.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : null}
            {section.after?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

export function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the infrastructure for on-chain markets."
        lede="We're building a technology company at the intersection of financial markets, blockchain infrastructure, and real-world assets."
      />
      <section className="band" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="section-head left">
            <h2 className="display-s">Open Roles</h2>
          </div>
          <div className="job-grid">
            {roles.map((role) => (
              <article className="job" key={role.title}>
                <h3>{role.slug ? <Link to={`/careers/${role.slug}`}>{role.title}</Link> : role.title}</h3>
                <p className="muted">Location: {role.location}</p>
                <p className="muted">Type: {role.type}</p>
                <div style={{ marginTop: 16 }}>
                  {role.slug ? (
                    <TextLink to={`/careers/${role.slug}`}>View role</TextLink>
                  ) : (
                    <TextLink href={`mailto:${company.supportEmail}?subject=${encodeURIComponent(`Application — ${role.title}`)}`}>Apply</TextLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Role() {
  const { slug } = useParams();
  const role = findRole(slug);
  if (!role) {
    return (
      <div className="wrap page-hero">
        <h1 className="display-s">Role not found</h1>
        <Link to="/careers">Back to careers</Link>
      </div>
    );
  }
  const apply = `mailto:${company.supportEmail}?subject=${encodeURIComponent(`Application — ${role.title}`)}`;
  return (
    <article className="band">
      <div className="wrap article prose" style={{ maxWidth: 760 }}>
        <Link to="/careers" className="muted">← Careers</Link>
        <h1 className="display-s" style={{ marginTop: 18 }}>{role.title}</h1>
        <p className="updated">Location: {role.location}</p>
        <p className="updated">Type: {role.type}</p>
        {role.sections?.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        <div style={{ marginTop: 28 }}>
          <a className="btn" href={apply}>Apply</a>
        </div>
      </div>
    </article>
  );
}

export function Company() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title={company.legalName}
        lede={company.long}
      />
      <section className="band">
        <div className="wrap two">
          <article className="panel">
            <div className="kv"><span className="muted">Legal entity</span><span>{company.legalName}</span></div>
            <div className="kv"><span className="muted">Jurisdiction</span><span>{company.jurisdiction}</span></div>
            <div className="kv"><span className="muted">Address</span><span style={{ textAlign: "right", maxWidth: 280 }}>{company.address}</span></div>
            <div className="kv"><span className="muted">Website</span><a href={company.website}>{company.website.replace("https://", "")}</a></div>
            <div className="kv"><span className="muted">Support</span><a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a></div>
            <div className="kv"><span className="muted">Privacy</span><a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a></div>
            <div className="kv"><span className="muted">Legal</span><a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a></div>
            <div className="kv"><span className="muted">Type</span><span>{company.type}</span></div>
            <div className="kv"><span className="muted">Industry</span><span style={{ textAlign: "right", maxWidth: 320 }}>{company.industry}</span></div>
          </article>
          <div>
            <p className="lede">{company.positioning}</p>
            <p className="muted">{company.short}</p>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 28 }}>
          <Faq
            items={[
              { q: "What does Token Metrics build?", a: company.long },
              { q: "Where is the company based?", a: `${company.legalName} is based in ${company.location}, at ${company.address}.` },
              { q: "Which markets do you serve?", a: markets.join(", ") + "." },
            ]}
          />
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to Token Metrics." lede={`Write to ${company.supportEmail}, or use the form to open a message to Token Metrics AG.`} />
      <section className="band" style={{ paddingTop: 8 }}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          {sent ? (
            <div className="notice">Your email app should be open with a message to {company.supportEmail}. Send it to reach Token Metrics AG.</div>
          ) : null}
          <form
              className="form-grid panel"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const subject = encodeURIComponent(`Website inquiry — ${fd.get("interest")}`);
                const body = encodeURIComponent(
                  `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\nOrganization: ${fd.get("org")}\nInterest: ${fd.get("interest")}\n\n${fd.get("msg")}`
                );
                window.location.href = `mailto:${company.supportEmail}?subject=${subject}&body=${body}`;
                setSent(true);
              }}
            >
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" required name="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input id="email" type="email" required name="email" />
              </div>
              <div className="field">
                <label htmlFor="org">Organization</label>
                <input id="org" required name="org" />
              </div>
              <div className="field">
                <label htmlFor="interest">Interest</label>
                <select id="interest" name="interest" defaultValue="Token Metrics Issuance">
                  <option>Token Metrics Issuance</option>
                  <option>Token Metrics Markets</option>
                  <option>Token Metrics Settlement</option>
                  <option>Token Metrics Data</option>
                  <option>Careers</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="msg">What are you building?</label>
                <textarea id="msg" required name="msg" />
              </div>
              <button className="btn" type="submit">Send</button>
              <p className="muted" style={{ margin: 0, fontSize: 13 }}>
                Sending opens an email to {company.supportEmail}. See the <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </form>
        </div>
      </section>
    </>
  );
}

export function Legal({ title, body }) {
  return (
    <article className="band">
      <div className="wrap article prose">
        <h1 className="display-s">{title}</h1>
        <p>{body}</p>
      </div>
    </article>
  );
}
