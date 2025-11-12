import ContactM from "@/models/contact";
import DBconnection from "@/util/connectDB";

export default async function handler(req, res) {
  DBconnection();
  const { gen, search } = req.query;
  if (req.method === "GET") {
    let Contact = null;
     if (gen && search) {
      if (gen == "male" || gen == "female") {
        Contact = await ContactM.find({
          $and: [
            { gender: gen },
            {
              $or: [
                { firstname: { $regex: search } },
                { lastname: { $regex: search } },
              ],
            },
          ],
        });
      }
    } 

   else if (gen) {
      if (gen == "male") {
        Contact = await ContactM.find({ gender: gen });
      } else if (gen == "female") {
        Contact = await ContactM.find({ gender: gen });
      } else {
        Contact = await ContactM.find({});
      }
    }

    //the search qs
    else if (search) {
      Contact = await ContactM.find({
        $or: [
          { firstname: { $regex: search } },
          { lastname: { $regex: search } },
        ],
      });
    }
    else {
      Contact = await ContactM.find({},'-__v').populate('userId' , '-password -role -__v');
    }
    res.status(200).json(Contact);
  }
  if(req.method =="POST"){
    try {
      await ContactM.create(req.body)
    res.status(201).json({message:"مخاطب جدید موافقانه اضافه شد"})
    } catch (error) {
      res.status(422).json({message:"معلومات ارابه شد قابل پردازش نیست"})
    }
  }
}
