const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const authRoutes = require('./routes/auth')
const expenseRoutes = require('./routes/expense')


const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.get("/", (req, res) => {
  res.send("welcome to expense tracker backed");
});

mongoose.connect("mongodb://127.0.0.1:27017/expenseTracker").then((res) => {
  console.log("Database Connected");
  app.listen(7070);
});
