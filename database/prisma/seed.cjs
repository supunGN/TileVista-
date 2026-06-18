const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with JS cjs script...');

  // 1. Clean existing records in dependency order
  await prisma.packageItem.deleteMany();
  await prisma.productPackage.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.bathroomLayout.deleteMany();
  await prisma.itemAssetCatalog.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tilevista.com',
      passwordHash: 'admin123', // plaintext password
      firstName: 'TileVista',
      lastName: 'Administrator',
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@test.com',
      passwordHash: 'cust123',
      firstName: 'Supun',
      lastName: 'Gunasinghe',
      role: 'CUSTOMER',
    },
  });

  console.log('✅ Created mock users: admin@tilevista.com and customer@test.com');

  // 3. Create Sample Item Assets
  await prisma.itemAssetCatalog.createMany({
    data: [
      {
        osposItemId: 1,
        imageUrl: '/uploads/images/1.jpg',
        tags: 'tile, onyx, glossy, royal',
        material: 'Porcelain',
        finish: 'GLOSSY',
        isEnabled: true,
        notes: 'Premium onyx tile visual configuration.',
      },
      {
        osposItemId: 2,
        imageUrl: '/uploads/images/2.jpg',
        tags: 'tile, grey, matte, bathroom',
        material: 'Ceramic',
        finish: 'MATTE',
        isEnabled: true,
        notes: 'Classic matte grey floor tile.',
      },
      {
        osposItemId: 3,
        imageUrl: '/uploads/images/3.jpg',
        tags: 'tile, white, glossy, wall',
        material: 'Ceramic',
        finish: 'GLOSSY',
        isEnabled: true,
        notes: 'Pearl white wall tile.',
      },
    ],
  });

  console.log('✅ Seeded sample visual asset catalogs for OSPOS items 1, 2, and 3.');

  // 4. Create Pre-designed Packages
  const pkg = await prisma.productPackage.create({
    data: {
      name: 'Opulent Marble Suite',
      description: 'A complete collection combining royal white tiles, vessel oval basin, and modern fixtures.',
      discountPercent: 15.0,
      price: 24000.0,
    },
  });

  await prisma.packageItem.createMany({
    data: [
      { packageId: pkg.id, osposItemId: 1 },
      { packageId: pkg.id, osposItemId: 2 },
    ],
  });

  console.log('✅ Created mock product packages.');
  console.log('🌱 Seeding process completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
