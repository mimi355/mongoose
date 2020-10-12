const mongoose =require("mongoose");
const URI="mongodb+srv://omari:1234@cluster0.3kkr9.mongodb.net/test?retryWrites=true&w=majority"
// connect to the DB 
const connectDB=()=>{
 mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
 .then(()=>console.log("DB connected"))
.catch("error DB")


};
    module.exports = connectDB