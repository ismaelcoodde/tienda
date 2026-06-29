import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {product.price} €
          </span>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl font-medium hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
        >
          Ver producto
        </Link>
      </div>
    </div>
  )
}

export default ProductCard