import * as argon2id from "argon2";
import 'dotenv/config.js';
import jsonwebtoken from 'jsonwebtoken';
import * as fs from 'fs-extra'

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

