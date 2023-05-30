import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://kmaheen1129:pakpak010@cluster0.uustncm.mongodb.net/TechMart");
        console.log(`Connected to MongoDB database ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
};
export default connectDB;