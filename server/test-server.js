// test-server.js - Minimal server to test basic functionality

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = 5001; // Different port to avoid conflicts

// Basic middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Minimal server is working!' });
});

// Test categories route (simplified)
app.get('/api/categories', (req, res) => {
    res.json({
        success: true,
        message: 'Categories route is working',
        data: []
    });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`✅ Minimal test server running on port ${PORT}`);
            console.log(`Test URL: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

startServer();