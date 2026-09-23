import { postRedirects, posts } from "./posts.js";

export { postRedirects, posts };

export const company = {
  name: "Token Metrics",
  legalName: "Token Metrics AG",
  jurisdiction: "Zug, Switzerland",
  address: "Baarerstrasse 14, 6300 Zug, Switzerland",
  website: "https://tokenmetrics.org",
  supportEmail: "support@tokenmetrics.org",
  privacyEmail: "privacy@tokenmetrics.org",
  legalEmail: "legal@tokenmetrics.org",
  location: "Zug, Switzerland",
  industry: "Web3 Infrastructure / Real-World Assets / Digital Assets / Blockchain",
  type: "Private Technology Company",
  positioning:
    "Token Metrics builds the rails institutions use to issue real-world assets, operate digital markets, and settle them on public blockchains.",
  short:
    "Token Metrics provides blockchain infrastructure for institutions building tokenized assets and digital financial markets.",
  long: "Token Metrics is a Web3 infrastructure company focused on the tokenization of real-world assets and the development of digital financial markets. Its platform provides infrastructure for asset issuance, market operations, data, and on-chain settlement.",
  docsUrl: "https://tokenmetrics.org/docs",
  apiBase: "https://api.tokenmetrics.org/v1",
};

export const socials = [
  { name: "X", href: "https://x.com/tokenmetrics" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/tokenmetrics" },
  { name: "Telegram", href: "https://t.me/tokenmetrics" },
];

export const docTopics = [
  "Getting started",
  "API authentication",
  "Asset APIs",
  "Market data",
  "Blockchain integrations",
  "Settlement",
  "Webhooks",
  "SDKs",
  "API reference",
  "Error handling",
  "Rate limits",
];

export const apiResources = [
  { path: "/assets", text: "Retrieve tokenized asset information" },
  { path: "/markets", text: "Access digital market and liquidity data" },
  { path: "/settlements", text: "Track on-chain settlement activity" },
  { path: "/chains", text: "Retrieve supported blockchain networks" },
  { path: "/transactions", text: "Query blockchain transaction records" },
];

export const builderUses = [
  "Institutional digital asset platforms",
  "Tokenization applications",
  "RWA marketplaces",
  "Digital securities infrastructure",
  "Portfolio and market applications",
  "On-chain settlement systems",
];

export const markets = [
  "Real-World Assets",
  "Tokenized Securities",
  "Private Markets",
  "Digital Funds",
  "Institutional Digital Assets",
  "On-Chain Settlement",
];

export const products = [
  {
    slug: "issuance",
    href: "/products/issuance",
    kicker: "Issuance",
    name: "Token Metrics Issuance",
    cta: "Explore Issuance",
    text: "Infrastructure for institutions to create, tokenize, and manage real-world assets on public blockchains.",
  },
  {
    slug: "markets",
    href: "/products/markets",
    kicker: "Markets",
    name: "Token Metrics Markets",
    cta: "Explore Markets",
    text: "Infrastructure for operating digital markets around tokenized assets, including trading, liquidity, and market access.",
  },
  {
    slug: "settlement",
    href: "/products/settlement",
    kicker: "Settlement",
    name: "Token Metrics Settlement",
    cta: "Explore Settlement",
    text: "On-chain infrastructure for transferring and settling tokenized assets with transparent blockchain-based transaction records.",
  },
  {
    slug: "data",
    href: "/products/data",
    kicker: "Data",
    name: "Token Metrics Data",
    cta: "Explore Data",
    text: "Structured market and blockchain data for institutions building digital asset products and applications.",
  },
];

export const stack = [
  { name: "Issuance", text: "Infrastructure to create, tokenize, and manage real-world assets on public blockchains." },
  { name: "Market operations", text: "Infrastructure for trading, liquidity, and market access around tokenized assets." },
  { name: "Data", text: "Structured market and blockchain data for institutions building digital asset products." },
  { name: "On-chain settlement", text: "Transfers and settlement with a blockchain record of the transaction." },
];

export const integrations = [
  { name: "Apollo", type: "Asset management" },
  { name: "DigiFT", type: "Digital securities" },
  { name: "Binance", type: "Digital asset exchange" },
  { name: "Bybit", type: "Digital asset exchange" },
  { name: "Securitize", type: "Tokenization" },
  { name: "Ethereum", type: "Public blockchain infrastructure" },
  { name: "Chainlink", type: "Oracle infrastructure" },
  { name: "Polygon", type: "Blockchain infrastructure" },
];

export const integrationNote =
  "These are ecosystem integrations and technology categories for this site, not claims of formal commercial partnerships unless separately verified and approved.";

export const ecosystem = [
  { name: "Issuance", kind: "Product", blurb: "Create, tokenize, and manage real-world assets." },
  { name: "Markets", kind: "Product", blurb: "Trading, liquidity, and market access." },
  { name: "Settlement", kind: "Product", blurb: "On-chain transfer and settlement records." },
  { name: "Data", kind: "Product", blurb: "Market and blockchain data for institutions." },
  { name: "Real-world assets", kind: "Market", blurb: "Assets brought onto public blockchains." },
  { name: "Tokenized securities", kind: "Market", blurb: "Securities represented and managed on-chain." },
  { name: "Private markets", kind: "Market", blurb: "Infrastructure for private-market assets." },
  { name: "Digital funds", kind: "Market", blurb: "Fund interests issued and operated digitally." },
  { name: "Institutional digital assets", kind: "Market", blurb: "Digital assets built for institutional use." },
];

export function findProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function findPost(slug) {
  return posts.find((p) => p.slug === slug);
}
