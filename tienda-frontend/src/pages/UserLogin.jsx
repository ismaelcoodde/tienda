import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.detail)
        return
      }
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('userEmail', email)
      navigate('/')
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 rounded-xl p-8 flex flex-col gap-4">
      <h2 className="text-white text-2xl font-bold text-center">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50"
      >
        {loading ? 'Entrando...' : 'Iniciar sesión'}
      </button>
      <p className="text-gray-400 text-sm text-center">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-white hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  )
}

export default UserLogin