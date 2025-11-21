const db = require('../config/database');

class Karyawan {
  static async getAll() {
    const [rows] = await db.query(
      'SELECT * FROM karyawan ORDER BY created_at DESC'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM karyawan WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(karyawanData) {
    const { nama, jabatan, gaji, tanggal_masuk } = karyawanData;
    const [result] = await db.query(
      'INSERT INTO karyawan (nama, jabatan, gaji, tanggal_masuk) VALUES (?, ?, ?, ?)',
      [nama, jabatan, gaji, tanggal_masuk]
    );
    return result.insertId;
  }

  static async update(id, karyawanData) {
    const { nama, jabatan, gaji, tanggal_masuk } = karyawanData;
    const [result] = await db.query(
      'UPDATE karyawan SET nama = ?, jabatan = ?, gaji = ?, tanggal_masuk = ? WHERE id = ?',
      [nama, jabatan, gaji, tanggal_masuk, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM karyawan WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }

  static async getTotalCount() {
    const [rows] = await db.query(
      'SELECT COUNT(*) as total FROM karyawan'
    );
    return rows[0].total;
  }

  static async getTotalGaji() {
    const [rows] = await db.query(
      'SELECT SUM(gaji) as total FROM karyawan'
    );
    return rows[0].total || 0;
  }

  static async getByJabatan() {
    const [rows] = await db.query(
      'SELECT jabatan, COUNT(*) as jumlah FROM karyawan GROUP BY jabatan ORDER BY jumlah DESC'
    );
    return rows;
  }
}

module.exports = Karyawan;