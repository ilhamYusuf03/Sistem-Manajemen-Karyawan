const express = require('express');
const DashboardController = require('../controllers/dashboardController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Semua route butuh authentication
router.use(authMiddleware);

// GET /api/dashboard/stats
router.get('/stats', DashboardController.getStats);

module.exports = router;