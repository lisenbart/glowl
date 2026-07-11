import { useState, useEffect, useRef, FormEvent, type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Mail,
  MessageSquare,
  Paperclip,
  Send,
  User,
  X,
} from "lucide-react";
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

function Field({
  icon: Icon,
  label,
  htmlFor,
  error,
  children,
}: {
  icon: ElementType;
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/60" />
        {children}
      </div>
      {error && (
        <p className="text-xs text-pink" role="alert">
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContact({ ...form, file });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
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
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="font-display text-2xl font-light tracking-[0.06em] text-white md:text-3xl">Tell us about your project</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-light text-text-secondary">
            Share the essentials. We'll review your request and get back to you with the next step.
          </p>
        </div>

        <div className="glass-panel-glow mx-auto max-w-3xl overflow-hidden rounded-[36px] md:rounded-[40px]">
          <div className="glass-panel p-6 md:p-10">
            {status === "success" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center" role="status">
                <CheckCircle2 size={44} className="mx-auto text-cyan" />
                <p className="mt-4 text-base font-light text-white">
                  Thank you. We've received your request and will review it shortly.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm text-cyan hover:underline">
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

                <div className="grid gap-5 md:grid-cols-2">
                  <Field icon={User} label="Name" htmlFor="name" error={errors.name}>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Name"
                      className={`field-input ${errors.name ? "field-error" : ""}`}
                      autoComplete="name"
                    />
                  </Field>
                  <Field icon={Mail} label="Work Email" htmlFor="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Work Email"
                      className={`field-input ${errors.email ? "field-error" : ""}`}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field icon={Building2} label="Company" htmlFor="company">
                    <input
                      id="company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Company"
                      className="field-input"
                      autoComplete="organization"
                    />
                  </Field>
                  <Field icon={MessageSquare} label="Project Type" htmlFor="projectType" error={errors.projectType}>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                      className={`field-input appearance-none ${errors.projectType ? "field-error" : ""} ${!form.projectType ? "text-text-secondary/55" : ""}`}
                    >
                      <option value="" disabled>
                        Project Type
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-[#0d0f26]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field icon={Calendar} label="Expected Deadline" htmlFor="deadline">
                  <input
                    id="deadline"
                    type="text"
                    value={form.deadline}
                    onChange={(e) => update("deadline", e.target.value)}
                    placeholder="Expected Deadline (optional)"
                    className="field-input"
                  />
                </Field>

                <Field icon={MessageSquare} label="Short Project Description" htmlFor="message" error={errors.message}>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Short project description — deliverables, references, goals..."
                    rows={4}
                    className={`field-input field-textarea ${errors.message ? "field-error" : ""}`}
                  />
                </Field>

                <div>
                  <label htmlFor="brief" className="mb-2 block text-xs font-light text-text-secondary">
                    Upload Brief or References
                  </label>
                  <div className="relative">
                    <Paperclip size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/60" />
                    <input
                      ref={fileRef}
                      id="brief"
                      type="file"
                      accept={site.acceptedFileExtensions}
                      onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                      className="field-input cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] font-light text-text-secondary/55">
                    Accepted: PDF, DOC, DOCX, PNG, JPG, WEBP · max {Math.round(site.maxUploadBytes / 1024 / 1024)}MB
                  </p>
                  {file && (
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="flex-1 truncate text-xs text-white/85">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleFile(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        className="text-text-secondary hover:text-white"
                        aria-label="Remove file"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {errors.file && (
                    <p className="mt-1 text-xs text-pink" role="alert">
                      {errors.file}
                    </p>
                  )}
                </div>

                {status === "error" && serverMsg && (
                  <p className="rounded-xl border border-pink/30 bg-pink/10 px-4 py-3 text-sm text-pink" role="alert">
                    {serverMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="gradient-button-emerald flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-medium text-white"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Request an Estimate
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
