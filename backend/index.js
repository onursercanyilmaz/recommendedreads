const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Book = require("./schemas/bookSchema")
const checkAuth = require("./utils/auth");
//TODO input vectorization


app.use(cors());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//DB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "books",
  })
  .then(() => {
    console.log("Connected to BOOKS DB");
  })
  .catch((err) => {
    console.log("ERROR:", err.message);
    throw new Error("Could not connect to MongoDB: " + err.message);
  });

//APIs
app.get("/book/recommendations", checkAuth, (req, res) => {
  try {
    res
      .status(200)
      .send({ message: "Response", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

app.post("/book", checkAuth,(req, res) => {
    try {
        //get user book description
        const userDescription = req.body.userDescription;

        //TODO use nlp model
       //TODO get similar books 
  

         // res.status(200).json({ result, success: true });
         
 
      } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
      }
  });


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
