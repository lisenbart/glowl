import { useState, FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { sectionIds, site } from "@/data/site";
import { submitContact, validateContact } from "@/lib/contactSubmit";

interface FormState {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

type Status = "idle" | "loading" | "success" | "error";

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={`inquiry-label ${error ? "inquiry-label--error" : ""}`}>
        {label}
        {required && <span className="inquiry-required">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const update = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const focusFirstError = (validationErrors: Record<string, string>) => {
    const order = ["email", "name", "message"];
    const first = order.find((key) => validationErrors[key]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      company: "",
      projectType: "",
      message: form.message,
      honeypot: form.honeypot,
    };
    const validationErrors = validateContact(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      focusFirstError(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    setServerMsg("");

    const result = await submitContact(payload);
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", message: "", honeypot: "" });
    } else {
      setStatus("error");
      setServerMsg(result.message);
    }
  };

  return (
    <section id={sectionIds.contact} className="scroll-mt-24 w-full max-w-full min-w-0 px-[var(--page-padding)] pb-[var(--section-spacing)]" aria-label="Contact form">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card inquiry-panel">
          <div className="how-ios-card-inner">
            <div className="section-card-header inquiry-panel__header">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                Let's talk about your project.
              </h2>
              <p className="section-card-header__lead how-support-line">
                No commitment — just a real answer within 24 hours.
              </p>
            </div>

            {status === "success" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center" role="status">
                <CheckCircle2 size={44} className="mx-auto link-accent" />
                <p className="mt-4 text-base font-light text-text-primary">
                  Got it — thank you. We'll take a proper look and get back to you soon.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm link-accent hover:underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <input
                  type="text"
                  name="website"
                  value={form.honeypot}
                  onChange={(e) => update("honeypot", e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" htmlFor="contact-name" required error={errors.name}>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={`inquiry-input ${errors.name ? "inquiry-input--error" : ""}`}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Work email" htmlFor="contact-email" required error={errors.email}>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`inquiry-input ${errors.email ? "inquiry-input--error" : ""}`}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Brief" htmlFor="contact-message" required error={errors.message}>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="What are you working on?"
                    rows={4}
                    className={`inquiry-input inquiry-textarea resize-none ${errors.message ? "inquiry-input--error" : ""}`}
                  />
                </Field>

                {status === "error" && serverMsg && (
                  <p className="alert-error rounded-xl px-4 py-3 text-sm" role="alert">
                    {serverMsg}
                  </p>
                )}

                <div className="estimate-cta-actions flex w-full min-w-0 max-w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="gradient-button-emerald btn-on-accent flex w-full min-w-0 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium sm:flex-1"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="form-spinner h-4 w-4 animate-spin rounded-full border-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send it over
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${site.email}`}
                    className="estimate-cta-secondary w-full min-w-0 sm:flex-1"
                  >
                    Email Us Directly
                  </a>
                </div>
              </form>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
