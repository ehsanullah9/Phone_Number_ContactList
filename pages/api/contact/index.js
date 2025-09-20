import ContactM from "@/models/contact";
import DBconnection from "@/util/connectDB";

export default async function handler(req, res) {
  await DBconnection();
  const { gen, search } = req.query;
  // check the method
  if (req.method == "GET") {
    let Con = null;
    // check if the gen is exist
    if (gen && search) {
      if (gen == "male" || gen == "female") {
        Con = await ContactM.find({
          $and: [
            { gender: gen },
            { $or: [{ firstname: search }, { lastname: search }] },
          ],
        });
      }
    }

    //check if the gen exist find by gender
    else if (gen) {
      if (gen == "male" || gen == "female") {
        Con = await ContactM.find({ gender: gen });
      }
    }

    //check if the search key exist
    else if (search) {
      Con = await ContactM.find({
        $or: [{ firstname: search }, { lastname: search }],
      });
    } else {
      Con = await ContactM.find();
    }
    res.json({ Con });
  } else if (req.method == "POST") {
    try {
     
        const contact = await ContactM.create(req.body);
        res.status(201).json("the new contact added to db");
     
    
    } catch (error) {
      res.status(422).json({message:error.message});
    }
  }
}
