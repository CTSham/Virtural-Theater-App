'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Login() {
  const [email, setEmail] = useState('demo@virtual.theater')
  const [password, setPassword] = useState('demo1234')
  const router = useRouter()
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.ok) router.push('/')
    else alert('Invalid credentials')
  }
  return (<form className="panel" onSubmit={onSubmit} className="form-container"><h1>Log in</h1><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><div className="spacer-8"/><input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><div className="spacer-12"/><button className="btn gold" type="submit">Log in</button></form>)
}
