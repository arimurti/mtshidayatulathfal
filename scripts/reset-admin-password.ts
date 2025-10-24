import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function resetAdminPassword() {
  try {
    const username = 'admin';
    const password = 'admin123';
    const name = 'Administrator';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upsert admin user (create or update)
    const admin = await db.admin.upsert({
      where: { username },
      update: { 
        password: hashedPassword,
        name
      },
      create: {
        username,
        password: hashedPassword,
        name
      }
    });

    console.log('Admin password reset successfully:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Admin ID: ${admin.id}`);
    
    // Verify the password
    const isValid = await bcrypt.compare(password, admin.password);
    console.log(`Password verification: ${isValid ? 'SUCCESS' : 'FAILED'}`);

  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    await db.$disconnect();
  }
}

resetAdminPassword();