const OtpVerification = require('../models/OtpVerification');
const { sendTemplateMessage, sendTextMessage } = require('./whatsappService');

// Normalize to E.164 — prepend 91 for 10-digit Indian numbers
function normalizePhone(value) {
  const d = String(value || '').replace(/[^\d]/g, '').trim();
  return d.length === 10 ? '91' + d : d;
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtp(mobile, purpose) {
  await OtpVerification.deleteMany({ mobile, purpose });

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await OtpVerification.create({ mobile, code, purpose, expiresAt });

  const phone = normalizePhone(mobile);
  const templateName = process.env.WHATSAPP_OTP_TEMPLATE_NAME || 'bulk_invite_otp';
  const languageCode = process.env.WHATSAPP_OTP_TEMPLATE_LANGUAGE || 'en_US';
  const hasButton    = String(process.env.WHATSAPP_OTP_TEMPLATE_HAS_BUTTON || 'true') === 'true';

  let sent  = false;
  let error = null;

  try {
    const response = await sendTemplateMessage({
      to: phone,
      templateName,
      languageCode,
      bodyParameters: [code],
      ...(hasButton ? {
        buttonParameters: [{
          sub_type: 'url',
          index: '0',
          parameters: [{ type: 'text', text: code }],
        }],
      } : {}),
    });

    if (response?.skipped) {
      throw new Error(response.reason || 'WhatsApp API not configured (check WHATSAPP_ACCESS_TOKEN & WHATSAPP_PHONE_NUMBER_ID)');
    }

    sent = true;
  } catch (err) {
    // Surface the actual Meta API error message when available
    error = err?.response?.data?.error?.message || err.message || 'Unknown WhatsApp API error';
    console.error('[OTP] WhatsApp send error:', error);
  }

  const result = { sent, error };
  if (process.env.NODE_ENV !== 'production') result.devOtp = code;
  return result;
}

async function verifyOtp(mobile, code, purpose) {
  const otp = await OtpVerification.findOne({
    mobile,
    code,
    purpose,
    used: false,
    expiresAt: { $gt: new Date() },
  });
  if (!otp) return { valid: false };
  otp.used = true;
  await otp.save();
  return { valid: true };
}

// Welcome message via official WhatsApp API (fire-and-forget)
async function sendWelcomeWhatsApp(mobile, name, password) {
  if (!mobile) return;
  try {
    const phone = normalizePhone(mobile);
    const body = [
      `🎉 *Welcome to Bulk Invite, ${name}!*`,
      ``,
      `Your account has been created successfully.`,
      ``,
      `📱 *Mobile / Login:* ${mobile}`,
      `🔐 *Password:* ${password}`,
      ``,
      `Keep your credentials safe. You can change your password anytime from the app.`,
    ].join('\n');
    await sendTextMessage({ to: phone, body });
  } catch (err) {
    console.error('[OTP] sendWelcomeWhatsApp error:', err?.response?.data?.error?.message || err.message);
  }
}

// Reset confirmation via official WhatsApp API (fire-and-forget)
async function sendPasswordResetConfirmation(mobile, name) {
  if (!mobile) return;
  try {
    const phone = normalizePhone(mobile);
    const body = [
      `✅ *Password Reset Successful*`,
      ``,
      `Hi ${name}, your Bulk Invite password has been reset successfully.`,
      ``,
      `If you did not make this change, please contact your administrator immediately.`,
    ].join('\n');
    await sendTextMessage({ to: phone, body });
  } catch (err) {
    console.error('[OTP] sendPasswordResetConfirmation error:', err?.response?.data?.error?.message || err.message);
  }
}

module.exports = { sendOtp, verifyOtp, sendWelcomeWhatsApp, sendPasswordResetConfirmation };
