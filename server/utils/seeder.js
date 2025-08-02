// seeder.js - Database seeder for development

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User, Post, Category } from '../models/index.js';

// Load environment variables
dotenv.config();

// Sample data
const users = [
    {
        name: 'Admin User',
        email: 'admin@blog.com',
        password: 'password123',
        role: 'admin',
        bio: 'I am the administrator of this blog.',
        isVerified: true
    },
    {
        name: 'John Doe',
        email: 'john@blog.com',
        password: 'password123',
        role: 'user',
        bio: 'I love writing about technology and programming.',
        isVerified: true
    },
    {
        name: 'Jane Smith',
        email: 'jane@blog.com',
        password: 'password123',
        role: 'user',
        bio: 'Passionate about web development and design.',
        isVerified: true
    }
];

const categories = [
    {
        name: 'Technology',
        description: 'Latest technology trends and news',
        color: '#3b82f6'
    },
    {
        name: 'Programming',
        description: 'Programming tutorials and tips',
        color: '#10b981'
    },
    {
        name: 'Design',
        description: 'Web and UI/UX design articles',
        color: '#f59e0b'
    },
    {
        name: 'Lifestyle',
        description: 'Lifestyle and productivity tips',
        color: '#8b5cf6'
    }
];

const posts = [
    {
        title: 'Getting Started with React 19',
        content: `React 19 brings exciting new features and improvements. In this comprehensive guide, we'll explore the new hooks, concurrent features, and performance optimizations that make React 19 a game-changer for modern web development.

React 19 introduces several new hooks including useActionState, useFormStatus, and useOptimistic. These hooks provide elegant solutions for everyday tasks like form handling and optimistic UI updates.

The new concurrent features allow for better user experience with non-blocking rendering and automatic batching of updates. Performance has been significantly improved with better memory management and faster reconciliation.

Whether you're building a simple website or a complex application, React 19 provides the tools you need to create amazing user experiences.`,
        excerpt: 'Discover the new features and improvements in React 19 that will revolutionize your development workflow.',
        tags: ['react', 'javascript', 'frontend', 'web-development'],
        isPublished: true
    },
    {
        title: 'Building a MERN Stack Application',
        content: `The MERN stack (MongoDB, Express.js, React.js, Node.js) is one of the most popular tech stacks for building modern web applications. This tutorial will guide you through creating a full-stack blog application.

We'll start by setting up the backend with Express.js and MongoDB, creating RESTful APIs, implementing authentication, and handling file uploads. Then we'll build a responsive React frontend with modern hooks and state management.

By the end of this tutorial, you'll have a complete understanding of how to integrate all four technologies and deploy your application to production.

Key topics covered include: database design, API development, authentication, frontend-backend integration, and deployment strategies.`,
        excerpt: 'Learn how to build a complete full-stack web application using MongoDB, Express.js, React.js, and Node.js.',
        tags: ['mern', 'fullstack', 'mongodb', 'express', 'react', 'nodejs'],
        isPublished: true
    },
    {
        title: 'Modern CSS Grid Layouts',
        content: `CSS Grid has revolutionized how we create layouts on the web. This comprehensive guide covers everything you need to know about CSS Grid, from basic concepts to advanced techniques.

We'll explore grid containers, grid items, explicit and implicit grids, grid lines, and grid areas. Learn how to create responsive layouts without media queries using auto-fit and auto-fill.

Discover practical examples including card layouts, magazine-style designs, and complex application interfaces. We'll also cover browser support and fallback strategies for older browsers.

CSS Grid makes it possible to create layouts that were previously impossible or required complex workarounds. Master this powerful tool and take your CSS skills to the next level.`,
        excerpt: 'Master CSS Grid and create stunning, responsive layouts with this comprehensive guide.',
        tags: ['css', 'grid', 'layout', 'responsive', 'frontend'],
        isPublished: true
    }
];

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

// Hash passwords
const hashPasswords = async (users) => {
    const salt = await bcrypt.genSalt(12);
    return Promise.all(users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, salt)
    })));
};

// Seed data
const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Post.deleteMany({});
        console.log('Cleared existing data');

        // Hash passwords for users
        const hashedUsers = await hashPasswords(users);

        // Create users
        const createdUsers = await User.insertMany(hashedUsers);
        console.log('Users created');

        // Create categories
        const createdCategories = await Category.insertMany(categories);
        console.log('Categories created');

        // Assign random authors and categories to posts
        const postsWithRefs = posts.map((post, index) => ({
            ...post,
            author: createdUsers[index % createdUsers.length]._id,
            category: createdCategories[index % createdCategories.length]._id
        }));

        // Create posts
        await Post.insertMany(postsWithRefs);
        console.log('Posts created');

        console.log('✅ Database seeded successfully!');

        // Update category post counts
        for (const category of createdCategories) {
            await category.updatePostCount();
        }
        console.log('Category post counts updated');

    } catch (error) {
        console.error('Seeding failed:', error);
    }
};

// Destroy data
const destroyData = async () => {
    try {
        await User.deleteMany({});
        await Category.deleteMany({});
        await Post.deleteMany({});
        console.log('✅ Data destroyed successfully!');
    } catch (error) {
        console.error('Data destruction failed:', error);
    }
};

// Check command line arguments
if (process.argv[2] === '-d') {
    connectDB().then(() => {
        destroyData().then(() => process.exit());
    });
} else {
    connectDB().then(() => {
        seedData().then(() => process.exit());
    });
}