const nodemailer = require("nodemailer");
require("dotenv").config();

// Konfigurasi transporter menggunakan SMTP Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fungsi untuk mengirim email reset password
const sendResetPasswordEmail = async (toEmail, resetToken) => {
  try {
    // Gunakan CLIENT_URL atau FRONTEND_URL dari .env
    const clientUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Burniva App" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Permintaan Reset Password - Burniva",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2F855A; text-align: center;">Reset Kata Sandi Burniva</h2>
          <p>Halo,</p>
          <p>Kami menerima permintaan untuk mengatur ulang (reset) kata sandi akun Burniva Anda yang tertaut dengan email ini.</p>
          <p>Jika Anda merasa melakukan permintaan ini, silakan klik tombol di bawah ini untuk mengatur ulang kata sandi Anda:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #2F855A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          
          <p>Atau Anda dapat menyalin dan menempelkan tautan berikut ke browser Anda:</p>
          <p style="word-break: break-all; color: #555;">
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          
          <p style="color: #e53e3e; font-size: 14px;"><strong>Penting:</strong> Tautan ini hanya berlaku selama 1 Jam.</p>
          
          <p>Jika Anda tidak pernah meminta reset kata sandi, abaikan saja email ini. Akun Anda akan tetap aman.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center;">© 2026 Burniva Capstone Project</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email reset terkirim: " + info.response);
    return true;

  } catch (error) {
    console.error("Gagal mengirim email reset:", error);
    throw new Error("Gagal mengirim email reset.");
  }
};

module.exports = {
  sendResetPasswordEmail,
};
