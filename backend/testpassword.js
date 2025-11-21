/**
 * Generate Correct Password Hash
 * Generate hash yang PASTI benar untuk admin123
 */

const bcrypt = require('bcryptjs');

async function generateHash() {
  console.log('🔐 Generating password hash...\n');

  const password = 'admin123';
  
  // Generate hash
  const hash = await bcrypt.hash(password, 10);
  
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('Length:', hash.length);
  console.log('');
  
  // Verify immediately
  const isValid = await bcrypt.compare(password, hash);
  console.log('✓ Verification:', isValid ? '✅ VALID' : '❌ INVALID');
  console.log('');
  
  console.log('📋 SQL Query untuk update:');
  console.log('');
  console.log('UPDATE users SET password = \'' + hash + '\' WHERE username = \'admin\';');
  console.log('');
  
  // Test beberapa kali untuk memastikan
  console.log('🧪 Testing 5 times to ensure consistency:');
  for (let i = 1; i <= 5; i++) {
    const test = await bcrypt.compare(password, hash);
    console.log(`   Test ${i}:`, test ? '✅' : '❌');
  }
}

generateHash();