import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCartStore from '../store/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const addToCart = useCartStore(state => state.addToCart)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
        if (!response.ok) {
          throw new Error('Producto no encontrado')
        }
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando producto...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
        <p className="text-red-300 font-medium">Error: {error}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <p className="text-slate-400 text-lg">Producto no encontrado</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mt-10 px-4 sm:px-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">{product.title}</h2>
          <p className="text-slate-400 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {product.price} €
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 mt-2"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail