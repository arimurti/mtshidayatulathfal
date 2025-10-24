import { db } from '../src/lib/db';

async function checkAdmin() {
  try {
    const admins = await db.admin.findMany();
    console.log('Admin accounts in database:');
    console.log(JSON.stringify(admins, null, 2));
  } catch (error) {
    console.error('Error checking admin:', error);
  } finally {
    await db.$disconnect();
  }
}

checkAdmin();