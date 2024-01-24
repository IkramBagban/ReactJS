import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to expense tracker backed");
});

mongoose.connect("mongodb://127.0.0.1:27017/expenseTracker").then((res) => {
  console.log("Database Connected");
  app.listen(7070);
});
