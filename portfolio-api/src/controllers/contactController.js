import sgMail from "@sendgrid/mail";
import { ENV } from "../config/env.js";

sgMail.setApiKey(ENV.SENDGRID_EMAIL_API);

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const msg = {
      to: "jesselouiselat@gmail.com",
      from: "jesselouiselat@gmail.com",
      subject: "Email From Portfolio (via SendGrid)",
      text: message,
      html: `<strong>Name: </strong><p>${name}</p><br>
             <strong>Email: </strong><p>${email}</p><br>
             <strong>Message: </strong><p>${message}</p>`,
    };

    await sgMail.send(msg);
    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Message could not be sent. Please try again later.",
    });
  }
};
