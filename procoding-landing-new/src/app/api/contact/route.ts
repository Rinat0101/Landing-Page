import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import disposableDomains from "disposable-email-domains";
import rateLimit from "@/lib/RateLimit";

const limiter = rateLimit({ limit: 5, timeframe: 60 * 60 * 1000 });

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-vercel-forwarded-for") ||
      "unknown";

    const { name, email, phone, message, type, website } = await req.json();
    const MAX_MESSAGE_LENGTH = 1000;
    const baseUrl = "https://procoding.com";
    const syllabusPath = process.cwd() + "/public/files/procoding-syllabus.pdf";

    // 🛡️ Spam protection - Honeypot field
    if (website) {
      console.warn("❌ Spam bot detected");
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // 🚫 Rate limiting
    const rateCheck = await limiter.check(ip);
    if (!rateCheck.success) {
      console.warn(`⚠️ Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 🛑 Disposable email rejection
    const domain = email?.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      console.warn(`⚠️ Disposable email rejected: ${email}`);
      return NextResponse.json({ error: "Disposable email" }, { status: 400 });
    }

    // ✅ Validation
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });
    if (type === "syllabus" && !name) {
      return NextResponse.json({ error: "Name required for syllabus" }, { status: 400 });
    }
    if (type === "contact" && !name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (type === "contact" && message && message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_MESSAGE_LENGTH})` },
        { status: 400 }
      );
    }

    // 📩 Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✉️ Subject line
    const subject =
      type === "newsletter"
        ? `New Newsletter Signup: ${email}`
        : type === "syllabus"
        ? `Syllabus Download Request from ${name}`
        : `New Contact Form Submission from ${name}`;

    // 📨 Admin email template
    const htmlAdmin =
      type === "newsletter"
        ? `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 2px solid #a855f7; padding: 30px; border-radius: 16px;">
            <h2 style="color: #000;">New Newsletter Signup</h2>
            <p><strong>Email:</strong> ${email}</p>
          </div>
        </div>`
        : type === "syllabus"
        ? `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 2px solid #f59e0b; padding: 30px; border-radius: 16px;">
            <h2>Syllabus Download Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
        </div>`
        : `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; border-radius: 16px; padding: 30px;
                      border: 3px solid transparent;
                      background-clip: padding-box, border-box;
                      background-origin: border-box;
                      background-image: linear-gradient(white, white),
                      linear-gradient(135deg, #F28237, #F4EBFF, #D726B3);">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${
              message
                ? `<p style="margin-top: 20px;"><strong>Message:</strong></p>
                   <div style="background: #fff; padding: 15px; border-left: 5px solid #D726B3; border-radius: 8px;">
                     ${message}
                   </div>`
                : ""
            }
          </div>
        </div>`;

    // 📬 Send Admin Email
    await transporter.sendMail({
      from: `"ProCoding" <${process.env.SMTP_USER}>`,
      to: "apply@procoding.com",
      subject,
      replyTo: email,
      html: htmlAdmin,
    });

    // 👤 Send confirmation email to user (syllabus only)
    if (type === "syllabus") {
      const htmlUser = `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333; font-size: 17px;">
          <div style="max-width: 600px; margin: auto; border-radius: 16px; padding: 30px;
            border: 3px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: border-box;
            background-image: linear-gradient(white, white),
              linear-gradient(135deg, #F28237, #F4EBFF, #D726B3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            
            <h2 style="font-size: 22px;">Hello ${name},</h2>
            <p style="line-height: 1.6;">Thank you for your interest in our program!</p>
            <p style="line-height: 1.6;">Attached is your full syllabus PDF. Let us know if you have any questions or need help choosing the right course for you.</p>
            <p style="margin-top: 30px;">🚀 Cheers, <br/> The ProCoding Team</p>
          </div>
        </div>`;

      await transporter.sendMail({
        from: `"ProCoding" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Here’s your ProCoding Syllabus 📘",
        html: htmlUser,
        attachments: [
          {
            filename: "ProCoding-Syllabus.pdf",
            path: syllabusPath,
          },
        ],
      });
    }

    // 📡 CRM Integration (LeadConnector)
    try {
      const crmTags = [
        "Landing-Form",
        type === "syllabus" ? "syllabus" : type === "newsletter" ? "newsletter" : "contact-form",
      ];

      const crmResponse = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LEADCONNECTOR_API_TOKEN2}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          locationId: "UucgHcnRk3nVqkK7AtbU",
          firstName: name || "Unknown",
          lastName: "",
          email,
          phone,
          tags: crmTags,
        }),
      });

      const crmResult = await crmResponse.json();
      console.log("📤 CRM response:", crmResult);

      if (!crmResponse.ok) {
        console.error("❌ CRM Error:", crmResult);
      }
    } catch (err) {
      console.error("🔥 CRM integration failed:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}