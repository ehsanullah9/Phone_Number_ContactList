import ContactM from "@/models/contact";
import { isValidObjectId } from "mongoose";
import { isValidElement } from "react";


export default async function handler(req,res) {
    
    const {user_id} = req.query;

    // validate the id by isvalidateobjectid method
    if(isValidObjectId(user_id)){

    // find single user by id
    if(req.method == "GET"){
            const contact = await ContactM.findById(user_id)
            res.status(200).json(contact)
        }

        // the delete method delete the contact by id
    else if(req.method == 'DELETE'){
        const deleteCon = await ContactM.findByIdAndDelete(user_id)

        // check the contact is in db or not
        if(deleteCon){
            res.status(200).json({message:"the user delete successfully"})
        }
        else{
            res.status(422).json({message:"user not found"})
        }
    }
    else if(req.method == 'PUT'){
        await ContactM.findByIdAndUpdate(user_id  , req.body)
        res.json({message:"the user updated succssfully"})
    }

    }
    else{
        res.json({message:"the object id is not valide id"})
    }
}