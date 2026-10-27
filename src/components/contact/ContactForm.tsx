"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL as inbox, ENQUIRY_SUBJECT as subject, sendEnquiry } from "@/lib/contact";

const inputClass =
  "w-full rounded-lg border border-line bg-paper/60 px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-ink/40 focus:border-ink focus:bg-paper";

export default function ContactForm() {
  const [brief, setBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submitting = useRef(false);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current || status === "sent") return;
    const data = new FormData(e.currentTarget);
    if (data.get("_honey")) return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Name, email, and a short message are all we need.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email doesn't look right.");
      return;
    }
    if (name.length > 200 || email.length > 254 || phone.length > 80 || message.length > 10000) {
      setError("Please keep your name under 200 characters and your message under 10,000 characters.");
      return;
    }
    setError(null);
    setCopied(false);
    window.clearTimeout(copyTimer.current);
    setBrief(
      [
        `New project brief — PerPixel`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        ``,
        message,
      ]
        .filter((l): l is string => l !== null)
        .join("\n")
    );
    submitting.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      await sendEnquiry({ name, email, phone, message }, controller.signal);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("We couldn't confirm your enquiry was sent. Your details are still here — try again, or email us directly below.");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div id="form" className="scroll-mt-28">
      <form
        onSubmit={onSubmit}
        onChange={() => {
          if (status === "sent") setStatus("idle");
          setError(null);
        }}
        action={`https://formsubmit.co/${inbox}`}
        method="POST"
        aria-busy={status === "sending"}
        className="rounded-card border border-butter bg-blush-soft p-6 md:p-8"
        noValidate
      >
        <input type="hidden" name="_subject" value={subject} />
        <input type="hidden" name="_template" value="table" />
        <div className="hidden" aria-hidden="true">
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-label="Leave this field empty" />
        </div>
        <fieldset disabled={status === "sending"} className="grid min-w-0 gap-5">
          <Field label="Name">
            <input name="name" className={inputClass} placeholder="Enter your name" autoComplete="name" maxLength={200} required />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              className={inputClass}
              placeholder="you@studio.com"
              autoComplete="email"
              maxLength={254}
              required
            />
          </Field>
          <Field label="Phone Number">
            <input
              name="phone"
              type="tel"
              className={inputClass}
              placeholder="Your phone or WhatsApp number"
              autoComplete="tel"
              maxLength={80}
            />
          </Field>
          <Field label="Message">
            <textarea
              name="message"
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Tell us about your project"
              required
              maxLength={10000}
            />
          </Field>
        </fieldset>

        {error && <p className="mt-4 text-sm text-[#a3442c]" role="alert">{error}</p>}

        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="mt-6 w-full rounded-lg bg-ink py-3.5 text-sm font-semibold text-paper transition-[background-color,transform] duration-200 ease-out-expo hover:bg-ink/90 active:scale-[0.99] disabled:cursor-default disabled:opacity-60 motion-reduce:transform-none"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Enquiry submitted" : "Send enquiry"}
        </button>
        {status === "sent" && (
          <p className="mt-4 text-sm text-ink/80" role="status">
            Thank you — your enquiry has been submitted. We aim to reply within two working days.
          </p>
        )}
        <p className="mt-3 text-center text-xs text-ink/50">
          Prefer email? <a href={`mailto:${inbox}`} className="underline underline-offset-2">{inbox}</a>
        </p>
        <p className="mt-2 text-center text-xs text-ink/50">
          Your enquiry is processed by FormSubmit and emailed to PerPixel so we can respond.
        </p>
      </form>

      {brief && (
        <div className="mt-6 rounded-card border border-line bg-white p-6" role="status">
          <p className="text-sm font-semibold">Your enquiry copy.</p>
          <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-paper p-4 text-[13px] leading-relaxed text-ink/80 [overflow-wrap:anywhere]">
            {brief}
          </pre>
          <button
            type="button"
            onClick={copyBrief}
            className="mt-4 rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-paper transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
          >
            {copied ? "Copied" : "Copy brief"}
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
        {label}
      </span>
      {children}
    </label>
  );
}
