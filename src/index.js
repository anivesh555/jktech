const express = require("express")
const cors = require("cors");
require("./utilities/db");
const router = require("./routes/index")

app = express()
let corsOptions = {
    origin : "*"
};
// console.log(process.env.MONGO_URL)
app.use(cors(corsOptions));

app.use(express.json())

app.use("/api",router)

app.get("/",(req, res)=>{
    console.log("basic route ")

    res.status(200).json({message:"welcome to the code for jktech"})
})

app.listen(process.env.PORT || 4000,()=>{
    console.log("app is runing on port 4000")
})