const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ChatsSchema = new Schema({
 messages: [{
    message: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
 }],
 chatType:{type:String , required:true},
 participants:[
   {
       type:String
   }
 ]
});

const Chats = mongoose.model("chats", ChatsSchema);

module.exports = Chats;