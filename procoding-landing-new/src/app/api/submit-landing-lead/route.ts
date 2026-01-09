// app/api/submit-landing-lead/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Incoming landing page lead:", body);

    const { firstName, lastName, email, phone } = body;

    const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEADCONNECTOR_LANDING_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        locationId: "pit-d5555010-801d-4ddc-8e1e-c9646c62b116",
        firstName,
        lastName,
        email,
        phone,
        tags: ["LandingPageLead"],
      }),
    });

    const result = await response.json();
    console.log("📤 LeadConnector response:", result);

    if (!response.ok) {
      console.error("❌ API returned error:", result);
      return NextResponse.json({ error: result }, { status: response.status });
    }

    return NextResponse.json({ message: "Landing lead submitted successfully", result });
  } catch (err) {
    console.error("🔥 Server error in /api/submit-landing-lead:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}