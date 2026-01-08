
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.ME_CONFIG_MONGODB_URL || 'mongodb://localhost:27017/mydatabase';

const connectDB = async () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};

export default connectDB;
