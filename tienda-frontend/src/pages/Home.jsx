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
        const response = await fetch('http://localhost:8000/products')
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
    return <p className="text-white text-center mt-10">Cargando productos...</p>
  }

  if (error) {
    return <p className="text-red-400 text-center mt-10">Error: {error}</p>
  }

  return (
    <div className="px-6 py-8 flex flex-col items-center">
      <h2 className="text-white text-2xl font-bold mb-6">Productos</h2>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg bg-gray-800 text-white w-full max-w-3xl outline-none"
      />

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFiltro('todos')}
          className={filtro === 'todos' ? 'bg-white text-gray-900 px-4 py-2 rounded-lg font-medium' : 'bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600'}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('menos30')}
          className={filtro === 'menos30' ? 'bg-white text-gray-900 px-4 py-2 rounded-lg font-medium' : 'bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600'}
        >
          Menos de 30€
        </button>
        <button
          onClick={() => setFiltro('mas30')}
          className={filtro === 'mas30' ? 'bg-white text-gray-900 px-4 py-2 rounded-lg font-medium' : 'bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600'}
        >
          Más de 30€
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-3xl w-full">
        {productosFiltrados.length === 0 ? (
          <p className="text-gray-400 col-span-2 text-center mt-6">No se encontraron productos</p>
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