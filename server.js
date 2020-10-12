const express = require("express");
const connectDB =require("./config/connectDB");
const app = express();
// middleware
app.use(express.json())
//connect DB
connectDB()
//routes
app.use("/contacts", require("./routes/contact"))
// run server
const port = process.env.PORT||5000
app.listen(port, err=>
    err? console.log(err)
    :console.log(`the server is running on port ${port}`))