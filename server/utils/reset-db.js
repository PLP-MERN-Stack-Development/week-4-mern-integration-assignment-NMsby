// reset-db.js - Reset database and indexes

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const resetDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Drop the entire database to clear all indexes and data
        await mongoose.connection.db.dropDatabase();
        console.log('✅ Database dropped successfully');

        console.log('Database reset complete. Ready for fresh seeding.');
        process.exit(0);
    } catch (error) {
        console.error('Database reset failed:', error);
        process.exit(1);
    }
};

resetDatabase();