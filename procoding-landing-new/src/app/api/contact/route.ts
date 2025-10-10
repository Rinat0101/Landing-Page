import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import disposableDomains from "disposable-email-domains";
import rateLimit from "@/lib/RateLimit";

const limiter = rateLimit({ limit: 5, timeframe: 60 * 60 * 1000 }); // 5 requests/hour/IP

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-vercel-forwarded-for") ||
      "unknown";

    const { name, email, phone, message, type, website } = await req.json();
    const MAX_MESSAGE_LENGTH = 1000;

    // 🧠 Honeypot anti-spam
    if (website) {
      console.warn("❌ Spam bot detected");
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // ❌ Rate limiting
    const rateCheck = await limiter.check(ip);
    if (!rateCheck.success) {
      console.warn(`⚠️ Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 🛑 Disposable email
    const domain = email?.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      console.warn(`⚠️ Disposable email rejected: ${email}`);
      return NextResponse.json(
        { error: "Disposable email detected" },
        { status: 400 }
      );
    }

    // ✏️ Validation
    if (!email)
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    if (type === "syllabus" && !name)
      return NextResponse.json(
        { error: "Name is required for syllabus requests" },
        { status: 400 }
      );
    if (type !== "newsletter" && type !== "syllabus" && (!name || !message))
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    if (type === "contact" && message.length > MAX_MESSAGE_LENGTH)
      return NextResponse.json(
        { error: `Message too long (max ${MAX_MESSAGE_LENGTH})` },
        { status: 400 }
      );

    const logoUrl = "https://procoding.com/images/logo.svg"; // ✅ Public logo

    const syllabusPath = process.cwd() + "/public/files/procoding-syllabus.pdf";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject =
      type === "newsletter"
        ? `New Newsletter Signup: ${email}`
        : type === "syllabus"
        ? `Syllabus Download Request from ${name}`
        : `New Contact Form Submission from ${name}`;

    const htmlAdmin =
      type === "newsletter"
        ? `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 2px solid #a855f7; padding: 30px; border-radius: 16px;">
            <img src="${logoUrl}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
            <h2 style="color: #000;">New Newsletter Signup</h2>
            <p><strong>Email:</strong> ${email}</p>
          </div>
        </div>`
        : type === "syllabus"
        ? `
        <div style="padding: 40px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 2px solid #f59e0b; padding: 30px; border-radius: 16px;">
            <img src="${logoUrl}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
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
            <img src="${logoUrl}" alt="Logo" style="width: 120px; margin-bottom: 20px;" />
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p style="margin-top: 20px;"><strong>Message:</strong></p>
            <div style="background: #fff; padding: 15px; border-left: 5px solid #D726B3; border-radius: 8px;">
              ${message}
            </div>
          </div>
        </div>`;

    // 📨 Send internal email
    await transporter.sendMail({
      from: `"ProCoding" <${process.env.SMTP_USER}>`,
      to: "apply@procoding.com",
      subject,
      replyTo: email,
      html: htmlAdmin,
    });

    // 📩 Send syllabus to user (if needed)
    if (type === "syllabus") {
      await transporter.sendMail({
        from: `"ProCoding" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Here’s your ProCoding Syllabus 📘",
        html: `
  <div style="
    padding: 40px;
    font-family: Arial, sans-serif;
    color: #333;
    font-size: 16px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      border-radius: 16px;
      padding: 30px;
      border: 3px solid transparent;
      background-clip: padding-box, border-box;
      background-origin: border-box;
      background-image: linear-gradient(white, white),
        linear-gradient(135deg, #F28237, #F4EBFF, #D726B3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    ">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="ProCoding Logo" style="width: 120px; margin-bottom: 20px;" />
      </div>
      <h2 style="font-size: 22px;">Hello ${name},</h2>
      <p style="line-height: 1.6;">Thank you for your interest in our program!</p>
      <p style="line-height: 1.6;">Attached is your full syllabus PDF. Let us know if you have any questions or need help deciding which course is right for you.</p>
      <p style="margin-top: 30px;">🚀 Cheers, <br/> The ProCoding Team</p>

      <div style="margin-top: 40px; text-align: center;">
        <a href="https://www.instagram.com/procodingcom" target="_blank" style="margin: 0 10px; display: inline-block;">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" style="width: 28px; height: 28px;" />
        </a>
        <a href="https://www.linkedin.com/company/pro-coding" target="_blank" style="margin: 0 10px; display: inline-block;">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" style="width: 28px; height: 28px;" />
        </a>
      </div>
    </div>
  </div>
`,
        attachments: [
          {
            filename: "ProCoding-Syllabus.pdf",
            path: syllabusPath,
          },
        ],
      });
    }

    console.log("✅ Email(s) sent successfully.");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error in /api/contact:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
