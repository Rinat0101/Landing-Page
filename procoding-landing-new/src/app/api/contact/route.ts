import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();

  const MAX_MESSAGE_LENGTH = 1000;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message is too long. Max length is ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"ProCoding" <${process.env.SMTP_USER}>`,
      to: "apply@procoding.com",
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
      <div style="padding: 40px; background: #ffffff; font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 16px; padding: 30px; border: 3px solid transparent; background-clip: padding-box, border-box; background-origin: border-box; background-image: linear-gradient(white, white), linear-gradient(135deg, #F28237, #F4EBFF, #D726B3);">
          
          <h2 style="text-align: center; color: black; margin-bottom: 30px;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
            <tr>
              <td style="padding: 8px 0;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            ${
              phone
                ? `<tr>
                     <td style="padding: 8px 0;"><strong>Phone:</strong></td>
                     <td style="padding: 8px 0;">${phone}</td>
                   </tr>`
                : ""
            }
          </table>

          <div style="margin-top: 25px;">
            <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
            <div style="background: #ffffff; padding: 15px; border-left: 5px solid #B923AE; border-radius: 8px; white-space: pre-line; display: flex; align-items: flex-start; min-height: 60px;">
              ${message}
            </div>
          </div>

          <!-- Social Media -->
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-weight: bold; margin-bottom: 12px;">Follow us on social media</p>
            <a href="https://www.linkedin.com/company/pro-coding" target="_blank" style="margin: 0 10px;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="28" height="28" style="vertical-align: middle;" />
            </a>
            <a href="https://www.instagram.com/procoding.us?igsh=NTdxenQ3bWttY3V4" target="_blank" style="margin: 0 10px;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="28" height="28" style="vertical-align: middle;" />
            </a>
          </div>

          <!-- Footer -->
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
            This email was generated from the 
            <a href="https://procoding.com" style="color: #7C3AED; text-decoration: none;">ProCoding</a> 
            Contact Form 
          </p>
        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}