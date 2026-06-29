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
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-bold">Panel Admin</h2>
          <p className="text-slate-400 text-sm mt-1">Accede al panel de administración</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-slate-400 text-sm font-medium mb-1.5 block">Usuario</label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm font-medium mb-1.5 block">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 mt-1"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login