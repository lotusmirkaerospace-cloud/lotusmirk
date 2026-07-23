"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getSupabasePublicClient } from "@/lib/supabase/public";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const supabase = getSupabasePublicClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? "") || null,
      message: String(form.get("message") ?? ""),
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="px-6 pb-28 pt-40 sm:px-10">
      <ScrollReveal>
        <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
          Start a project
        </h1>
        <p className="mt-4 max-w-xl text-white/60">
          Tell us about your site and what you need captured — survey,
          mapping, 3D, documentation, or a mix.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-xl space-y-5"
        >
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Company" name="company" />
          <Field label="Project details" name="message" textarea required />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Send"}
          </button>

          {status === "success" && (
            <p className="text-sm text-emerald-400">
              Thanks — we&apos;ll be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong{errorMessage ? `: ${errorMessage}` : "."}{" "}
              Please try again.
            </p>
          )}
        </form>
      </ScrollReveal>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const baseClasses =
    "mt-2 w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none";

  return (
    <label className="block text-sm text-white/70">
      {label}
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={baseClasses}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={baseClasses}
        />
      )}
    </label>
  );
}
