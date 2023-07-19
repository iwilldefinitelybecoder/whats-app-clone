import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
  subId: {
    type: String, 
    required: true, 
  },
  email:{
    type:String,
    required:true
  }
},
{timestamps: true}
);

const UserActivity = mongoose.model('Useractivity', userActivitySchema);

export default UserActivity;
