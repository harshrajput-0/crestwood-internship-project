import mongoose from "mongoose";



export const connectDB = async () => {
    // Guard to check if connection already exist for vercel deployment
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        throw error;
    }
}

