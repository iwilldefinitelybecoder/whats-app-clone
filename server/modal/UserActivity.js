import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
  subId: {
    type: String, 
    required: true, 
  },
  email:{
    type:String,
    required:true
  },
  conversationId:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
},

);

const UserActivity = mongoose.model('Useractivity', userActivitySchema);

export default UserActivity;
