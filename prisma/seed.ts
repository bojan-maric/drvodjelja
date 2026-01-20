// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // 1. Create admin user
  const email = 'admin@drvodjelja.hr';
  const password = 'Drvodjelja2024!';
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: 'Miljenko',
    },
  });
  console.log('✅ Admin user created');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}\n`);

  // 2. Seed default services
  console.log('🔧 Seeding services...');
  const services = [
    {
      name: 'Kuhinje po mjeri',
      slug: 'kuhinje',
      description: 'Izrađujemo kuhinje po mjeri koje savršeno odgovaraju vašem prostoru i potrebama. Koristimo kvalitetne materijale i pažljivo izrađujemo svaki detalj.',
      icon: 'ChefHat',
      order: 1,
    },
    {
      name: 'Vrata i prozori',
      slug: 'vrata',
      description: 'Drvena vrata i prozori izrađeni od najkvalitetnijeg drva. Kombinacija tradicije i moderne tehnologije za dugotrajnost i estetiku.',
      icon: 'DoorOpen',
      order: 2,
    },
    {
      name: 'Namještaj po mjeri',
      slug: 'namjestaj',
      description: 'Ormare, komode, police i drugi namještaj izrađujemo prema vašim željama. Svaki komad je jedinstven i prilagođen vašem prostoru.',
      icon: 'Armchair',
      order: 3,
    },
    {
      name: 'Stepenice',
      slug: 'stepenice',
      description: 'Drvene stepenice koje su spoj funkcionalnosti i ljepote. Izrađujemo ravne, zavojite i konzolne stepenice.',
      icon: 'Stairs',
      order: 4,
    },
    {
      name: 'Restauracija',
      slug: 'restauracija',
      description: 'Obnavljamo stari namještaj i vraćamo mu nekadašnji sjaj. S poštovanjem prema tradiciji i originalnom izgledu.',
      icon: 'Hammer',
      order: 5,
    },
    {
      name: 'Poslovni prostori',
      slug: 'poslovni-prostori',
      description: 'Opremamo restorane, hotele, kafiće i poslovne prostore. Kompletan interijer od drva prema vašim specifikacijama.',
      icon: 'Building2',
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log(`✅ ${services.length} services seeded\n`);

  // 3. Seed default settings
  console.log('⚙️ Seeding settings...');
  const settings = [
    { key: 'contact_email', value: 'info@drvodjelja.hr' },
    { key: 'contact_phone', value: '+385 XX XXX XXXX' },
    { key: 'contact_address', value: 'Adresa radionice, Grad' },
    { key: 'working_hours', value: 'Pon-Pet: 08:00-16:00, Sub: 08:00-12:00' },
    { key: 'about_text', value: 'Drvodjelja je stolarska radionica s preko 30 godina iskustva u izradi kvalitetnog drvenog namještaja i stolarije. Naša tradicija, znanje i ljubav prema drvu čine svaki naš proizvod posebnim.' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: {
        key: s.key,
        value: s.value,
      },
    });
  }
  console.log('✅ Settings seeded\n');

  console.log('🎉 Seeding complete!');
  console.log('\n⚠️  IMPORTANT: Change admin password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
