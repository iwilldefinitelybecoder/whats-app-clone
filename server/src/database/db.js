import mongoose from 'mongoose';
// bmPuu9Tpze2PzBzH
const Connection = async (username, password) => {
    const URL = `mongodb+srv://tonystarkv9:bmPuu9Tpze2PzBzH@cluster0.w83fizs.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

}; 

export default Connection;