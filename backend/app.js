const express = require('express')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')


const app = express();

app.use(express.json())
app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("welcome to expense tracker backed");
});

mongoose.connect("mongodb://127.0.0.1:27017/expenseTracker").then((res) => {
  console.log("Database Connected");
  app.listen(7070);
});
