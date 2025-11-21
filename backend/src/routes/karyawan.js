const express = require('express');
const { body } = require('express-validator');
const KaryawanController = require('../controllers/karyawanController');
const { authMiddleware, adminOnly } = require('../middlewares/auth');
const validate = require('../middlewares/validation');

const router = express.Router();

// Semua route butuh authentication
router.use(authMiddleware);

// GET /api/karyawan
router.get('/', KaryawanController.getAll);

// GET /api/karyawan/:id
router.get('/:id', KaryawanController.getById);

// POST /api/karyawan (admin only)
router.post('/', [
  adminOnly,
  body('nama').notEmpty().withMessage('Nama wajib diisi'),
  body('jabatan').notEmpty().withMessage('Jabatan wajib diisi'),
  body('gaji').isNumeric().withMessage('Gaji harus berupa angka'),
  body('tanggal_masuk').isDate().withMessage('Tanggal masuk harus format YYYY-MM-DD'),
  validate
], KaryawanController.create);

// PUT /api/karyawan/:id (admin only)
router.put('/:id', [
  adminOnly,
  body('nama').notEmpty().withMessage('Nama wajib diisi'),
  body('jabatan').notEmpty().withMessage('Jabatan wajib diisi'),
  body('gaji').isNumeric().withMessage('Gaji harus berupa angka'),
  body('tanggal_masuk').isDate().withMessage('Tanggal masuk harus format YYYY-MM-DD'),
  validate
], KaryawanController.update);

// DELETE /api/karyawan/:id (admin only)
router.delete('/:id', adminOnly, KaryawanController.delete);

module.exports = router;