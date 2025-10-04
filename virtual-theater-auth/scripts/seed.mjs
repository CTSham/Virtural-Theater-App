import { PrismaClient } from '@prisma/client'
import movies from '../data/movies.json' assert { type: 'json' }
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Demo user
  const email = 'demo@virtual.theater'
  const password = 'demo1234'
  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash }
  })

  // Movies
  for (const m of movies) {
    await prisma.movie.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        title: m.title,
        synopsis: m.synopsis,
        runtimeMins: m.runtimeMins,
        release: m.release,
        poster: m.poster,
        streamUrl: m.streamUrl,
        trailerUrl: m.trailerUrl,
        priceRent: m.priceRent,
        priceBuy: m.priceBuy
      }
    })
  }

  console.log('Seeded demo user (demo@virtual.theater / demo1234) and movies.')
}
main().finally(() => prisma.$disconnect())
