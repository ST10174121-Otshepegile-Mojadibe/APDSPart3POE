import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const MONGO_URI = process.env.MONGO_URI;
const ATLAS_URI = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        // Attempt to connect to the primary local MongoDB URI
        await mongoose.connect(MONGO_URI, {
        });
        console.log(`Connected to ${MONGO_URI}`);
    } catch (err) {
        console.error(`Failed to connect to ${MONGO_URI}: ${err.message}`);
        console.log(`Trying to connect to ${ATLAS_URI}`);

        try {
            // Attempt to connect to the Atlas URI with SSL enabled
            await mongoose.connect(ATLAS_URI, {
                
                ssl: true, // SSL is typically required for MongoDB Atlas
                tls: true, // Explicitly use TLS for the connection
                tlsAllowInvalidCertificates: true, // Option to bypass invalid certificate errors (for debugging)
            });
            console.log(`Connected to ${ATLAS_URI}`);
        } catch (err) {
            console.error(`Failed to connect to MongoDB: ${err.message}`);
            process.exit(1); // Exit the process if both connections fail
        }
    }
};

export default connectDB;
