import * as argon2id from "argon2";

export const hash = async (password, secret) =>{
    return await argon2id.hash(password, {secret : secret});
}

export const verify = async (hashedPassword,password, secret) =>{
    return await argon2id.verify(hashedPassword, password, {secret : secret});
}