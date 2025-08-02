// validation.js - Validation middleware using express-validator

import { body, param, query, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value
        }));

        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errorMessages
        });
    }

    next();
};

// User validation rules
export const validateUserRegistration = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    handleValidationErrors
];

export const validateUserLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    handleValidationErrors
];

// Post validation rules
export const validatePostCreation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 50 })
        .withMessage('Content must be at least 50 characters'),

    body('category')
        .isMongoId()
        .withMessage('Valid category ID is required'),

    body('excerpt')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Excerpt cannot be more than 200 characters'),

    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),

    body('tags.*')
        .optional()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Each tag must be between 2 and 30 characters'),

    handleValidationErrors
];

export const validatePostUpdate = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters'),

    body('content')
        .optional()
        .trim()
        .isLength({ min: 50 })
        .withMessage('Content must be at least 50 characters'),

    body('category')
        .optional()
        .isMongoId()
        .withMessage('Valid category ID is required'),

    body('excerpt')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Excerpt cannot be more than 200 characters'),

    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),

    body('tags.*')
        .optional()
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Each tag must be between 2 and 30 characters'),

    handleValidationErrors
];

// Category validation rules
export const validateCategoryCreation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category name must be between 2 and 50 characters'),

    body('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Description cannot be more than 200 characters'),

    body('color')
        .optional()
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Please provide a valid hex color'),

    handleValidationErrors
];

// Parameter validation
export const validateObjectId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),

    handleValidationErrors
];

// Query validation
export const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    handleValidationErrors
];