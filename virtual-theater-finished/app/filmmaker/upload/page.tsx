import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function UploadPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')
  return (
    <div className="panel upload-container">
      <h1>New Film</h1>
      <form action="/api/films/create" method="POST">
        <input className="input" name="title" placeholder="Title" />
        <div className="spacer-8"/>
        <textarea className="input" name="synopsis" placeholder="Synopsis" rows={3 as any}></textarea>
        <div className="spacer-8"/>
        <div className="grid-2col">
          <input className="input" name="runtimeMins" placeholder="Runtime minutes" />
          <input className="input" name="release" placeholder="Release label (e.g., June 2025)" />
        </div>
        <div className="spacer-8"/>
        <div className="grid-2col">
          <input className="input" name="priceRent" placeholder="Rent price (cents)" />
          <input className="input" name="priceBuy" placeholder="Buy price (cents)" />
        </div>
        <div className="spacer-8"/>
        <input className="input" name="poster" placeholder="/posters/indie-film-x.jpg" />
        <div className="spacer-12"/>
        <button className="btn gold" type="submit">Create & Get Upload URLs</button>
      </form>
    </div>
  )
}
