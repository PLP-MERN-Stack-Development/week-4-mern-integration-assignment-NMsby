// categories.js - Categories controllers

import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Post from '../models/Post.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    // Check if we need categories with post counts
    const withCounts = req.query.withCounts === 'true';

    let categories;

    if (withCounts) {
        categories = await Category.getWithPostCounts();
    } else {
        categories = await Category.find({ isActive: true }).sort({ name: 1 });
    }

    res.json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found'
        });
    }

    // Get posts in this category
    const posts = await Post.find({
        category: category._id,
        isPublished: true
    })
        .populate('author', 'name avatar')
        .sort('-createdAt')
        .limit(10);

    res.json({
        success: true,
        data: {
            category,
            posts,
            postCount: posts.length
        }
    });
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin only)
export const createCategory = asyncHandler(async (req, res) => {
    // Check if category already exists
    const existingCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') }
    });

    if (existingCategory) {
        return res.status(400).json({
            success: false,
            error: 'Category with this name already exists'
        });
    }

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        data: category
    });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
export const updateCategory = asyncHandler(async (req, res) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found'
        });
    }

    // Check if new name conflicts with existing category
    if (req.body.name) {
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
            _id: { $ne: req.params.id }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                error: 'Category with this name already exists'
            });
        }
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.json({
        success: true,
        data: category
    });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found'
        });
    }

    // Check if category has posts
    const postCount = await Post.countDocuments({ category: category._id });

    if (postCount > 0) {
        return res.status(400).json({
            success: false,
            error: `Cannot delete category. It has ${postCount} posts associated with it.`
        });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        data: {},
        message: 'Category deleted successfully'
    });
});

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
        return res.status(404).json({
            success: false,
            error: 'Category not found'
        });
    }

    // Get posts in this category
    const posts = await Post.find({
        category: category._id,
        isPublished: true
    })
        .populate('author', 'name avatar')
        .sort('-createdAt');

    res.json({
        success: true,
        data: {
            category,
            posts
        }
    });
});