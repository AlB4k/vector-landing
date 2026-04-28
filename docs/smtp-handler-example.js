// Пример серверного обработчика
// npm install nodemailer
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'your@yandex.ru',
    pass: 'your-app-password'
  }
})

// POST /api/send-mail
// req.body: { to, senderName, subject, fields }
async function sendMail(req, res) {
  try {
    const { to, senderName, subject, fields } = req.body

    await transporter.sendMail({
      from: `"${senderName}" <your@yandex.ru>`,
      to: to,
      subject: subject,
      text: Object.entries(fields)
        .map(([k,v]) => `${k}: ${v}`)
        .join('\n')
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
}

module.exports = sendMail
