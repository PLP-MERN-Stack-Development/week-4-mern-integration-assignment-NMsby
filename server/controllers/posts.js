// posts.js - Posts controllers

import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import Category from '../models/Category.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Filter options
    const filter = { isPublished: true };

    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.author) {
        filter.author = req.query.author;
    }

    // Search functionality
    if (req.query.search) {
        filter.$or = [
            { title: { $regex: req.query.search, $options: 'i' } },
            { content: { $regex: req.query.search, $options: 'i' } },
            { tags: { $in: [new RegExp(req.query.search, 'i')] } }
        ];
    }

    // Sort options
    let sort = '-createdAt'; // Default: newest first
    if (req.query.sort) {
        sort = req.query.sort;
    }

    // Execute query
    const posts = await Post.find(filter)
        .populate('author', 'name email avatar')
        .populate('category', 'name slug color')
        .sort(sort)
        .limit(limit)
        .skip(startIndex);

    // Get total count for pagination
    const total = await Post.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Pagination info
    const pagination = {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
    };

    res.json({
        success: true,
        count: posts.length,
        pagination,
        data: posts
    });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'name email avatar bio')
        .populate('category', 'name slug color description')
        .populate('comments.user', 'name avatar');

    if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found'
        });
    }

    // Increment view count
    await post.incrementViewCount();

    res.json({
        success: true,
        data: post
    });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
    // Add user to req.body
    req.body.author = req.user.id;

    // Verify category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).json({
            success: false,
            error: 'Category not found'
        });
    }

    const post = await Post.create(req.body);

    // Populate the created post
    await post.populate('author', 'name email avatar');
    await post.populate('category', 'name slug color');

    // Update category post count
    await category.updatePostCount();

    res.status(201).json({
        success: true,
        data: post
    });
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
    let post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found'
        });
    }

    // Make sure user is post owner or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Not authorized to update this post'
        });
    }

    // If category is being changed, verify it exists
    if (req.body.category && req.body.category !== post.category.toString()) {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).json({
                success: false,
                error: 'Category not found'
            });
        }
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate('author', 'name email avatar')
        .populate('category', 'name slug color');

    res.json({
        success: true,
        data: post
    });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found'
        });
    }

    // Make sure user is post owner or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Not authorized to delete this post'
        });
    }

    await Post.findByIdAndDelete(req.params.id);

    // Update category post count
    const category = await Category.findById(post.category);
    if (category) {
        await category.updatePostCount();
    }

    res.json({
        success: true,
        data: {},
        message: 'Post deleted successfully'
    });
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Post not found'
        });
    }

    const comment = {
        user: req.user.id,
        content: req.body.content
    };

    post.comments.push(comment);
    await post.save();

    // Populate the new comment
    await post.populate('comments.user', 'name avatar');

    res.status(201).json({
        success: true,
        data: post.comments[post.comments.length - 1]
    });
});