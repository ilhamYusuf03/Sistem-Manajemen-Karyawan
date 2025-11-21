const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const { authMiddleware, adminOnly } = require('../middlewares/auth');
const validate = require('../middlewares/validation');

const router = express.Router();

// POST /api/auth/login
router.post('/login', [
  body('username').notEmpty().withMessage('Username wajib diisi'),
  body('password').notEmpty().withMessage('Password wajib diisi'),
  validate
], AuthController.login);

// GET /api/auth/profile (protected)
router.get('/profile', authMiddleware, AuthController.getProfile);

// POST /api/auth/register (admin only)
router.post('/register', [
  authMiddleware,
  adminOnly,
  body('username').notEmpty().isLength({ min: 3 }).withMessage('Username minimal 3 karakter'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('nama_lengkap').notEmpty().withMessage('Nama lengkap wajib diisi'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Role harus admin atau user'),
  validate
], AuthController.register);

module.exports = router;