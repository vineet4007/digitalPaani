let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = new Schema(
    {
        username: { type: String ,unique:true},
        password: { type: String, },
    },
    { timestamps: true, }
);
module.exports = mongoose.model("user", User, "user");