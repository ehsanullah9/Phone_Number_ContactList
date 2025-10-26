import User from "@/models/User";
import DBconnection from "@/util/connectDB";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";
export default async function handler(req, res) {
  DBconnection()
  const {email, password} = req.body;

  //check method
  if (req.method != "POST")
    return res.status(403).json({ message: "the method not allow" });

  //validate the form data
  if (!email.trim() || !password.trim())
    return res.status(422).json({ message: "please fill all fileds" });

  //Validate the email with RegEx 
  const EmailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!EmailValidation.test(email))return res.status(422).json({message:"ایمل آدرس قابل پردازش نیست"})

  //check the duplication
  const user = await User.findOne({ email });
  if (!user)
    return res.status(409).json({ message: "آیمل یا پسورد درست نیست" });

  //check the password length
  if (password.length < 8 || password.length > 16){
    return res
      .status(422)
      .json({ message: "the passowrd must be between 8 and 16 char" });
    }

      //hash the pasword
    const IsvalidPass = await bcrypt.compare(password , user.password)
    if(!IsvalidPass)return res.status(401).json({message: "ایمل یا پسورد درست نیست"})

    //generate the token
    const token = jwt.sign({email:user.email , role:user.role} , process.env.SECRET_KEY , {expiresIn:"2h"})


   //set cookie
   res.setHeader("set-cookie" , serialize('token' , token , {
    httpOnly:true,
    path:"/",
    sameSite:"strict",
    maxAge:60*60*2
   }) )

      res.status(200).json({message:"ورد به سابت موافقغیت امیز بود"})
}

