import { db } from './db';
import { software, editingStyles, users } from '@shared/schema';
import { count } from 'drizzle-orm';

async function seedDatabase() {
  console.log('Starting database seeding process...');
  
  try {
    // Check if we already have data
    const softwareCount = await db.select({ count: count() }).from(software);
    if (Number(softwareCount[0].count) > 0) {
      console.log('Database already has software data, skipping seed');
      return;
    }

    // Seed software data
    await db.insert(software).values([
      { name: 'Premiere Pro', icon: 'adobe-premiere' },
      { name: 'Final Cut Pro', icon: 'apple-final-cut' },
      { name: 'DaVinci Resolve', icon: 'davinci-resolve' },
      { name: 'After Effects', icon: 'adobe-after-effects' },
      { name: 'CapCut', icon: 'capcut' }
    ]);
    console.log('Software data seeded successfully');

    // Seed editing styles
    await db.insert(editingStyles).values([
      { name: 'YouTube' },
      { name: 'Reels/TikTok' },
      { name: 'Comerciales' },
      { name: 'Eventos' },
      { name: 'Corporativo' }
    ]);
    console.log('Editing styles data seeded successfully');

    // Create test admin user
    await db.insert(users).values({
      email: 'admin@latamvideos.com',
      password: '$2b$10$OM.M2ON4MKJTrw2/CJSUJueJmKqlqjIXGZrECZ.TL7YhErCiQ1vVm', // password: adminpass
      name: 'Admin Usuario',
      userType: 'admin',
      country: 'México'
    });
    console.log('Test admin user created successfully');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('Seeding completed, exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });

export { seedDatabase };