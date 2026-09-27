import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signInWithOAuth, signOut, signUp, useSession } from "../auth.js";
import { BotCheckDialog } from "../components/BotCheck.jsx";
import { Mark } from "../components/ui.jsx";
import { company } from "../data.js";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
      <path fill="currentColor" d="M13.1 9.5c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.7-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.2c.7-1 1.2-2 1.5-3.1-3.9-1.5-3.9-5.4 0-6.4ZM10.7 3.2c.6-.8 1-1.8.9-2.9-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.8-.9 2.8 1.1.1 2.1-.5 2.8-1.3Z" />
    </svg>
  );
}

function SocialButtons({ onError }) {
  const [busy, setBusy] = useState("");

  async function run(kind) {
    onError("");
    setBusy(kind);
    try {
      await signInWithOAuth(kind === "gmail" ? "google" : "apple");
    } catch (err) {
      onError(err.message || "Sign-in did not complete.");
      setBusy("");
    }
  }

  return (
    <div className="social-auth">
      <button className="btn social" type="button" disabled={!!busy} onClick={() => run("gmail")}>
        <GoogleMark /> {busy === "gmail" ? "Opening Google…" : "Continue with Google"}
      </button>
      <button className="btn social" type="button" disabled={!!busy} onClick={() => run("apple")}>
        <AppleMark /> {busy === "apple" ? "Opening Apple…" : "Continue with Apple"}
      </button>
    </div>
  );
}

function AccountNotice() {
  const session = useSession();
  if (!session) return null;
  return (
    <div className="notice" style={{ marginBottom: 16 }}>
      You're signed in as {session.name}.{" "}
      <button type="button" className="text-btn" onClick={signOut}>Sign out</button>
    </div>
  );
}

function AuthFrame({ title, lede, children }) {
  return (
    <section className="auth-screen">
      <aside className="auth-aside">
        <Link to="/" className="auth-brand" aria-label="Token Metrics home">
          <Mark size={28} />
          {company.name}
        </Link>
        <div>
          <p className="auth-kicker">{company.legalName}</p>
          <h2>Infrastructure for tokenized assets.</h2>
          <p>{company.location}</p>
        </div>
        <p className="auth-aside-foot">{company.address}</p>
      </aside>
      <div className="auth-main">
        <div className="auth-card">
          <h1>{title}</h1>
          <p className="auth-lede">{lede}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SignIn() {
  const session = useSession();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (session === undefined) return null;

  return (
    <AuthFrame
      title="Sign in"
      lede="Use your work email, or continue with Google or Apple."
    >
          <AccountNotice />
          {session ? null : (
            <form
              className="form-grid auth-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setError("");
                setPending(true);
                try {
                  await signIn({ email: fd.get("email"), password: fd.get("password") });
                  navigate("/");
                } catch (err) {
                  setError(err.message);
                  setPending(false);
                }
              }}
            >
              {error ? <div className="form-error" role="alert">{error}</div> : null}
              <SocialButtons onError={setError} />
              <div className="or-line"><span>or</span></div>
              <div className="field">
                <label htmlFor="signin-email">Email</label>
                <input id="signin-email" type="email" required name="email" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="signin-password">Password</label>
                <input id="signin-password" type="password" required name="password" autoComplete="current-password" minLength={8} />
              </div>
              <BotCheckDialog />
              <button className="btn" type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
              <p className="auth-switch">
                New to {company.name}? <Link to="/sign-up">Create an account</Link>
              </p>
            </form>
          )}
    </AuthFrame>
  );
}

export function SignUp() {
  const session = useSession();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  if (session === undefined) return null;

  return (
    <AuthFrame
      title="Create an account"
      lede="Open a Token Metrics account for your organization."
    >
          <AccountNotice />
          {message ? <div className="notice" style={{ marginBottom: 16 }}>{message}</div> : null}
          {session ? null : (
            <form
              className="form-grid auth-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const password = String(fd.get("password") || "");
                const confirm = String(fd.get("confirm") || "");
                if (password.length < 8) {
                  setError("Use at least 8 characters.");
                  return;
                }
                if (password !== confirm) {
                  setError("Those passwords do not match.");
                  return;
                }
                setError("");
                setMessage("");
                setPending(true);
                try {
                  const result = await signUp({
                    name: fd.get("name"),
                    email: fd.get("email"),
                    organization: fd.get("org"),
                    password,
                  });
                  if (result.confirmEmail) {
                    setMessage("Check your email to confirm the account, then sign in.");
                    setPending(false);
                    return;
                  }
                  navigate("/");
                } catch (err) {
                  setError(err.message);
                  setPending(false);
                }
              }}
            >
              {error ? <div className="form-error" role="alert">{error}</div> : null}
              <SocialButtons onError={setError} />
              <div className="or-line"><span>or</span></div>
              <div className="field">
                <label htmlFor="signup-name">Name</label>
                <input id="signup-name" required name="name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="signup-email">Work email</label>
                <input id="signup-email" type="email" required name="email" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="signup-org">Organization</label>
                <input id="signup-org" required name="org" autoComplete="organization" />
              </div>
              <div className="field">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" required name="password" autoComplete="new-password" minLength={8} />
              </div>
              <div className="field">
                <label htmlFor="signup-confirm">Confirm password</label>
                <input id="signup-confirm" type="password" required name="confirm" autoComplete="new-password" minLength={8} />
              </div>
              <BotCheckDialog />
              <button className="btn" type="submit" disabled={pending}>{pending ? "Creating account…" : "Create account"}</button>
              <p className="auth-switch">
                Already have an account? <Link to="/sign-in">Sign in</Link>
              </p>
              <p className="auth-legal">
                By creating an account you agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </form>
          )}
    </AuthFrame>
  );
}
