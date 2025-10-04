import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import AuthStatus from '@/components/AuthStatus'

export const metadata = {
  title: 'Virtual Theater — Branded',
  description: 'Cinematic premieres with secure streaming, OAuth, and containers.',
  icons: [{ rel: 'icon', url: '/branding/logo.svg' }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <Link href="/" className="brand"><Image src="/branding/logo.svg" alt="Logo" width={120} height={28} /><strong>Virtual Theater</strong></Link>
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
          © {new Date().getFullYear()} Virtual Theater — Branded
        </footer>
      </body>
    </html>
  )
}
