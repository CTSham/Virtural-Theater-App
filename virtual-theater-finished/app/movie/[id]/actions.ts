'use server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function toggleWatchlist(movieId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userId = session.user.id
  const existing = await prisma.watchlistItem.findUnique({ where: { userId_movieId: { userId, movieId } } })
  if (existing) { await prisma.watchlistItem.delete({ where: { userId_movieId: { userId, movieId } } }); return { added: false } }
  await prisma.watchlistItem.create({ data: { userId, movieId } }); return { added: true }
}

export async function addReview(movieId: string, rating: number, content: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  const userId = session.user.id
  await prisma.review.upsert({ where: { userId_movieId: { userId, movieId } }, update: { rating, content }, create: { userId, movieId, rating, content } })
  return { ok: true }
}
