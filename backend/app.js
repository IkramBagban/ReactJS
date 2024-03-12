const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
require('dotenv').config()

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

mongoose.connect(`${process.env.MONGO_URI}`).then((res) => {
  console.log("Database Connected");
  app.listen(process.env.PORT || 7070);
});
