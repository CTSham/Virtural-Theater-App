import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  synopsis: z.string().min(1),
  runtimeMins: z.coerce.number().int().positive(),
  release: z.string().min(1),
  priceRent: z.coerce.number().int().positive(),
  priceBuy: z.coerce.number().int().positive(),
  poster: z.string().min(1)
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.formData()
  const parsed = schema.safeParse({
    title: data.get('title'),
    synopsis: data.get('synopsis'),
    runtimeMins: data.get('runtimeMins'),
    release: data.get('release'),
    priceRent: data.get('priceRent'),
    priceBuy: data.get('priceBuy'),
    poster: data.get('poster')
  })
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const film = await prisma.movie.create({ data: parsed.data })
  return NextResponse.json({ filmId: film.id })
}
