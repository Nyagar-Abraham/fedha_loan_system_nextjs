// import { Resend } from "resend";

// const resend = new Resend(process.env.EMAIL_APIKEY);

// export function sendMail(email: string) {
//   resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Succeful registration",
//     html: "<p>You are now a registered member of fedha youth group <strong>congratulations</strong></p>",
//   });
// }

"use server";

import nodemailer from "nodemailer";
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }

  const info = await transporter.sendMail({
    from: email,
    to: sendTo || SITE_MAIL_RECIEVER,
    subject,
    text,
    html,
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", SITE_MAIL_RECIEVER);
  return info;
}
