import * as argon2id from "argon2";

export const hash = (password) =>{
    return argon2id.hash(password, {secret : Buffer.from(process.env.PEPPER)});
}

export const hash_verify = (hashedPassword, password) =>{
    return argon2id.verify(hashedPassword, password, {secret : Buffer.from(process.env.PEPPER)});
}