import { site } from "@/data/site";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
  deadline?: string;
  file?: File | null;
  honeypot?: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: ContactPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.honeypot?.trim()) {
    errors.form = "Submission blocked.";
    return errors;
  }
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Work email is required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email";
  if (!data.message.trim()) errors.message = "Brief is required";

  if (data.file) {
    if (data.file.size > site.maxUploadBytes) {
      errors.file = `File must be under ${Math.round(site.maxUploadBytes / 1024 / 1024)}MB`;
    } else {
      const ext = data.file.name.split(".").pop()?.toLowerCase() ?? "";
      const allowedExt = ["pdf", "doc", "docx", "png", "jpg", "jpeg", "webp"];
      const typeOk = site.acceptedFileTypes.includes(
        data.file.type as (typeof site.acceptedFileTypes)[number]
      );
      if (!typeOk && !allowedExt.includes(ext)) {
        errors.file = "Unsupported file type";
      }
    }
  }

  return errors;
}

export async function submitContact(data: ContactPayload): Promise<ContactResult> {
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, message: Object.values(errors)[0] };
  }

  if (site.contactEndpoint) {
    const body = new FormData();
    body.append("name", data.name.trim());
    body.append("email", data.email.trim());
    body.append("message", data.message.trim());
    if (data.company?.trim()) body.append("company", data.company.trim());
    if (data.projectType) body.append("projectType", data.projectType);
    if (data.deadline?.trim()) body.append("deadline", data.deadline.trim());
    if (data.file) body.append("file", data.file);

    const res = await fetch(site.contactEndpoint, { method: "POST", body });
    if (!res.ok) {
      return { success: false, message: "Could not send your request. Please try again." };
    }
    return {
      success: true,
      message: "Got it — thank you. We'll take a proper look and get back to you soon.",
    };
  }

  console.info("[GLOWL WORKS] Estimate request:", {
    name: data.name,
    email: data.email,
    message: data.message,
  });
  await new Promise((r) => setTimeout(r, 600));
  return {
    success: true,
    message: "Got it — thank you. We'll take a proper look and get back to you soon.",
  };
}
