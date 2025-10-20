const { Schema, models, model } = require("mongoose");


const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
     role:{
        type:String,
        enum:['male' , 'female'],
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user' , 'admin'],
        default:'user'
    }
})


const User = models.User || model('User' , userSchema)
module.exports = User;