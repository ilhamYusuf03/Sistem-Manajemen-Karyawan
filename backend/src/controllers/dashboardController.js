const Karyawan = require('../models/Karyawan');
const ApiResponse = require('../utils/response');

class DashboardController {
  static async getStats(req, res, next) {
    try {
      const [totalKaryawan, totalGaji, karyawanByJabatan] = await Promise.all([
        Karyawan.getTotalCount(),
        Karyawan.getTotalGaji(),
        Karyawan.getByJabatan()
      ]);

      const stats = {
        total_karyawan: totalKaryawan,
        total_gaji: totalGaji,
        rata_rata_gaji: totalKaryawan > 0 ? Math.round(totalGaji / totalKaryawan) : 0,
        karyawan_by_jabatan: karyawanByJabatan
      };

      return ApiResponse.success(res, stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;