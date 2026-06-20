'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(name: string, email: string, message: string) {
  const n = esc(name);
  const e = esc(email);
  const m = esc(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0A0A0F;">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="text-align:center;padding:0 0 36px;">
              <span style="font-size:26px;font-weight:700;color:#F59E0B;letter-spacing:0.25em;">ACC</span>
              <p style="color:#334155;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:6px 0 0;">Portfolio · Nuevo mensaje</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#111118;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:40px;">

              <h1 style="color:#F1F5F9;font-size:26px;font-weight:700;margin:0 0 6px;line-height:1.2;">Tienes un mensaje nuevo</h1>
              <p style="color:#475569;font-size:13px;margin:0 0 28px;">Alguien contactó a través de tu portfolio.</p>

              <!-- Amber divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,#F59E0B,transparent);margin:0 0 28px;"></div>

              <!-- From -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 0 20px;">
                    <p style="color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 5px;">Nombre</p>
                    <p style="color:#F1F5F9;font-size:17px;font-weight:600;margin:0;">${n}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 28px;">
                    <p style="color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 5px;">Email</p>
                    <a href="mailto:${e}" style="color:#F59E0B;font-size:15px;text-decoration:none;">${e}</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 28px;"></div>

              <!-- Message -->
              <p style="color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 14px;">Mensaje</p>
              <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px 24px;">
                <p style="color:#CBD5E1;font-size:15px;line-height:1.75;margin:0;">${m}</p>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin:32px 0 0;">
                <a href="mailto:${e}?subject=Re: Tu mensaje en mi portfolio"
                   style="display:inline-block;background:#F59E0B;color:#000;font-weight:700;font-size:14px;padding:14px 36px;border-radius:9999px;text-decoration:none;letter-spacing:0.02em;">
                  Responder a ${n}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;padding:28px 0 0;">
              <p style="color:#1E293B;font-size:11px;margin:0;">Adrián Cabedo Canós · Portfolio Contact Form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactEmail(formData: FormData): Promise<{ ok: boolean }> {
  const name    = String(formData.get('name')    ?? '').trim();
  const email   = String(formData.get('email')   ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) return { ok: false };

  try {
    await resend.emails.send({
      from:    'Portfolio <onboarding@resend.dev>',
      to:      'adriannulero@gmail.com',
      subject: `[Portfolio] Mensaje de ${name}`,
      replyTo: email,
      html:    buildHtml(name, email, message),
      text:    `De: ${name} <${email}>\n\nMensaje:\n${message}`,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
