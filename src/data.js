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

export const roles = [
  {
    slug: "community-manager",
    title: "Community Manager",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About Token Metrics",
        paragraphs: [
          "Token Metrics builds the rails institutions use to issue real-world assets, operate digital markets, and settle them on public blockchains.",
        ],
      },
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Community Manager to build and grow our Web3 community across social channels and online ecosystems. You'll connect with builders, researchers, investors, developers, and Web3 professionals and help turn the community into an active part of the company.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Manage and grow Token Metrics communities across X, Discord, Telegram, LinkedIn, and other relevant channels",
          "Create and manage community campaigns, discussions, events, and initiatives",
          "Engage with members and respond to questions and feedback",
          "Develop ambassador and community-partner programs",
          "Work with Marketing and Growth teams on campaigns and product launches",
          "Monitor community sentiment, trends, and Web3 conversations",
          "Build relationships with creators, KOLs, developers, and ecosystem participants",
          "Prepare community reports and engagement metrics",
          "Help create educational content around RWA, tokenization, and blockchain infrastructure",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "2+ years of community management experience",
          "Experience in Web3, crypto, blockchain, DeFi, or fintech",
          "Strong understanding of X, Discord, Telegram, and Web3 communities",
          "Excellent written and verbal communication",
          "Comfortable working independently in a remote environment",
          "Strong understanding of crypto/Web3 terminology",
          "Experience with community analytics and engagement tools",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Experience building an ambassador program",
          "Experience working with Web3 protocols or infrastructure companies",
          "Experience with events, AMAs, or community launches",
          "Existing relationships within the Web3 ecosystem",
        ],
      },
      {
        heading: "What You'll Work With",
        paragraphs: ["Marketing · Growth · Product · Partnerships · Developers · Web3 Ecosystem"],
      },
    ],
  },
  {
    slug: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Growth Marketing Manager to build scalable acquisition and growth programs for Token Metrics. You'll work across marketing, product, analytics, and partnerships to turn awareness into measurable user and business growth.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Develop and execute growth strategies across acquisition, activation, and retention",
          "Own growth experiments across paid, organic, content, partnerships, and lifecycle channels",
          "Identify new customer and market opportunities",
          "Build and optimize conversion funnels",
          "Develop growth campaigns for Token Metrics products and launches",
          "Track acquisition, conversion, retention, and campaign performance",
          "Work with Product and Marketing to improve user journeys",
          "Manage experiments and document results",
          "Coordinate with external agencies, creators, and growth partners where appropriate",
          "Build dashboards and reports for marketing performance",
          "Research Web3, RWA, fintech, and competitive markets",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "3+ years of growth or performance marketing experience",
          "Experience in SaaS, fintech, crypto, Web3, or technology",
          "Strong understanding of acquisition funnels and conversion optimization",
          "Experience with analytics and marketing platforms",
          "Data-driven approach to decision-making",
          "Strong copywriting and campaign skills",
          "Ability to independently manage multiple growth initiatives",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Web3/crypto growth experience",
          "Experience with KOL/influencer campaigns",
          "Experience with referral and ambassador programs",
          "Experience launching products in international markets",
        ],
      },
    ],
  },
  {
    slug: "web3-marketing-manager",
    title: "Web3 Marketing Manager",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Web3 Marketing Manager to lead marketing initiatives across the blockchain and digital-asset ecosystem.",
          "You'll translate complex infrastructure and RWA concepts into clear stories, campaigns, and content for institutions, builders, and the broader Web3 community.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Develop Web3 marketing strategy and campaigns",
          "Position Token Metrics across RWA, tokenization, blockchain infrastructure, and digital markets",
          "Plan product launches and ecosystem campaigns",
          "Develop campaigns with Web3 communities, KOLs, creators, and ecosystem partners",
          "Coordinate content across X, LinkedIn, newsletters, blogs, and community channels",
          "Translate technical blockchain concepts into accessible marketing content",
          "Conduct competitor and market research",
          "Support conferences, webinars, AMAs, and industry events",
          "Work closely with Product, Growth, Community, and Partnerships teams",
          "Track campaign performance and prepare marketing reports",
          "Stay current with blockchain, RWA, DeFi, and institutional digital-asset trends",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "3+ years of marketing experience",
          "Strong Web3/crypto knowledge",
          "Experience marketing blockchain products or technology",
          "Excellent writing and communication skills",
          "Understanding of Web3 communities and ecosystem dynamics",
          "Experience with content and campaign management",
          "Strong project management skills",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "RWA or institutional crypto experience",
          "KOL/influencer marketing experience",
          "Experience with blockchain infrastructure products",
          "Experience with conferences and ecosystem events",
        ],
      },
    ],
  },
  {
    slug: "blockchain-engineer",
    title: "Blockchain Engineer",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Blockchain Engineer to help build infrastructure for tokenized real-world assets, digital markets, and on-chain settlement.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Design and develop blockchain-based applications and infrastructure",
          "Develop and integrate smart contracts",
          "Build systems for token issuance, asset management, and transfers",
          "Integrate blockchain networks and wallets",
          "Work with backend and frontend engineers on Web3 applications",
          "Review smart-contract architecture and security",
          "Develop automated tests and deployment workflows",
          "Investigate blockchain performance and scalability",
          "Work with product and engineering teams on technical architecture",
          "Contribute to technical documentation",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "3+ years of blockchain/software engineering experience",
          "Strong experience with EVM-compatible blockchains",
          "Strong Solidity knowledge",
          "Experience with smart-contract development and testing",
          "Understanding of blockchain architecture",
          "Experience with Web3 libraries and wallet integrations",
          "Strong software engineering fundamentals",
          "Experience with Git and modern development workflows",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "RWA/tokenization experience",
          "ERC-20, ERC-721, ERC-1155 or ERC-3643 experience",
          "DeFi experience",
          "Rust or Go experience",
          "Smart-contract security experience",
          "Experience with blockchain indexing and data infrastructure",
        ],
      },
    ],
  },
  {
    slug: "full-stack-engineer",
    title: "Full Stack Engineer",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Full Stack Engineer to build user-facing products and internal infrastructure across the Token Metrics platform.",
          "You'll work closely with product, design, blockchain, and backend engineers to deliver reliable applications for the digital-asset ecosystem.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Build and maintain full-stack Web3 applications",
          "Develop responsive and accessible user interfaces",
          "Build APIs and backend services",
          "Integrate blockchain functionality into web applications",
          "Work with databases and external services",
          "Implement authentication and authorization",
          "Build dashboards and data-driven interfaces",
          "Write automated tests",
          "Investigate and resolve production issues",
          "Participate in architecture and technical decisions",
          "Collaborate with product and design teams",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "3+ years of full-stack development experience",
          "Strong JavaScript/TypeScript experience",
          "Experience with React or similar frontend frameworks",
          "Backend development experience",
          "Experience working with REST APIs",
          "Experience with SQL or NoSQL databases",
          "Understanding of Web3 and blockchain applications",
          "Strong Git and software-development practices",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Solidity/Web3 experience",
          "RWA or DeFi experience",
          "Node.js experience",
          "Rust or Go experience",
          "Cloud deployment experience",
          "Experience building financial or data-heavy applications",
        ],
      },
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Product Manager to help define and deliver products at the intersection of financial markets, blockchain infrastructure, and real-world assets.",
          "You'll work closely with engineering, design, marketing, community, and business teams to turn market needs into clear product priorities.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Define product vision, roadmap, and priorities",
          "Research institutional and Web3 market needs",
          "Gather feedback from users, partners, and internal teams",
          "Translate requirements into product specifications",
          "Create user stories and acceptance criteria",
          "Work closely with engineering and design",
          "Manage product releases and launches",
          "Analyze product usage and user feedback",
          "Identify opportunities for new products and features",
          "Coordinate cross-functional product initiatives",
          "Communicate roadmap and product decisions to stakeholders",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "3+ years of product management experience",
          "Experience building technology products",
          "Strong understanding of Web3, blockchain, fintech, or financial markets",
          "Strong product discovery and prioritization skills",
          "Experience working with engineering and design teams",
          "Strong analytical and communication skills",
          "Comfortable working in a remote, international environment",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "RWA/tokenization experience",
          "DeFi experience",
          "Experience with institutional financial products",
          "Technical background",
          "Experience launching Web3 products",
        ],
      },
    ],
  },
  {
    slug: "content-manager",
    title: "Content Manager",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About Token Metrics",
        paragraphs: [
          "Token Metrics builds the rails institutions use to issue real-world assets, operate digital markets, and settle them on public blockchains.",
        ],
      },
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Content Manager to own and grow our content across Web3, blockchain infrastructure, real-world assets, digital markets, and institutional finance.",
          "You'll turn complex technical and financial topics into clear, useful content for institutions, developers, Web3 professionals, and the broader digital-asset community.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Develop and manage Token Metrics' content strategy",
          "Write and edit articles, research pieces, newsletters, website content, and social media posts",
          "Create content around RWA, tokenization, blockchain infrastructure, and digital markets",
          "Work with Product, Marketing, Engineering, and Community teams to understand technical topics",
          "Manage the editorial calendar and content pipeline",
          "Research industry trends, competitors, protocols, and market developments",
          "Turn technical concepts into clear, accessible content",
          "Maintain consistent brand voice and messaging across channels",
          "Support product launches, campaigns, announcements, and events",
          "Work with designers and other creators on visual content",
          "Monitor content performance and optimize based on engagement and analytics",
          "Ensure published content is accurate, well-researched, and aligned with company messaging",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "2+ years of content marketing, editorial, or communications experience",
          "Strong writing and editing skills in English",
          "Experience in Web3, crypto, blockchain, fintech, or financial technology",
          "Ability to understand and explain technical concepts clearly",
          "Experience managing content calendars and multiple projects",
          "Strong research and fact-checking skills",
          "Understanding of SEO and content distribution",
          "Ability to work independently in a remote environment",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Experience with RWA or tokenization",
          "Blockchain infrastructure knowledge",
          "Experience writing technical or institutional content",
          "SEO and organic growth experience",
          "Newsletter experience",
          "Experience with X, LinkedIn, and Web3 communities",
          "Experience working with AI content and research tools",
        ],
      },
      {
        heading: "What You'll Work With",
        paragraphs: ["Marketing · Growth · Community · Product · Engineering · Partnerships · Research"],
      },
      {
        heading: "What You'll Own",
        paragraphs: ["Content Strategy → Editorial Calendar → Research → Articles → Social Content → Newsletters → Product Content → SEO"],
      },
    ],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Video Editor to create high-quality video content for Token Metrics across social media, marketing campaigns, product launches, research, and Web3 education.",
          "You'll work with the Marketing, Content, and Community teams to turn ideas and raw footage into clear, engaging visual stories.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Edit short-form and long-form video content",
          "Create videos for X, YouTube, LinkedIn, and other social platforms",
          "Edit product demos, explainers, interviews, podcasts, and educational content",
          "Create motion graphics, transitions, captions, and visual effects",
          "Repurpose long-form content into short-form clips",
          "Work with Content and Marketing teams on creative concepts",
          "Maintain consistent visual and brand quality",
          "Organize video assets and project files",
          "Optimize videos for different platforms and formats",
          "Support product launches, campaigns, events, and announcements",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "2+ years of professional video editing experience",
          "Strong portfolio of video work",
          "Experience with Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, or similar tools",
          "Strong understanding of pacing, storytelling, and visual composition",
          "Experience creating social-media video content",
          "Good understanding of motion graphics and typography",
          "Strong attention to detail",
          "Ability to work independently in a remote environment",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Web3/crypto or fintech experience",
          "After Effects experience",
          "Motion design experience",
          "YouTube and short-form content experience",
          "Experience creating technical/product explainers",
          "Experience working with AI video and editing tools",
        ],
      },
      {
        heading: "What You'll Work With",
        paragraphs: ["Content · Marketing · Community · Growth · Product · Design"],
      },
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Graphic Designer to build the visual language of Token Metrics across marketing, product launches, social media, research, events, and digital campaigns.",
          "You'll work closely with Marketing, Content, Product, and Community teams to create a consistent and premium visual identity.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Create graphics for social media, websites, campaigns, and newsletters",
          "Design marketing materials and promotional assets",
          "Create visual concepts for product launches and announcements",
          "Develop graphics for research reports and educational content",
          "Create presentations, infographics, banners, and event materials",
          "Collaborate with Content and Video teams",
          "Maintain consistency across the Token Metrics visual system",
          "Develop reusable design templates and assets",
          "Support website and landing-page visual design",
          "Research visual trends across Web3, fintech, and technology",
          "Prepare assets for different digital platforms",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "2+ years of graphic design experience",
          "Strong portfolio demonstrating digital and brand design",
          "Strong knowledge of Figma and Adobe Creative Suite or equivalent tools",
          "Good understanding of typography, layout, composition, and visual hierarchy",
          "Experience designing for digital and social platforms",
          "Strong attention to detail",
          "Ability to translate concepts into clear visual communication",
          "Ability to work independently in a remote environment",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Web3/crypto experience",
          "Motion graphics experience",
          "Brand identity experience",
          "UI/UX experience",
          "Experience designing for fintech or financial products",
          "Experience with 3D or generative design tools",
        ],
      },
      {
        heading: "What You'll Work With",
        paragraphs: ["Marketing · Content · Video · Product · Community · Growth"],
      },
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    location: "Remote / Worldwide",
    type: "Full-time or Part-time",
    sections: [
      {
        heading: "About the Role",
        paragraphs: [
          "We're looking for a Product Designer to help design Token Metrics products across real-world assets, digital markets, blockchain infrastructure, and institutional workflows.",
          "You'll work closely with Product and Engineering to turn complex financial and blockchain workflows into simple, intuitive user experiences.",
        ],
      },
      {
        heading: "Responsibilities",
        list: [
          "Design end-to-end product experiences from discovery to final UI",
          "Create user flows, wireframes, prototypes, and high-fidelity designs",
          "Design dashboards and data-heavy interfaces",
          "Design workflows for tokenized assets and digital markets",
          "Collaborate with Product Managers and Engineers",
          "Conduct user research and usability testing",
          "Translate complex technical requirements into simple experiences",
          "Build and maintain design systems",
          "Create responsive web experiences",
          "Review implemented designs and ensure visual quality",
          "Use user feedback and product analytics to improve experiences",
          "Contribute to product strategy and UX decisions",
        ],
      },
      {
        heading: "Requirements",
        list: [
          "3+ years of product design experience",
          "Strong portfolio showing shipped digital products",
          "Advanced Figma skills",
          "Strong UX and UI design fundamentals",
          "Experience designing complex web applications",
          "Understanding of responsive and accessible design",
          "Experience working closely with product and engineering teams",
          "Strong communication and problem-solving skills",
          "Ability to work independently in a remote environment",
        ],
      },
      {
        heading: "Nice to Have",
        list: [
          "Web3/crypto experience",
          "RWA or tokenization experience",
          "DeFi experience",
          "Fintech or financial-market product experience",
          "Experience designing dashboards and data visualization",
          "Experience with design systems",
          "Basic understanding of blockchain wallets and transactions",
        ],
      },
      {
        heading: "What You'll Work With",
        paragraphs: ["Product · Engineering · Blockchain · Marketing · Research · Community"],
      },
    ],
  },
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

export function findRole(slug) {
  return roles.find((role) => role.slug === slug);
}

export function findPost(slug) {
  return posts.find((p) => p.slug === slug);
}
