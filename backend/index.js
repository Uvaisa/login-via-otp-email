const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./Routes/routes");
const port = process.env.PORT;
//middleware
app.use(express.json());
app.use(cors());
const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb database connect");
  } catch (error) {
    console.log("mongodb databse connection failed ");
  }
};

app.listen(port, () => {
  Connect();
  console.log("server is listing at port " + port);
});
app.use(router);
