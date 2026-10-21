import { NextResponse } from 'next/server';
import { checkAuthFromRequest } from '@/lib/serverAuth';
import { getTelegramConfig, saveTelegramConfig, sendTelegramMessage } from '@/lib/telegramNotifier';

export async function GET(request) {
  if (!checkAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const config = getTelegramConfig();
    const maskedToken = config.botToken
      ? `${config.botToken.slice(0, 6)}••••••••${config.botToken.slice(-4)}`
      : '';

    return NextResponse.json({
      enabled: config.enabled !== false,
      hasToken: Boolean(config.botToken),
      maskedToken,
      chatId: config.chatId || ''
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read Telegram configuration' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const action = body.action || 'save';

    if (action === 'test') {
      const current = getTelegramConfig();
      const botToken = (body.botToken || current.botToken || '').trim();
      const chatId = (body.chatId || current.chatId || '').trim();

      if (!botToken || !chatId) {
        return NextResponse.json({ error: 'Both Bot Token and Chat ID are required to send a test message.' }, { status: 400 });
      }

      const testMessage = 
        `🧪 <b>Dr. Mayank Ahooja Sanctuary — Test Alert</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `✅ <b>Connection Successful!</b>\n\n` +
        `Your Telegram bot is now actively connected to your website.\n` +
        `Whenever a client submits a consultation inquiry or question, you will receive an instant alert here on your phone with full client details.\n\n` +
        `⏰ <i>Tested at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</i>`;

      await sendTelegramMessage({
        text: testMessage,
        botToken,
        chatId
      });

      return NextResponse.json({ success: true, message: 'Test notification sent to Telegram successfully! Check your phone.' });
    }

    // Default action: save
    const updated = saveTelegramConfig({
      enabled: body.enabled !== false,
      botToken: body.botToken,
      chatId: body.chatId
    });

    return NextResponse.json({
      success: true,
      message: 'Telegram settings saved successfully.',
      config: {
        enabled: updated.enabled,
        hasToken: Boolean(updated.botToken),
        chatId: updated.chatId
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Operation failed' }, { status: 500 });
  }
}
