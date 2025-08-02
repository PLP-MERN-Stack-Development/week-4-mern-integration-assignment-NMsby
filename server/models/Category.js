// Category.js - Mongoose model for categories (ES module syntax)

import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
            unique: true,
            trim: true,
            maxlength: [50, 'Category name cannot be more than 50 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            maxlength: [200, 'Description cannot be more than 200 characters'],
        },
        color: {
            type: String,
            default: '#3b82f6', // Default blue color
            match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        postCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for category's posts
CategorySchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        return next();
    }

    this.slug = this.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    next();
});

// Virtual for category URL
CategorySchema.virtual('url').get(function () {
    return `/categories/${this.slug}`;
});

// Static method to get categories with post counts
CategorySchema.statics.getWithPostCounts = async function () {
    return this.aggregate([
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'category',
                as: 'posts'
            }
        },
        {
            $addFields: {
                postCount: { $size: '$posts' }
            }
        },
        {
            $project: {
                posts: 0 // Remove the posts array from output
            }
        },
        {
            $sort: { name: 1 }
        }
    ]);
};

// Update post count when posts change
CategorySchema.methods.updatePostCount = async function () {
    const Post = mongoose.model('Post');
    const count = await Post.countDocuments({ category: this._id, isPublished: true });
    this.postCount = count;
    return this.save();
};

const Category = mongoose.model('Category', CategorySchema);

export default Category;