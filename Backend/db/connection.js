const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Keynotes")
.then(()=>{
    console.log("Connection established");
})
.catch((err)=>{
    console.log(`Error is : ${err}`)
})

