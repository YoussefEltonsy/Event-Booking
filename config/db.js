import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;
