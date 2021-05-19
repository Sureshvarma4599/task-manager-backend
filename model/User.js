const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String,
    }
   
})

const User = mongoose.model('User',UserSchema)

module.exports=User