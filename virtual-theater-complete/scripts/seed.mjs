import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@virtual.theater' },
    update: { role: 'ADMIN' },
    create: {
      email: 'admin@virtual.theater',
      passwordHash: await bcrypt.hash('admin1234', 10),
      role: 'ADMIN'
    }
  })
  const user = await prisma.user.upsert({
    where: { email: 'demo@virtual.theater' },
    update: {},
    create: {
      email: 'demo@virtual.theater',
      passwordHash: await bcrypt.hash('demo1234', 10),
      role: 'USER'
    }
  })
  await prisma.movie.create({
    data: {
      title: 'Indie Film X',
      synopsis: 'A gripping story of survival and redemption.',
      runtimeMins: 102,
      release: 'June 2025',
      poster: '/posters/indie-film-x.jpg',
      priceRent: 499,
      priceBuy: 999
    }
  })
  console.log('Seeded: admin/admin1234, demo/demo1234, and one movie.')
}
main().finally(()=>prisma.$disconnect())
