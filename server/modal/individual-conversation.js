import mongoose from "mongoose";

const individualConversationSchema =  new mongoose.Schema({

    userId:{
        required:true,
        type:String
    },
    members:{
        type:Array
    }
})

const individualConversation = mongoose.model('individualConversation',individualConversationSchema)

export default individualConversation