import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing records
  await prisma.packageProduct.deleteMany();
  await prisma.productPackage.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.bathroomLayout.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tilevista.com',
      passwordHash: 'admin123', // In production, hash passwords using bcrypt
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

  // 3. Create Products
  const p1 = await prisma.product.create({
    data: {
      sku: 'TL-MAR-600',
      name: 'Royal Marble Polished Tile',
      description: 'Ultra-premium polished white marble porcelain tile.',
      price: 3850,
      discount: 10,
      quantity: 140,
      category: 'TILE',
      brand: 'Rocell',
      color: 'White',
      material: 'Porcelain',
      size: '600x600mm',
    },
  });

  const p2 = await prisma.product.create({
    data: {
      sku: 'BW-BAS-WSH',
      name: 'Vessel Oval Wash Basin',
      description: 'Sleek matte ceramic wash basin.',
      price: 24500,
      discount: 0,
      quantity: 18,
      category: 'BATHWARE',
      brand: 'Lanka Tiles',
      color: 'Matte Black',
      material: 'Ceramic',
    },
  });

  const p3 = await prisma.product.create({
    data: {
      sku: 'TL-GRN-300',
      name: 'Forest Green Matte Ceramic Tile',
      description: 'Premium emerald forest green matte finish bathroom tile.',
      price: 2400,
      discount: 5,
      quantity: 250,
      category: 'TILE',
      brand: 'Rocell',
      color: 'Green',
      material: 'Ceramic',
      size: '300x300mm',
    },
  });

  console.log('✅ Created mock catalogue products.');

  // 4. Create Pre-designed Packages
  const pkg = await prisma.productPackage.create({
    data: {
      name: 'Opulent Marble Suite',
      description: 'A complete collection combining royal marble porcelain tiles, vessel oval basin, and modern bathware.',
      discountPercent: 15,
      price: 24097.5, // (3850 + 24500) * 0.85
    },
  });

  await prisma.packageProduct.createMany({
    data: [
      { packageId: pkg.id, productId: p1.id },
      { packageId: pkg.id, productId: p2.id },
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
