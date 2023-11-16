import nodemailer from 'nodemailer'
import * as dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_PASSWORD!,
    },
});

export default transporter