import { useEffect, useState } from "react";
import { readBotCheck, requireBotCheck } from "./components/BotCheck.jsx";
import { supabase } from "./supabase.js";

function sessionFromUser(user) {
  if (!user) return null;
  const meta = user.user_metadata || {};
  const name = meta.name || meta.full_name || (user.email ? user.email.split("@")[0] : "Account");
  return { name, email: user.email || "" };
}

function friendlyAuthError(error) {
  const msg = error?.message || "Something went wrong.";
  if (/invalid login credentials/i.test(msg)) return "That email or password is incorrect.";
  if (/email not confirmed/i.test(msg)) return "Confirm your email, then sign in.";
  if (/already registered|already been registered/i.test(msg)) return "An account with this email already exists.";
  if (/provider is not enabled|unsupported provider/i.test(msg)) return "That sign-in provider is not enabled in Supabase yet.";
  if (/password/i.test(msg) && /at least|should be|weak/i.test(msg)) return "Use at least 8 characters.";
  if (/captcha/i.test(msg)) return "Complete the bot check, then try again.";
  return msg;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function useSession() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(sessionFromUser(data.session?.user));
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(sessionFromUser(next?.user));
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return session;
}

export async function signUp({ name, email, organization, password }) {
  requireBotCheck();
  const { data, error } = await supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
    options: {
      data: {
        name: String(name || "").trim(),
        organization: String(organization || "").trim(),
      },
      emailRedirectTo: window.location.origin,
      captchaToken: readBotCheck() || undefined,
    },
  });
  if (error) throw new Error(friendlyAuthError(error));
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error("An account with this email already exists.");
  }
  return { confirmEmail: !data.session };
}

export async function signIn({ email, password }) {
  requireBotCheck();
  const { error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
    options: { captchaToken: readBotCheck() || undefined },
  });
  if (error) throw new Error(friendlyAuthError(error));
}

export async function signInWithOAuth(provider) {
  requireBotCheck();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
      queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
      captchaToken: readBotCheck() || undefined,
    },
  });
  if (error) throw new Error(friendlyAuthError(error));
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function listRoles() {
  const { data, error } = await supabase
    .from("roles")
    .select("slug, title, location, type, sections")
    .eq("open", true)
    .order("sort", { ascending: true });
  if (error || !Array.isArray(data) || data.length === 0) return null;
  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    location: row.location || "",
    type: row.type || "",
    sections: Array.isArray(row.sections) ? row.sections : [],
  }));
}

export async function submitApplication(fields) {
  requireBotCheck();
  const { error } = await supabase.from("applications").insert({
    name: String(fields.name || "").trim(),
    email: String(fields.email || "").trim(),
    role: String(fields.role || "").trim(),
    location: String(fields.location || "").trim(),
    link: String(fields.link || "").trim(),
    note: String(fields.note || "").trim(),
  });
  if (!error) {
    return;
  }
  const msg = error.message || "";
  if (error.code === "42P01" || /could not find the table|schema cache/i.test(msg)) {
    throw new Error("Applications are not ready yet. Create the applications table in Supabase.");
  }
  if (error.code === "42501" || /row-level security/i.test(msg)) {
    throw new Error("Applications are not ready yet. Allow public inserts on the applications table.");
  }
  throw new Error("Could not send the application. Try again.");
}
