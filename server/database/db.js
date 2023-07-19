import mongoose from 'mongoose';
// bmPuu9Tpze2PzBzH
const Connection = async (username, password) => {
    const URL = `mongodb://0.0.0.0:27017`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

}; 

export default Connection;