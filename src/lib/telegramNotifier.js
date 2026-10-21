import fs from 'fs';
import path from 'path';

const contentDir = path.resolve(process.cwd(), 'content');
const configPath = path.join(contentDir, 'telegram_config.json');

/**
 * Get current Telegram Bot configuration
 */
export function getTelegramConfig() {
  let config = {
    enabled: true,
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || ''
  };

  try {
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      config = {
        enabled: data.enabled !== false,
        botToken: data.botToken || config.botToken,
        chatId: data.chatId || config.chatId
      };
    }
  } catch (err) {
    console.error('Error reading telegram_config.json:', err);
  }

  return config;
}

/**
 * Save Telegram Bot configuration
 */
export function saveTelegramConfig(newConfig) {
  try {
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    const current = getTelegramConfig();
    const updated = {
      enabled: newConfig.enabled !== undefined ? Boolean(newConfig.enabled) : current.enabled,
      botToken: (newConfig.botToken ?? current.botToken).trim(),
      chatId: (newConfig.chatId ?? current.chatId).trim(),
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(configPath, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  } catch (err) {
    console.error('Error saving telegram_config.json:', err);
    throw err;
  }
}

/**
 * Format inquiry details as clean Telegram HTML
 */
export function formatInquiryMessage(inq) {
  const dateStr = inq.date 
    ? new Date(inq.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const location = [inq.city, inq.country].filter(Boolean).join(', ') || 'Not specified';
  const ageGender = [inq.age ? `${inq.age} yrs` : null, inq.gender].filter(Boolean).join(' • ') || 'Not specified';
  const focus = inq.preferredFocus || inq.service || 'General Sanctuary Consultation';
  const cleanPhone = (inq.phone || '').replace(/[^0-9+]/g, '');

  let text = `🔔 <b>NEW CONSULTATION INQUIRY</b>\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  text += `👤 <b>Name:</b> ${escapeHtml(inq.name || 'Anonymous Guest')}\n`;
  text += `📱 <b>Phone:</b> <a href="tel:${cleanPhone}">${escapeHtml(inq.phone || 'N/A')}</a> | <a href="https://wa.me/${cleanPhone.replace('+', '')}">WhatsApp ↗</a>\n`;
  text += `📧 <b>Email:</b> <a href="mailto:${escapeHtml(inq.email || '')}">${escapeHtml(inq.email || 'N/A')}</a>\n`;
  text += `📍 <b>Location:</b> ${escapeHtml(location)}\n`;
  text += `🎂 <b>Age/Gender:</b> ${escapeHtml(ageGender)}\n`;
  text += `✦ <b>Focus / Service:</b> ${escapeHtml(focus)}\n\n`;

  if (inq.symptoms && inq.symptoms.trim()) {
    text += `🩺 <b>Symptoms & Concerns:</b>\n<i>${escapeHtml(inq.symptoms.trim())}</i>\n\n`;
  }

  if (inq.intentionsNote && inq.intentionsNote.trim() && inq.intentionsNote !== inq.symptoms) {
    text += `💬 <b>Personal Notes:</b>\n${escapeHtml(inq.intentionsNote.trim())}\n\n`;
  } else if (inq.message && inq.message.trim() && inq.message !== inq.symptoms) {
    text += `💬 <b>Message:</b>\n${escapeHtml(inq.message.trim())}\n\n`;
  }

  text += `⏰ <i>Received: ${dateStr} (IST)</i>\n`;
  text += `🌐 <i>Dr. Mayank Ahooja Sanctuary Website</i>`;

  return text;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Send an arbitrary message via Telegram Bot
 */
export async function sendTelegramMessage({ text, botToken, chatId }) {
  if (!botToken || !chatId) {
    throw new Error('Telegram botToken and chatId are required');
  }

  const cleanToken = botToken.trim();
  const cleanChatId = chatId.trim();
  const url = `https://api.telegram.org/bot${cleanToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: cleanChatId,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });

  const resJson = await response.json();
  if (!resJson.ok) {
    throw new Error(resJson.description || 'Failed to send Telegram message');
  }

  return resJson;
}

/**
 * High-level alert triggered when a new inquiry arrives
 */
export async function notifyNewInquiry(inquiry) {
  try {
    const config = getTelegramConfig();
    if (!config.enabled || !config.botToken || !config.chatId) {
      return { skipped: true, reason: 'Telegram bot not configured or disabled' };
    }

    const text = formatInquiryMessage(inquiry);
    const result = await sendTelegramMessage({
      text,
      botToken: config.botToken,
      chatId: config.chatId
    });

    return { success: true, result };
  } catch (err) {
    console.error('Failed to dispatch Telegram inquiry alert:', err.message);
    return { success: false, error: err.message };
  }
}
