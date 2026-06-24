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
        const response = await fetch(`http://localhost:8000/products/${id}`)
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
    return <p className="text-white text-center mt-10">Cargando producto...</p>
  }

  if (error) {
    return <p className="text-red-400 text-center mt-10">Error: {error}</p>
  }

  if (!product) {
    return <h2 className="text-white text-center mt-10">Producto no encontrado</h2>
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 rounded-xl p-6 flex flex-col gap-4">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-white text-2xl font-bold">{product.title}</h2>
      <p className="text-gray-400">{product.description}</p>
      <p className="text-white text-xl font-semibold">{product.price} €</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-200"
      >
        Añadir al carrito
      </button>
    </div>
  )
}

export default ProductDetail