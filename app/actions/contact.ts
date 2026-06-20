'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      text:    `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
