import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP Verify Error:", err);
  } else {
    console.log("SMTP Server Ready");
  }
});
export const sendMail = async (to, subject, html) => {
  try {

    console.log("Entered");
    console.log("email :",process.env.MAIL_USER,process.env.MAIL_PASS);

    console.log("Office :",to,subject,html);
    
    const info = await transporter.sendMail({
      from: `<${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Mail sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail error: ", error);
    throw error;
  }
};
