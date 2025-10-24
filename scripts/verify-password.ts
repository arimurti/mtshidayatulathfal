import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function verifyPassword() {
  try {
    const admin = await db.admin.findUnique({
      where: { username: 'admin' }
    });

    if (!admin) {
      console.log('Admin not found');
      return;
    }

    console.log('Admin found:', admin.username);
    console.log('Stored hash:', admin.password);

    // Test password verification
    const testPassword = 'admin123';
    const isValid = await bcrypt.compare(testPassword, admin.password);
    console.log(`Password "${testPassword}" valid:`, isValid);

    // Test with wrong password
    const wrongPassword = 'wrong';
    const isWrong = await bcrypt.compare(wrongPassword, admin.password);
    console.log(`Password "${wrongPassword}" valid:`, isWrong);

    // Create new hash to compare
    const newHash = await bcrypt.hash(testPassword, 10);
    console.log('New hash:', newHash);
    const isNewValid = await bcrypt.compare(testPassword, newHash);
    console.log('New hash valid:', isNewValid);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.$disconnect();
  }
}

verifyPassword();