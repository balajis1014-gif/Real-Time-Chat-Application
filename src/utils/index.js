const { BrevoClient } = require("@getbrevo/brevo");
const { CONFIG } = require("../config");

const getOtpEmailTemplate = (otp) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat App OTP</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:24px 28px;background-color:#111827;color:#ffffff;">
                <h1 style="margin:0;font-size:22px;line-height:1.3;">Chat App</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h2 style="margin:0 0 12px;font-size:20px;line-height:1.4;color:#111827;">Your login OTP</h2>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4b5563;">
                  Use the OTP below to complete your Chat App login.
                </p>
                <div style="margin:24px 0;padding:18px 20px;background-color:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;text-align:center;">
                  <span style="display:inline-block;font-size:32px;line-height:1;letter-spacing:6px;font-weight:700;color:#312e81;">
                    ${otp}
                  </span>
                </div>
                <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#4b5563;">
                  This OTP is valid for a short time. Do not share it with anyone.
                </p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">
                  If you did not request this code, you can safely ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const sendOtpMail = async (email, otp) => {
  try {
    const brevo = new BrevoClient({
      apiKey: CONFIG.MAIL.API_KEY,
    });

    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: "OTP for chat app login",
      textContent: getOtpEmailTemplate(otp),
      sender: { name: "Sender", email: CONFIG.MAIL.SEND_MAILER },
      to: [{ email }],
    });

    return result;
  } catch (error) {
    console.log('error: ', error);
    throw Error("Error while sending otp email", error);
  }
};

module.exports = { sendOtpMail };
