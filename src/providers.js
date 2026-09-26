const GOOGLE_SRC = "https://accounts.google.com/gsi/client";
const APPLE_SRC = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";

export class AuthCancelled extends Error {
  constructor() {
    super("cancelled");
    this.name = "AuthCancelled";
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "1") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not reach the sign-in service.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error("Could not reach the sign-in service."));
    document.head.appendChild(script);
  });
}

export function preloadProviders() {
  const jobs = [];
  if (import.meta.env.VITE_GOOGLE_CLIENT_ID) jobs.push(loadScript(GOOGLE_SRC));
  if (import.meta.env.VITE_APPLE_CLIENT_ID) jobs.push(loadScript(APPLE_SRC));
  return Promise.all(jobs);
}

function decodeJwt(token) {
  const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = part + "=".repeat((4 - (part.length % 4)) % 4);
  return JSON.parse(atob(padded));
}

export function signInWithGoogle() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) return Promise.reject(new Error("Gmail sign-in is not configured."));
  return loadScript(GOOGLE_SRC).then(() => new Promise((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (response) => {
        if (response.error) {
          reject(response.error === "access_denied" ? new AuthCancelled() : new Error("Gmail sign-in did not complete."));
          return;
        }
        try {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          });
          if (!res.ok) throw new Error("Could not read the Gmail account.");
          const profile = await res.json();
          if (!profile.email) throw new Error("That Gmail account did not share an email address.");
          resolve({
            provider: "google",
            providerId: profile.sub,
            email: profile.email,
            name: profile.name || profile.email,
          });
        } catch (err) {
          reject(err instanceof Error ? err : new Error("Could not read the Gmail account."));
        }
      },
      error_callback: (err) => {
        reject(err?.type === "popup_closed" ? new AuthCancelled() : new Error("Gmail sign-in did not complete."));
      },
    });
    client.requestAccessToken({ prompt: "select_account" });
  }));
}

export async function signInWithApple() {
  const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
  if (!clientId) throw new Error("Apple sign-in is not configured.");
  await loadScript(APPLE_SRC);
  window.AppleID.auth.init({
    clientId,
    scope: "name email",
    redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI || `${window.location.origin}/sign-in`,
    usePopup: true,
  });
  let result;
  try {
    result = await window.AppleID.auth.signIn();
  } catch (err) {
    const code = err?.error || err?.message;
    if (code === "popup_closed_by_user" || code === "user_cancelled_authorize") throw new AuthCancelled();
    throw new Error("Apple sign-in did not complete.");
  }
  const payload = decodeJwt(result.authorization.id_token);
  const given = result.user?.name;
  const name = [given?.firstName, given?.lastName].filter(Boolean).join(" ");
  return {
    provider: "apple",
    providerId: payload.sub,
    email: payload.email || "",
    name: name || payload.email || "Apple account",
  };
}
