import User from "@/models/User";
import DBconnection from "@/util/connectDB";
import bcrypt from 'bcrypt'
export default async function handler(req, res) {
  DBconnection()
  const { firstname, lastname, email, password , role,gender } = req.body;

  //check method
  if (req.method != "POST")
    return res.status(403).json({ message: "the method not allow" });

  //validate the form data
  if (!firstname.trim() || !lastname.trim() || !email.trim() || !gender.trim() || !password.trim())
    return res.status(422).json({ message: "please fill all fileds" });

  //Validate the email with RegEx 
  const EmailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!EmailValidation.test(email))return res.status(422).json({message:"ایمل ادرس قابل پردازش نیست"})

  //check the duplication
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.status(409).json({ message: "the email already exist" });

  //check the password length
  if (password.length < 8 || password.length > 16){
    return res
      .status(422)
      .json({ message: "the passowrd must be between 8 and 16 char" });}

      //hash the pasword
    const hashedPassword = await bcrypt.hash(password , 10)

    //Set the role of user
    const countUser = await User.countDocuments()
    await User.create({...req.body , password:hashedPassword ,role:countUser>0?"user" :"admin"})
    res.status(201).json({message:"ثبت نام موافقانه بود"})
}
