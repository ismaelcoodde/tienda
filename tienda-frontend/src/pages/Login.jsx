import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = 'tienda123'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin() {
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 rounded-xl p-8 flex flex-col gap-4">
      <h2 className="text-white text-2xl font-bold text-center">Panel Admin</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
        className="bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-200"
      >
        Entrar
      </button>
    </div>
  )
}

export default Login