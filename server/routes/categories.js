// categories.js - Categories routes

import express from 'express';
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryBySlug
} from '../controllers/categories.js';
import { protect, authorize } from '../middleware/auth.js';
import {
    validateCategoryCreation,
    validateObjectId,
    handleValidationErrors
} from '../middleware/validation.js';
import { param } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', getCategories);

router.get('/slug/:slug', [
    param('slug')
        .trim()
        .notEmpty()
        .withMessage('Slug is required')
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
    handleValidationErrors
], getCategoryBySlug);

router.get('/:id', validateObjectId, getCategory);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), validateCategoryCreation, createCategory);
router.put('/:id', protect, authorize('admin'), validateObjectId, updateCategory);
router.delete('/:id', protect, authorize('admin'), validateObjectId, deleteCategory);

export default router;