import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-white font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-400">{product.price} €</p>
      <Link to={`/product/${product.id}`} className="bg-white text-gray-900 text-center py-2 rounded-lg font-medium hover:bg-gray-200">
        Ver producto
      </Link>
    </div>
  )
}

export default ProductCard