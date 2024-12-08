import {SMTPClient} from "emailjs";

export const sendMail = async (clientEmail, subject, text) =>{
    const client = new SMTPClient({
        user: 'testhenallux355@gmail.com',
        password: process.env.EMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });
    if (clientEmail) {
        try {
            const message = await client.sendAsync({
                text: text,
                from: 'testhenallux355@gmail.com',
                to: clientEmail,
                subject: subject,
            });
        } catch (err) {
            throw new Error(`Error while sending email: ${err.message}`);
        }
    }
    else{
        throw new Error("No email given");
    }
}