import { Resend } from 'resend'

const TO_EMAIL = 'lucymohamed555@gmail.com'

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json()

    if (!name?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'Please add your name and a message.' },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'Email is not configured yet. Please add RESEND_API_KEY.' },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)

    const safeName = String(name).slice(0, 120)
    const safeMessage = String(message).slice(0, 4000)

    const { error } = await resend.emails.send({
      from: 'M & L Engagement <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: TO_EMAIL,
      subject: `New engagement message from ${safeName}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; background:#f5f1e8; padding:32px;">
          <div style="max-width:520px;margin:0 auto;background:#fffdf8;border:1px solid #e4dcc9;border-radius:16px;padding:32px;">
            <p style="letter-spacing:3px;text-transform:uppercase;color:#b08d57;font-size:12px;margin:0 0 8px;">A new message</p>
            <h1 style="font-size:24px;color:#2a2621;margin:0 0 24px;">From ${safeName}</h1>
            <p style="font-size:16px;line-height:1.7;color:#4a463f;white-space:pre-wrap;margin:0;">${safeMessage.replace(/</g, '&lt;')}</p>
            <hr style="border:none;border-top:1px solid #e4dcc9;margin:28px 0;" />
            <p style="font-size:13px;color:#9a9384;margin:0;">Sent from your engagement website · M &amp; L</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.log('[v0] Resend error:', error)
      return Response.json({ error: 'Could not send your message. Please try again.' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.log('[v0] Message route error:', err)
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
