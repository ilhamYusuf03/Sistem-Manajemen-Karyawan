const db = require('../config/database');

class User {
  static async findByUsername(username) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, username, nama_lengkap, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(userData) {
    const { username, password, nama_lengkap, role } = userData;
    const [result] = await db.query(
      'INSERT INTO users (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)',
      [username, password, nama_lengkap, role]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.query(
      'SELECT id, username, nama_lengkap, role, created_at FROM users ORDER BY created_at DESC'
    );
    return rows;
  }
}

module.exports = User;