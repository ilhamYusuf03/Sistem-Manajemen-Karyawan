const Karyawan = require('../models/Karyawan');
const ApiResponse = require('../utils/response');

class KaryawanController {
  static async getAll(req, res, next) {
    try {
      const karyawan = await Karyawan.getAll();
      return ApiResponse.success(res, karyawan);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const karyawan = await Karyawan.findById(id);

      if (!karyawan) {
        return ApiResponse.error(res, 'Karyawan tidak ditemukan', 404);
      }

      return ApiResponse.success(res, karyawan);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { nama, jabatan, gaji, tanggal_masuk } = req.body;

      const karyawanId = await Karyawan.create({
        nama,
        jabatan,
        gaji,
        tanggal_masuk
      });

      const newKaryawan = await Karyawan.findById(karyawanId);

      return ApiResponse.created(res, newKaryawan, 'Karyawan berhasil ditambahkan');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama, jabatan, gaji, tanggal_masuk } = req.body;

      // Check if exists
      const existing = await Karyawan.findById(id);
      if (!existing) {
        return ApiResponse.error(res, 'Karyawan tidak ditemukan', 404);
      }

      await Karyawan.update(id, {
        nama,
        jabatan,
        gaji,
        tanggal_masuk
      });

      const updatedKaryawan = await Karyawan.findById(id);

      return ApiResponse.success(res, updatedKaryawan, 'Karyawan berhasil diupdate');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      // Check if exists
      const existing = await Karyawan.findById(id);
      if (!existing) {
        return ApiResponse.error(res, 'Karyawan tidak ditemukan', 404);
      }

      await Karyawan.delete(id);

      return ApiResponse.success(res, null, 'Karyawan berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KaryawanController;