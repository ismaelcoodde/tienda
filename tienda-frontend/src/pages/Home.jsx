import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        if (!response.ok) {
          throw new Error('El servidor devolvió un error')
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const productosFiltrados = products
    .filter(product => {
      if (filtro === 'todos') return true
      if (filtro === 'menos30') return product.price < 30
      if (filtro === 'mas30') return product.price > 30
    })
    .filter(product => product.title.toLowerCase().includes(busqueda.toLowerCase()))

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
        <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p className="text-red-300 font-medium">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col items-center max-w-7xl">
      <h2 className="text-white text-3xl sm:text-4xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Productos</span>
      </h2>

      <div className="relative w-full max-w-2xl mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            filtro === 'todos'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('menos30')}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            filtro === 'menos30'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white'
          }`}
        >
          Menos de 30€
        </button>
        <button
          onClick={() => setFiltro('mas30')}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            filtro === 'mas30'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-indigo-500/30 hover:text-white'
          }`}
        >
          Más de 30€
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {productosFiltrados.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-center mt-12 gap-3">
            <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-slate-500 text-lg">No se encontraron productos</p>
          </div>
        ) : (
          productosFiltrados.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default Home