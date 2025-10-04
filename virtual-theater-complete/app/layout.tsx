import './globals.css'
import Link from 'next/link'
import AuthStatus from '@/components/AuthStatus'

export const metadata = {
  title: 'Virtual Theater — Complete',
  description: 'Indie premieres with payments, uploads, reviews, watchlists, admin.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <div><Link href="/"><strong>🎬 Virtual Theater</strong></Link></div>
          <nav style={{display:'flex', gap:12, alignItems:'center'}}>
            <Link href="/browse">Browse</Link>
            <Link href="/library">My Library</Link>
            <Link href="/filmmaker/upload">Upload</Link>
            <Link href="/admin">Admin</Link>
            <AuthStatus />
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="container small" style={{opacity:.7, paddingBottom:32}}>
          © {new Date().getFullYear()} Virtual Theater — Complete
        </footer>
      </body>
    </html>
  )
}
