const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Book = require("./schemas/bookSchema")
const checkAuth = require("./utils/auth");
const fastText = require('fasttext');
const natural = require('natural');


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

// Load the pre-trained fasttext model
const modelFile = '/model//model.bin';
let model;
fastText.loadModel(modelFile).then(loadedModel => {
  model = loadedModel;
}).catch(error => {
  console.error(error);
});

// Define the API endpoint
app.get('/api/vectorize', (req, res) => {
  try{
    const inputString = req.query.string;

    // Remove numbers and punctuation marks
    const alphanumericOnly = inputString.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
  
    // Apply stemming and lemmatization to the input string
    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;
    const tokenizerAndStemmer = new natural.AggressiveTokenizerStemmer({
      tokenizer: tokenizer,
      stemmer: stemmer
    });
    const lemmatizer = new natural.Lemmatizer();
    const tokens = tokenizerAndStemmer.tokenize(alphanumericOnly).map(word => lemmatizer.lemmatize(word));
  
    // Minimize repeated words by counting their occurrences
    const wordCounts = tokens.reduce((counts, word) => {
      counts[word] = (counts[word] || 0) + 1;
      return counts;
    }, {});
    const words = Object.keys(wordCounts);
    const counts = words.map(word => wordCounts[word]);
  
    // Get the vector representation of each word using the fasttext model
    const vectors = words.map(word => model.getWordVector(word));
  
    res
    .status(200)
    .send({
      input: inputString,
      tokens: words,
      counts: counts,
      vectors: vectors
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
  
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
