export async function sendForm(formData, deliveryConfig) {
  if (!deliveryConfig) return { success: false, error: 'Конфигурация доставки отсутствует' };

  try {
    // МЕТОД 1 — EmailJS
    if (deliveryConfig.method === 'emailjs') {
      const { serviceId, templateId, publicKey, recipientEmail } = deliveryConfig.emailjs || {};

      if (!serviceId || !templateId) {
        throw new Error('EmailJS не настроен. Укажите Service ID и Template ID в CMS.');
      }

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            organization: formData.organization,
            phone: formData.phone,
            reply_to: formData.email || 'не указан',
            message: formData.message || 'не указано',
            to_email: recipientEmail
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Ошибка при отправке через EmailJS');
      }

      return { success: true };
    }

    // МЕТОД 2 — SMTP (через прокси-API)
    if (deliveryConfig.method === 'smtp') {
      const { recipientEmail, senderName } = deliveryConfig.smtp || {};

      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          senderName: senderName || 'Сайт ВЕКТОР',
          subject: 'Новая заявка с сайта ВЕКТОР',
          fields: formData
        })
      });

      if (!response.ok) throw new Error('Ошибка при отправке через SMTP');

      return { success: true };
    }

    // МЕТОД 3 — Telegram Bot
    if (deliveryConfig.method === 'telegram') {
      const { botToken, chatId, channelId, target } = deliveryConfig.telegram || {};

      if (!botToken) {
        throw new Error('Telegram Bot не настроен. Укажите Bot Token в CMS.');
      }

      const targetId = target === 'channel' ? channelId : chatId;
      if (!targetId) {
        throw new Error(`ID ${target === 'channel' ? 'канала' : 'чата'} не указан`);
      }

      const text = [
        '📋 *Новая заявка с сайта ВЕКТОР*',
        '',
        '👤 *Имя:* ' + (formData.name || 'не указано'),
        '🏢 *Организация:* ' + (formData.organization || 'не указано'),
        '📞 *Телефон:* ' + (formData.phone || 'не указано'),
        '📧 *Email:* ' + (formData.email || 'не указан'),
        '📝 *Сообщение:* ' + (formData.message || 'не указано'),
        '',
        '⏰ ' + new Date().toLocaleString('ru-RU')
      ].join('\n');

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: targetId,
          text: text,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.description || 'Ошибка при отправке в Telegram');
      }

      return { success: true };
    }

    return { success: false, error: 'Метод отправки не выбран или не поддерживается' };

  } catch (error) {
    console.error('Form delivery error:', error);
    return { success: false, error: error.message };
  }
}
