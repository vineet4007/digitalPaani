let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Book = new Schema(
    {
        title: { type: String ,unique:true},
        author: { type: String },
        year: { type: Number },
    },
    { timestamps: true, }
);
module.exports = mongoose.model("book", Book, "book");