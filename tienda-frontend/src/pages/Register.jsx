import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegister() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.detail)
        return
      }
      navigate('/login')
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 rounded-xl p-8 flex flex-col gap-4">
      <h2 className="text-white text-2xl font-bold text-center">Crear cuenta</h2>
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
        onClick={handleRegister}
        disabled={loading}
        className="bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50"
      >
        {loading ? 'Creando cuenta...' : 'Registrarse'}
      </button>
      <p className="text-gray-400 text-sm text-center">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-white hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}

export default Register