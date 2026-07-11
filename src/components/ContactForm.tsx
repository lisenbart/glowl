import { useState, useRef, FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronRight, X } from "lucide-react";
import { projectTypes } from "@/data/services";
import { sectionIds, site } from "@/data/site";
import { submitContact, validateContact } from "@/lib/contactSubmit";

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  deadline: string;
  honeypot: string;
}

type Status = "idle" | "loading" | "success" | "error";

const OPTIONAL_HINT = "optional";

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={`inquiry-label ${error ? "inquiry-label--error" : ""}`}>
        {label}
        {required && <span className="inquiry-required">*</span>}
        {optional && <span className="inquiry-optional">{OPTIONAL_HINT}</span>}
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
    company: "",
    projectType: "",
    message: "",
    deadline: "",
    honeypot: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleFile = (f: File | null) => {
    setFile(f);
    if (errors.file) setErrors((p) => ({ ...p, file: "" }));
  };

  const focusFirstError = (validationErrors: Record<string, string>) => {
    const order = ["email", "name", "projectType", "message", "file"];
    const first = order.find((key) => validationErrors[key]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContact({ ...form, file });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      focusFirstError(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    setServerMsg("");

    const result = await submitContact({ ...form, file });
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", company: "", projectType: "", message: "", deadline: "", honeypot: "" });
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } else {
      setStatus("error");
      setServerMsg(result.message);
    }
  };

  return (
    <section id={sectionIds.contact} className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]" aria-label="Contact form">
      <div className="mx-auto max-w-[920px]">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="section-heading">Request an estimate</h2>
          <p className="mx-auto mt-3 max-w-md text-[0.9375rem] font-light leading-relaxed text-text-secondary md:text-base">
            No commitment. We respond within 24 hours.
          </p>
        </div>

        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            {status === "success" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center" role="status">
                <CheckCircle2 size={44} className="mx-auto link-accent" />
                <p className="mt-4 text-base font-light text-text-primary">
                  Thank you. We've received your request and will review it shortly.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm link-accent hover:underline">
                  Send another request
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

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Company" htmlFor="contact-company" optional>
                    <input
                      id="contact-company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="inquiry-input"
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="Project type" htmlFor="contact-projectType" required error={errors.projectType}>
                    <div className="relative">
                      <select
                        id="contact-projectType"
                        value={form.projectType}
                        onChange={(e) => update("projectType", e.target.value)}
                        className={`inquiry-input inquiry-select w-full ${errors.projectType ? "inquiry-input--error" : ""} ${!form.projectType ? "inquiry-input--empty" : ""}`}
                      >
                        <option value="">Select type</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="inquiry-select-chevron pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    </div>
                  </Field>
                </div>

                <Field label="Deadline" htmlFor="contact-deadline" optional>
                  <input
                    id="contact-deadline"
                    type="text"
                    value={form.deadline}
                    onChange={(e) => update("deadline", e.target.value)}
                    placeholder="e.g. March 2026"
                    className="inquiry-input"
                  />
                </Field>

                <Field label="Brief" htmlFor="contact-message" required error={errors.message}>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Deliverables, references, timeline..."
                    rows={4}
                    className={`inquiry-input inquiry-textarea resize-none ${errors.message ? "inquiry-input--error" : ""}`}
                  />
                </Field>

                <Field label="Attach file" htmlFor="contact-brief" optional error={errors.file}>
                  <input
                    ref={fileRef}
                    id="contact-brief"
                    type="file"
                    accept={site.acceptedFileExtensions}
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                    className="inquiry-file-input"
                  />
                  {file && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-text-primary">
                      <span className="flex-1 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleFile(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="text-text-secondary hover:text-text-primary"
                        aria-label="Remove file"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </Field>

                {status === "error" && serverMsg && (
                  <p className="alert-error rounded-xl px-4 py-3 text-sm" role="alert">
                    {serverMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="gradient-button-emerald btn-on-accent flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-medium uppercase tracking-[0.14em]"
                >
                  {status === "loading" ? (
                    <>
                      <span className="form-spinner h-4 w-4 animate-spin rounded-full border-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request an Estimate
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
