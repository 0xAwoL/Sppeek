import { readFileSync } from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import transporter from './pool.js';
import * as dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (email:string, link:string, username:string, templateName:string) => {
    try {
      const templatePath = path.join(__dirname, "mailTemplates", `${templateName}.html`);
      const emailTemplate = readFileSync(templatePath, "utf8");
  
      // Replace placeholders in the email template
      const replacedTemplate = emailTemplate
        .replace(/coolusername1337/g, username)
        .replace(/link1337/g, link);

      const mailOptions = {
        from: 'noreply@sppeek.org',
        to: email,
        subject: templateName === "verify" ? 'Please verify email address.' : 'Change user password.',
        html: replacedTemplate,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(result.messageId);
    } catch (error) {
      console.error(error);
    }
  };
  
  const sendForgotEmail = async (email:string, link:string, username:string) => {
    await sendEmail(email, link, username, "changePassword");
  };
  
  const sendRegisterEmail = async (email:string, link:string, username:string) => {
    await sendEmail(email, link, username, "verify");
  };
  
  export { sendForgotEmail, sendRegisterEmail };
  