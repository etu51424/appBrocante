import * as argon2id from "argon2";
import 'dotenv/config.js';
import jsonwebtoken from 'jsonwebtoken';
import * as fs from 'fs-extra'
import {SMTPClient} from "emailjs";

export const hash =  (password) =>{
    return argon2id.hash(password, {secret : Buffer.from(process.env.PEPPER)});
}

export const hash_verify = (hashedPassword, password) =>{
    return argon2id.verify(hashedPassword, password, {secret : Buffer.from(process.env.PEPPER)});
}

export const sign = (payload, options) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
}

export const jwt_verify = (jwt, options={}) =>{
    return jsonwebtoken.verify(jwt, process.env.JWT_SECRET, options);
}

export const deleteFile = async (filePath) =>{
    return await fs.remove(filePath);
}

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


