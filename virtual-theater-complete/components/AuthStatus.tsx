'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
export default function AuthStatus() {
  const { data: session, status } = useSession()
  if (status === 'loading') return <span className="small">Loading...</span>
  if (!session) return (
    <div style={{display:'flex', gap:8}}>
      <Link href="/login" className="btn">Log in</Link>
      <Link href="/register" className="btn">Sign up</Link>
    </div>
  )
  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <span className="small">{session.user?.email}</span>
      <button className="btn" onClick={()=>signOut()}>Log out</button>
    </div>
  )
}
