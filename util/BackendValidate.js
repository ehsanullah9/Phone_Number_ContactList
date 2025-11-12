
import { verify } from "jsonwebtoken"

export default function BackendValidatToken(req){
    const{token}=req.cookies
    if(!token)return false

    try {
        const tokenPayload = verify(token , process.env.SECRET_KEY)
        return tokenPayload
    } catch (error) {
        return false
    }
}