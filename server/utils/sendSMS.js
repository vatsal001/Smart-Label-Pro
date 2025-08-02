const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILLIO_APIKEY);

module.exports = async (to, message) => {
  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    console.log(`OTP sent to: ${to}`, msg);
  } catch (err) {
    console.error("Twilio SMS Error:", err);
  }
};