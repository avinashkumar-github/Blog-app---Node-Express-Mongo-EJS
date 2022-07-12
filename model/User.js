const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username should be unique']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email should be unque']
    },
    password : {
        type: String,
        required:[true, 'Password is required']
    }},
    {
    timestamps: true
});

UserSchema.pre("save", function (next){
    const user = this;
    try{
        bcrypt.hash(user.password, 10, function(error, encrypted){
            user.password = encrypted;
            next();
        });
        
    }catch(e){
        throw new Error(e.message)
    }    
   
});

const User = mongoose.model("User", UserSchema);

module.exports = User;