// app/api/submit-lead/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Incoming request body:", body);

    const { firstName, lastName, email, phone, answers, quizSlug } = body;

    console.log("✅ Extracted fields:", {
      firstName,
      lastName,
      email,
      phone,
      answers,
      quizSlug,
    });

    const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEADCONNECTOR_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        locationId: "UucgHcnRk3nVqkK7AtbU",
        firstName,
        lastName,
        email,
        phone,
        tags: ["QuizLead", quizSlug || "unknown-quiz"],
      }),
    });

    const result = await response.json();
    console.log("📤 LeadConnector response:", result);

    if (!response.ok) {
      console.error("❌ API returned error:", result);
      return NextResponse.json({ error: result }, { status: response.status });
    }

    return NextResponse.json({ message: "Lead submitted successfully", result });
  } catch (err) {
    console.error("🔥 Server error in /api/submit-lead:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}