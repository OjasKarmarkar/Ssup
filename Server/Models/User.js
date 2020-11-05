const mongoose = require('mongoose')
const Schema = mongoose.Schema;

userSchema = new Schema({
    name : {type:String , required:true} ,
    email : {type:String , required:true , unique:true} ,
    password : {type:String , required:true},
    createdAt : {type:Date , required:true},
    about:{type:String}
})

const User = mongoose.model('user' , userSchema)

module.exports = User;