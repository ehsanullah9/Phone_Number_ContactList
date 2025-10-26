import { verify } from "jsonwebtoken"

export default async function handler(req,res) {
    
    const{token} = req.cookies
    if(req.method != "GET")return res.status(405).json({message:"the mehtod not allowed"})
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    try {
        verify(token , process.env.SECRET_KEY)
        return res.status(200).json({message:"authonticated"})
    } catch (error) {
        return res.status(401).json({message:"unauthorized"})
    }
}