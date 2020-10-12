const mongoose=require("mongoose");
const Schema = mongoose.Schema;
// contactSchema 
const contactSchema= new Schema({
    name:{
        type:String,
        required:[true,"enter your name please"]
    },
    email:{
        type:String,
        unique: true
    },
    age:Number,
    phone: String,
    favoriteFood :[String]
})
module.exports = Contact = mongoose.model("contact",contactSchema)