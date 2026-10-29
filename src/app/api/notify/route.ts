import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, phone, perfumeTitle, totalPrice, address, orderId } = body

    const TELEGRAM_BOT_TOKEN = '9116906024:AAG8oKSm9ToB8-v6kQhYE2PZ2nDrlJv1NZc'
    const TELEGRAM_CHAT_ID = '934013526'

    const message = 
      `✨ *طلب جديد في سُكُون (SUKOON)* ✨\n\n` +
      `🆔 *رقم الطلب:* \`${orderId || 'NEW'}\`\n` +
      `👤 *العميل:* ${customerName}\n` +
      `📞 *الهاتف:* \`${phone}\`\n` +
      `📍 *العنوان:* ${address || 'غير محدد'}\n` +
      `🏺 *العطور:* ${perfumeTitle}\n` +
      `💰 *الإجمالي:* *${totalPrice?.toLocaleString()} EGP*\n\n` +
      `⏱ _يرجى مراجعة وتجهيز الشحنة عبر لوحة الإدارة._`

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    const data = await res.json()

    if (!data.ok) {
      console.error('Telegram API error:', data.description)
      return NextResponse.json({ success: false, error: data.description }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Telegram notification error:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}