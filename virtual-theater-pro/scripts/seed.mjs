import { PrismaClient } from '@prisma/client'
import movies from '../data/movies.json' assert { type: 'json' }
const prisma = new PrismaClient()

async function main() {
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
        streamUrl: m.stream,
        trailerUrl: m.trailer,
        priceRent: m.priceRent,
        priceBuy: m.priceBuy
      }
    })
  }
  console.log('Seed complete.')
}
main().finally(() => prisma.$disconnect())
