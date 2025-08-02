// posts.js - Posts routes

import express from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    addComment
} from '../controllers/posts.js';
import { protect, authorize } from '../middleware/auth.js';
import {
    validatePostCreation,
    validatePostUpdate,
    validateObjectId,
    validatePagination,
    handleValidationErrors
} from '../middleware/validation.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', validatePagination, getPosts);
router.get('/:id', validateObjectId, getPost);

// Protected routes
router.post('/', protect, validatePostCreation, createPost);
router.put('/:id', protect, validateObjectId, validatePostUpdate, updatePost);
router.delete('/:id', protect, validateObjectId, deletePost);

// Comment routes
router.post('/:id/comments', [
    protect,
    validateObjectId,
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Comment content is required')
        .isLength({ min: 5, max: 500 })
        .withMessage('Comment must be between 5 and 500 characters'),
    handleValidationErrors
], addComment);

export default router;