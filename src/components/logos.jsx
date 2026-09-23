function Icon({ children, viewBox = "0 0 24 24" }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true">
      {children}
    </svg>
  );
}

function Ethereum() {
  return (
    <Icon>
      <path fill="currentColor" d="M11.944 17.97 4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0 4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
    </Icon>
  );
}

function Chainlink() {
  return (
    <Icon>
      <path fill="currentColor" d="M12 0 9.798 1.266l-6 3.468L1.596 6v12l2.202 1.266 6.055 3.468L12.055 24l2.202-1.266 5.945-3.468L22.404 18V6l-2.202-1.266-6-3.468zM6 15.468V8.532l6-3.468 6 3.468v6.936l-6 3.468z" />
    </Icon>
  );
}

function Polygon() {
  return (
    <Icon>
      <path fill="currentColor" d="m17.82 16.342 5.692-3.287A.98.98 0 0 0 24 12.21V5.635a.98.98 0 0 0-.488-.846l-5.693-3.286a.98.98 0 0 0-.977 0L11.15 4.789a.98.98 0 0 0-.489.846v11.747L6.67 19.686l-3.992-2.304v-4.61l3.992-2.304 2.633 1.52V8.896L7.158 7.658a.98.98 0 0 0-.977 0L.488 10.945a.98.98 0 0 0-.488.846v6.573a.98.98 0 0 0 .488.847l5.693 3.286a.981.981 0 0 0 .977 0l5.692-3.286a.98.98 0 0 0 .489-.846V6.618l.072-.041 3.92-2.263 3.99 2.305v4.609l-3.99 2.304-2.63-1.517v3.092l2.14 1.236a.981.981 0 0 0 .978 0v-.001Z" />
    </Icon>
  );
}

function Binance() {
  return (
    <Icon>
      <path fill="currentColor" d="M16.624 13.92 19.342 16.636 11.989 23.989 4.636 16.637l2.717-2.716 4.636 4.659 4.635-4.66zm4.637-4.637L24 12l-2.715 2.716L18.568 12l2.693-2.716zM12 9.284l2.716 2.691L12 14.693V14.692L9.272 12 11.989 9.285 12 9.284zM2.716 9.284 5.409 12 2.717 14.692 0 12l2.716-2.716zM11.989.012l7.353 7.329-2.718 2.715-4.635-4.636-4.636 4.66-2.717-2.716 7.353-7.353z" />
    </Icon>
  );
}

function Bybit() {
  return (
    <Icon>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.2 3.2h7.6c3.3 0 5.5 1.9 5.5 4.6 0 1.7-1 3.1-2.5 3.8 1.8.6 3 2.1 3 4.1 0 3-2.5 4.9-6.2 4.9H4.2V3.2Zm2.8 2.3v4.2h4.4c1.5 0 2.4-.7 2.4-2.1s-.9-2.1-2.4-2.1H7Zm0 6.6v4.7h5c1.7 0 2.8-.8 2.8-2.35S13.7 12.1 12 12.1H7Z"
      />
    </Icon>
  );
}

function Securitize() {
  return (
    <Icon>
      <rect x="1.4" y="1.4" width="21.2" height="21.2" rx="6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path fill="currentColor" d="M15.7 8.15c-.5-1.25-1.75-2.05-3.7-2.05-2.45 0-4 1.15-4 2.9 0 1.55 1.05 2.4 3.2 2.9l1.15.28c1.25.3 1.85.7 1.85 1.45 0 .9-.9 1.5-2.15 1.5-1.15 0-2.05-.5-2.35-1.35l-2.05.7c.55 1.75 2.25 2.85 4.5 2.85 2.65 0 4.4-1.3 4.4-3.2 0-1.65-1.05-2.6-3.3-3.1l-1.15-.28c-1.15-.28-1.65-.65-1.65-1.35 0-.75.75-1.25 1.95-1.25 1.05 0 1.85.4 2.15 1.15l2.15-.8Z" />
    </Icon>
  );
}

function Apollo() {
  return (
    <Icon>
      <path fill="currentColor" fillRule="evenodd" d="M12 2.1 21.8 21H2.2L12 2.1Zm0 5.5-4.7 9.1h9.4L12 7.6Z" />
      <path fill="currentColor" d="M8.7 14.7h6.6v1.7H8.7z" />
    </Icon>
  );
}

function DigiFT() {
  return (
    <Icon>
      <path fill="currentColor" fillRule="evenodd" d="M4.5 3.5h6.4C15.6 3.5 19 6.7 19 12s-3.4 8.5-8.1 8.5H4.5V3.5Zm2.7 2.6v11.8h3.4c2.9 0 4.8-2 4.8-5.9s-1.9-5.9-4.8-5.9H7.2Z" />
    </Icon>
  );
}

const marks = {
  Apollo,
  DigiFT,
  Binance,
  Bybit,
  Securitize,
  Ethereum,
  Chainlink,
  Polygon,
};

export function BrandLogo({ name }) {
  const Mark = marks[name];
  return (
    <span className="brand-lockup">
      {Mark ? <Mark /> : null}
      <span>{name}</span>
    </span>
  );
}
