'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    if (res.ok) router.push('/login')
    else alert('Registration failed')
  }
  return (
    <form className="panel" onSubmit={onSubmit} className="form-container">
      <h1>Create account</h1>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div className="spacer-8"/>
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="spacer-12"/>
      <button className="btn gold" type="submit">Sign up</button>
    </form>
  )
}
