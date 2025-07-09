const { body } = require('express-validator');

// Blog validation rules
exports.validateBlog = [
    body('title').notEmpty().withMessage('Title is required'),
    body('category').notEmpty().withMessage('Category is required').isMongoId().withMessage('Category must be a valid ID'),
];

// Category validation rules
exports.validateCategory = [
    body('name').notEmpty().withMessage('Name is required'),
];
