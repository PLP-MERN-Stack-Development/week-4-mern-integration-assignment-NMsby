// auth.js - Authentication routes

import express from 'express';
import {
    register,
    login,
    getMe,
    updateProfile,
    logout
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import {
    validateUserRegistration,
    validateUserLogin,
    handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

export default router;