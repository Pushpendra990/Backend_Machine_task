

import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config()

const MongoUrl=process.env.MONGO_URL


const connectToDatabase = async () => {
        try {
            await mongoose.connect(MongoUrl, {
                connectTimeoutMS: 50000,
                socketTimeoutMS: 50000,
            });
            console.log('Connected to MongoDB'); // Return success message
        } catch (error) {
            console.error('Error connecting to MongoDB');
            // Retry after 5 seconds if connection fails
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectToDatabase(); // Retry connection
        }
    }
// Exported function to connect to DB
export async function DbConnect() {
    try {
        const connectionMessage = await connectToDatabase();
        return connectionMessage; // Return success or retry message
    } catch (error) {
        console.error('Failed to connect to MongoDB');
    }
}