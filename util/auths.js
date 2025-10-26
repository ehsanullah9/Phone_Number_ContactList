import { verify } from "jsonwebtoken"
import { ReturnDocument } from "mongodb"

export default function ValidatToken(context){
    const{token}=context.req.cookies
    if(!token)return false

    try {
        const tokenPayload = verify(token , process.env.SECRET_KEY)
        return tokenPayload
    } catch (error) {
        return false
    }
}