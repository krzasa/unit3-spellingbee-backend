const  mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    
    
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;