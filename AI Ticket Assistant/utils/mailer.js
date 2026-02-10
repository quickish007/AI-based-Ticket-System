import nodemailer from 'nodemailer';

export const sendMail = async ( to, subject, text) => {
    try{
        // Transporter configuration
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMPT_HOST,
            port: process.env.MAILTRAP_SMPT_PORT,
            secure: false, // Use true for port 465, false for port 587
            auth: {
            user: process.env.MAILTRAP_SMPT_USER,
            pass: process.env.MAILTRAP_SMPT_PASS,
            },
        });

        //Send an email using async
        const info = await transporter.sendMail({
          from: '"Inggest TMS',
          to,
          subject,
          text, 
        });

        console.log("Message sent:", info.messageId);
        return info   
    } 
    catch (error) {
        console.error("❌Error sending email:", error);
        throw error}
};