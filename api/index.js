import express from "express";
const app = express();

app.get("/",(req,res)=>{
    res.send("working")
})

app.listen(3000, (err) => {
    if(err) throw err;
    console.log("The server is running on port 3000")
})
