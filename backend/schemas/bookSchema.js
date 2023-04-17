const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    books: [
        bookId: {
            type: String,
            required: true,
          }, // soru ID'si
          bookName: {
            type: String,
            required: true,
          }, 
          author: {
            type: String,
            required: true,
          }, 
          bookCover: {
            type: String,
            required: true,
          }, 
          similarity: {
            type: String,
            required: true,
          }, 


    ],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
