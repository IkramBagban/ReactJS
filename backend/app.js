import express  from "express";

const app = express();


app.get('/',(req,res)=>{
    res.send("welcome to expense tracker backed")
})

app.listen(7070)