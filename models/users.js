const  mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    word:String,
    difficulty:Number,
    
    
})

const User = mongoose.model("User", userSchema);

module.exports = Word;