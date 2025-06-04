import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Crear usuario administrador por defecto
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { us_email: 'admin@parques.com' },
    update: {},
    create: {
      us_name: 'Administrator',
      us_email: 'admin@parques.com',
      us_user_type: 'ADMIN',
      us_password: hashedPassword,
    },
  });

  // Crear usuario normal de ejemplo
  const normalUser = await prisma.user.create({
    data: {
      us_name: 'John Doe',
      us_email: 'john.doe@email.com',
      us_user_type: 'USER',
      us_password: await bcrypt.hash('user123', 10),
    },
  });

  // Crear parque de ejemplo
  const centralPark = await prisma.park.upsert({
    where: { pk_id: 1 },
    update: {},
    create: {
      pk_name: 'Central Park',
      pk_address: 'Calle 123 #45-67, Bogotá',
    },
  });

  const northPark = await prisma.park.create({
    data: {
      pk_name: 'North Park',
      pk_address: 'Avenida Norte #100-200, Bogotá',
    },
  });

  // Crear categorías de actividad de ejemplo
  const sportsCategory = await prisma.activityCategory.upsert({
    where: { ac_id: 1 },
    update: {},
    create: {
      ac_name: 'Sports Activities',
      ac_priority_level: 1,
      ac_description: 'Sports and recreational activities',
    },
  });

  const culturalCategory = await prisma.activityCategory.create({
    data: {
      ac_name: 'Cultural Activities',
      ac_priority_level: 2,
      ac_description: 'Cultural and artistic activities',
    },
  });

  // Crear escenarios de ejemplo
  const soccerField = await prisma.scenario.upsert({
    where: { sc_id: 1 },
    update: {},
    create: {
      pk_id: centralPark.pk_id,
      sc_name: 'Soccer Field #1',
      sc_address: 'North section of Central Park',
    },
  });

  const basketballCourt = await prisma.scenario.create({
    data: {
      pk_id: centralPark.pk_id,
      sc_name: 'Basketball Court #1',
      sc_address: 'South section of Central Park',
    },
  });

  const amphitheater = await prisma.scenario.create({
    data: {
      pk_id: northPark.pk_id,
      sc_name: 'Open Air Amphitheater',
      sc_address: 'Central area of North Park',
    },
  });

  // Crear particiones de ejemplo
  const soccerPartition1 = await prisma.partition.create({
    data: {
      sc_id: soccerField.sc_id,
      pt_name: 'North Half',
    },
  });

  const soccerPartition2 = await prisma.partition.create({
    data: {
      sc_id: soccerField.sc_id,
      pt_name: 'South Half',
    },
  });

  const basketballPartition = await prisma.partition.create({
    data: {
      sc_id: basketballCourt.sc_id,
      pt_name: 'Full Court',
    },
  });

  // Crear segmentos de partición de ejemplo
  const segment1 = await prisma.partitionSegment.create({
    data: {
      pt_id: soccerPartition1.pt_id,
      ps_name: 'Goal Area A',
    },
  });

  const segment2 = await prisma.partitionSegment.create({
    data: {
      pt_id: soccerPartition1.pt_id,
      ps_name: 'Center Field A',
    },
  });

  const segment3 = await prisma.partitionSegment.create({
    data: {
      pt_id: soccerPartition2.pt_id,
      ps_name: 'Goal Area B',
    },
  });

  const basketballSegment1 = await prisma.partitionSegment.create({
    data: {
      pt_id: basketballPartition.pt_id,
      ps_name: 'Court A',
    },
  });

  const basketballSegment2 = await prisma.partitionSegment.create({
    data: {
      pt_id: basketballPartition.pt_id,
      ps_name: 'Court B',
    },
  });

  // Crear horarios de dotación de ejemplo
  const schedule1 = await prisma.scheduleEndowment.create({
    data: {
      ac_id: sportsCategory.ac_id,
      sc_id: soccerField.sc_id,
      us_id: adminUser.us_id,
      sh_start_time: '08:00',
      sh_end_time: '12:00',
      sh_start_date: new Date('2025-06-01'),
      sh_end_date: new Date('2025-12-31'),
      sh_day: 'Monday',
    },
  });

  const schedule2 = await prisma.scheduleEndowment.create({
    data: {
      ac_id: sportsCategory.ac_id,
      sc_id: basketballCourt.sc_id,
      us_id: adminUser.us_id,
      sh_start_time: '14:00',
      sh_end_time: '18:00',
      sh_start_date: new Date('2025-06-01'),
      sh_end_date: new Date('2025-12-31'),
      sh_day: 'Tuesday',
    },
  });

  // Crear reservas de agenda de ejemplo
  const agenda1 = await prisma.agenda.create({
    data: {
      sc_id: soccerField.sc_id,
      pt_id: soccerPartition1.pt_id,
      ps_id: segment1.ps_id,
      us_id: normalUser.us_id,
      ag_start_time: '09:00',
      ag_end_time: '11:00',
      ag_date: new Date('2025-06-15'),
    },
  });

  const agenda2 = await prisma.agenda.create({
    data: {
      sc_id: basketballCourt.sc_id,
      pt_id: basketballPartition.pt_id,
      ps_id: basketballSegment1.ps_id,
      us_id: normalUser.us_id,
      ag_start_time: '15:00',
      ag_end_time: '17:00',
      ag_date: new Date('2025-06-16'),
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log({
    users: [
      {
        id: adminUser.us_id,
        email: adminUser.us_email,
        type: adminUser.us_user_type,
      },
      {
        id: normalUser.us_id,
        email: normalUser.us_email,
        type: normalUser.us_user_type,
      },
    ],
    parks: [
      { id: centralPark.pk_id, name: centralPark.pk_name },
      { id: northPark.pk_id, name: northPark.pk_name }
    ],
    categories: [
      { id: sportsCategory.ac_id, name: sportsCategory.ac_name },
      { id: culturalCategory.ac_id, name: culturalCategory.ac_name }
    ],
    scenarios: [
      { id: soccerField.sc_id, name: soccerField.sc_name },
      { id: basketballCourt.sc_id, name: basketballCourt.sc_name },
      { id: amphitheater.sc_id, name: amphitheater.sc_name }
    ],
    partitions: [
      { id: soccerPartition1.pt_id, name: soccerPartition1.pt_name },
      { id: soccerPartition2.pt_id, name: soccerPartition2.pt_name },
      { id: basketballPartition.pt_id, name: basketballPartition.pt_name }
    ],
    segments: [
      { id: segment1.ps_id, name: segment1.ps_name },
      { id: segment2.ps_id, name: segment2.ps_name },
      { id: segment3.ps_id, name: segment3.ps_name },
      { id: basketballSegment1.ps_id, name: basketballSegment1.ps_name },
      { id: basketballSegment2.ps_id, name: basketballSegment2.ps_name }
    ],
    schedules: [
      {
        id: schedule1.sh_id,
        day: schedule1.sh_day,
        time: `${schedule1.sh_start_time}-${schedule1.sh_end_time}`,
      },
      {
        id: schedule2.sh_id,
        day: schedule2.sh_day,
        time: `${schedule2.sh_start_time}-${schedule2.sh_end_time}`,
      },
    ],
    agendas: [
      {
        id: agenda1.ag_id,
        date: agenda1.ag_date,
        time: `${agenda1.ag_start_time}-${agenda1.ag_end_time}`,
      },
      {
        id: agenda2.ag_id,
        date: agenda2.ag_date,
        time: `${agenda2.ag_start_time}-${agenda2.ag_end_time}`,
      },
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
