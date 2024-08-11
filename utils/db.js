import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'user'
        });
        console.log('DB Connected');
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
}
