import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL || "info@tedxbeixinqiao.com";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<ContactPayload>;

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Basic email format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // Choose transport: Resend preferred if API key provided, else log fallback
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      // Dynamic import to avoid bundling if unused
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const subject = `TEDx Beixinqiao: New Contact`;
      const preheader = `Message from ${name} via tedxbeixinqiao.com`;
      const safeMessage = message.replace(/\n/g, "<br />");
      const html = `
      <!doctype html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${subject}</title>
          <style>
            /* Prevent Gmail iOS right-gap */
            .container { max-width: 640px; margin: 0 auto; }
            .card { background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; padding:24px; }
            .muted { color:#6b7280; }
            .brand { color:#ef4444; font-weight:700; }
            .btn { display:inline-block; padding:10px 14px; border-radius:8px; background:#ef4444; color:#fff; text-decoration:none; }
            .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
          </style>
        </head>
        <body style="background:#f8fafc; padding:24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji';">
          <!-- Preheader -->
          <span style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${preheader}</span>
          <div class="container">
            <div style="text-align:center;margin-bottom:16px;">
              <div style="font-size:18px;font-weight:800;letter-spacing:0.2px;">
                <span class="brand">TEDx</span> Beixinqiao
              </div>
              <div class="muted" style="font-size:12px;">Contact form submission</div>
            </div>
            <div class="card">
              <h1 style="margin:0 0 12px 0;font-size:20px;">New message via tedxbeixinqiao.com</h1>
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr>
                  <td class="muted" style="width:120px; padding:6px 0;">From</td>
                  <td style="padding:6px 0; font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td class="muted" style="padding:6px 0;">Email</td>
                  <td style="padding:6px 0;"><a href="mailto:${email}" class="mono">${email}</a></td>
                </tr>
                <tr>
                  <td class="muted" style="padding:6px 0;">Received</td>
                  <td style="padding:6px 0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="height:1px;background:#e5e7eb;margin:16px 0;"></div>
              <div style="font-size:14px;line-height:1.6;">
                ${safeMessage}
              </div>
              <div style="margin-top:16px;">
                <a class="btn" href="mailto:${email}" title="Reply to ${name}">Reply</a>
              </div>
            </div>
            <p class="muted" style="font-size:12px; text-align:center; margin-top:16px;">This email was sent automatically by the contact form on tedxbeixinqiao.com</p>
          </div>
        </body>
      </html>`;
      const text = `TEDx Beixinqiao — New Contact\nFrom: ${name}\nEmail: ${email}\n\n${message}`;

      const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: RECIPIENT,
        reply_to: email,
        subject,
        html,
        text,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
      }
    } else {
      // Fallback: no mail provider configured
      console.warn("Contact form: RESEND_API_KEY missing. Email not sent.", {
        to: RECIPIENT,
        name,
        email,
        message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact server error:", err);
    return NextResponse.json({ ok: false, error: (err as Error).message || "Server error" }, { status: 500 });
  }
}
