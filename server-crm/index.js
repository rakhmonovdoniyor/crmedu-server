 



const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const authRouter = require("./routes/user-route");
 
 

dotenv.config();
const app = express();
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/CRM";

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);


 
 
const PORT = process.env.PORT || 5050;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log("server running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
  });
