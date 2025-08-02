const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (to, subject, message) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to: ${to}`);
  } catch (error) {
    console.error(`SendGrid error: ${error.message}`);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
