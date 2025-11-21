const User = require('../models/User');
const BcryptHelper = require('../utils/bcrypt');
const JWTHelper = require('../utils/jwt');
const ApiResponse = require('../utils/response');

class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Find user
      const user = await User.findByUsername(username);
      
      if (!user) {
        return ApiResponse.error(res, 'Username atau password salah', 401);
      }

      // Verify password
      const isPasswordValid = await BcryptHelper.comparePassword(password, user.password);
      
      if (!isPasswordValid) {
        return ApiResponse.error(res, 'Username atau password salah', 401);
      }

      // Generate token
      const token = JWTHelper.generateToken({
        id: user.id,
        username: user.username,
        role: user.role
      });

      // Return response
      return ApiResponse.success(res, {
        token,
        user: {
          id: user.id,
          username: user.username,
          nama_lengkap: user.nama_lengkap,
          role: user.role
        }
      }, 'Login berhasil');

    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return ApiResponse.error(res, 'User not found', 404);
      }

      return ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, nama_lengkap, role } = req.body;

      // Check if username exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return ApiResponse.error(res, 'Username sudah digunakan', 400);
      }

      // Hash password
      const hashedPassword = await BcryptHelper.hashPassword(password);

      // Create user
      const userId = await User.create({
        username,
        password: hashedPassword,
        nama_lengkap,
        role: role || 'user'
      });

      const newUser = await User.findById(userId);

      return ApiResponse.created(res, newUser, 'User berhasil dibuat');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;