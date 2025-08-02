// Post.js - Mongoose model for blog posts 

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        content: {
            type: String,
            required: [true, 'Please provide content'],
        },
        featuredImage: {
            type: String,
            default: 'default-post.jpg',
        },
        slug: {
            type: String,
            unique: true,
            // Will be generated automatically, not required on input
        },
        excerpt: {
            type: String,
            maxlength: [200, 'Excerpt cannot be more than 200 characters'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        tags: [String],
        isPublished: {
            type: Boolean,
            default: false,
        },
        viewCount: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                content: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Helper function to generate slug from title
const generateSlug = (title) => {
    if (!title) return '';

    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Pre-save middleware to generate slug
PostSchema.pre('save', async function (next) {
    // Only generate slug if title exists and has changed
    if (this.isModified('title') || this.isNew) {
        let baseSlug = generateSlug(this.title);
        let slug = baseSlug;
        let counter = 1;

        // Ensure slug is unique
        while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        this.slug = slug;
    }

    next();
});

// Virtual for post URL
PostSchema.virtual('url').get(function () {
    return `/posts/${this.slug}`;
});

// Method to add a comment
PostSchema.methods.addComment = function (userId, content) {
    this.comments.push({ user: userId, content });
    return this.save();
};

// Method to increment view count
PostSchema.methods.incrementViewCount = function () {
    this.viewCount += 1;
    return this.save();
};

const Post = mongoose.model('Post', PostSchema);

export default Post;