import nodemailer from "nodemailer";
import { env } from "../env";

var transport = nodemailer.createTransport({
	host: env.STMP_MAILTRAP,
	port: env.PORT_STMP,
	auth: {
		user: env.MAILTRAP_USER,
		pass: env.MAILTRAP_PASSWORD,
	},
});

const sender = {
	address: "register@diviti-news.com",
	name: "DIVITI NEWS",
};

export const sendMail = async (recipients: string, url: string) => {
	const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #FFF0F0; color: #333;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF0F0; padding: 20px;">
            <tr>
              <td>
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #FFFFFF; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #FF0000; text-align: center;">Welcome to DIVITI News!</h1>
                  <p style="font-size: 16px; line-height: 1.6; color: #555555;">Dear Viewer,</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    Thank you for joining DIVITI News, your trusted source for the latest updates and stories. To complete your registration and verify your email, please click the link below:
                  </p>
                  <div style="text-align: center; margin-top: 20px;">
                    <a href="${url}" style="font-size: 18px; padding: 12px 25px; color: #FFFFFF; background-color: #FF0000; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Your Email</a>
                  </div>
                  <p style="font-size: 14px; line-height: 1.6; color: #555555; margin-top: 20px;">
                    If you did not sign up for DIVITI News, please disregard this email.
                  </p>
                  <p style="font-size: 14px; line-height: 1.6; color: #555555;">Best regards,<br/>The DIVITI News Team</p>
                  <hr style="border: 0; height: 1px; background-color: #FF0000; margin: 20px 0;">
                  <p style="font-size: 12px; line-height: 1.6; color: #888888; text-align: center;">
                    You're receiving this email because you signed up for DIVITI News. If you have any questions, contact us at support@diviti-news.com.
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

	try {
		const info = await transport.sendMail({
			from: sender,
			to: recipients,
			subject: "Welcome to DIVITI News! Verify Your Email.",
			text: `Click on the link to verify your email: ${url}`,
			html: emailContent,
		});
		console.log("Email sent successfully:", info);
		return info;
	} catch (error) {
		console.error("Error sending email:", error);
	}
};
export const sendPasswordResetMail = async (email: string, password: string): Promise<void> => {
	const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #fff0f0; color: #333;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff0f0; padding: 20px;">
            <tr>
              <td>
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #d32f2f; text-align: center;">Password Reset Successful</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #555555;">Hi there,</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    Your password has been reset successfully. Please find your new password below:
                  </p>
                  <div style="text-align: center; margin: 20px 0; font-size: 20px; font-weight: bold; color: #333;">
                    ${password}
                  </div>
                  <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    For security purposes, we recommend changing this password as soon as possible after logging in.
                  </p>
                  <p style="font-size: 14px; line-height: 1.6; color: #555555;">If you did not request this password reset, please contact us immediately.</p>
                  <p style="font-size: 14px; line-height: 1.6; color: #555555;">Thank you,<br/>The DIVITI News Team</p>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

	try {
		const info = await transport.sendMail({
			from: sender,
			to: email,
			subject: "Password Reset Successful",
			text: `Your new password is: ${password}. Please change it after logging in.`,
			html: emailContent,
		});
		console.log("Password reset email sent successfully:", info);
	} catch (error) {
		console.error("Error sending password reset email:", error);
		throw new Error("Failed to send password reset email");
	}
};
