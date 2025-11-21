/**
 * Seed Users Script
 * Generate password hash yang benar menggunakan bcryptjs
 * Jalankan: node database/seedUsers.js
 */

const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const users = [
  {
    username: 'admin',
    password: 'admin123',
    nama_lengkap: 'Administrator',
    role: 'admin'
  },
  {
    username: 'user',
    password: 'user123',
    nama_lengkap: 'User Biasa',
    role: 'user'
  }
];

async function seedUsers() {
  let connection;
  
  try {
    console.log('🔄 Connecting to database...');
    
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✅ Connected to database');
    console.log('🔄 Generating password hashes...\n');

    // Delete existing users
    await connection.query('DELETE FROM users');
    console.log('🗑️  Cleared existing users');

    // Insert users with hashed passwords
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      // Verify hash immediately
      const isValid = await bcrypt.compare(user.password, hashedPassword);
      
      await connection.query(
        'INSERT INTO users (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)',
        [user.username, hashedPassword, user.nama_lengkap, user.role]
      );

      console.log(`✅ Created user: ${user.username}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Hash: ${hashedPassword}`);
      console.log(`   Verified: ${isValid ? '✅' : '❌'}`);
      console.log(`   Role: ${user.role}\n`);
    }

    console.log('🎉 Seed completed successfully!\n');
    console.log('📝 Login credentials:');
    console.log('   Admin → username: admin, password: admin123');
    console.log('   User  → username: user, password: user123');

  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run seed
seedUsers();