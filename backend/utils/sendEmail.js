const nodemailer = require('nodemailer');

// Generic email-sending utility used across the ShopNest app
// (welcome emails, order confirmations, etc.)
const sendEmail = async ({ email, subject, message }) => {
  try {
    // Configure the transport using Gmail as the SMTP service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // App Password mapping
      },
    });

    const mailOptions = {
      from: `"ShopNest Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    // Errors are logged but not thrown, so email failures don't break the calling flow
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;
