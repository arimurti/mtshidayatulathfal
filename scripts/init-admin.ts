import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123'; // Default password - should be changed immediately
    const name = 'Administrator';

    // Check if admin already exists
    const existingAdmin = await db.admin.findUnique({
      where: { username }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await db.admin.create({
      data: {
        username,
        password: hashedPassword,
        name
      }
    });

    console.log('Admin user created successfully:');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('IMPORTANT: Change the password immediately after first login!');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await db.$disconnect();
  }
}

createAdmin();