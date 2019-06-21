const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
    {
        name: {type:String,reqired:true},
        email: {type:String,reqired:true},
        password: {type:String,reqired:false}, 
        date:{type:Date,default:Date.now}         
    }
) 
 
module.exports = mongoose.model('users', UserSchema)