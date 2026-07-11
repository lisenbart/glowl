import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const { name, email, company, projectType, budget, message } = body;

    if (!name?.trim() || !email?.trim() || !projectType?.trim() || !budget?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const payload: ContactPayload = {
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() ?? "",
      projectType: projectType.trim(),
      budget: budget.trim(),
      message: message.trim(),
    };

    // TODO: Integrate Resend, Formspree, or another email service here.
    console.log("[GLOWL WORKS] New inquiry:", payload);

    return NextResponse.json({ success: true, message: "Inquiry received successfully." });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
