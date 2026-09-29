import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";


export const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword;

}

export const generateToken = (data) => {
    const token = sign({ ...data }, process.env.privateKey, {
        expiresIn: "24h"
    })
    return token
}

export const verifyPassword = async (password, hashPassword) => {
    const isValid = await compare(password, hashPassword)
    return isValid
}


export const verifyToken = async (token) => {
    try {
        const validationResult = verify(token, process.env.privateKey)
        return validationResult
    } catch (err) {
        console.log("verify Token Error ==>", err)
        return false
    }

}