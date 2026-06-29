import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Header() {
  const cart = useCartStore(state => state.cart)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className='bg-slate-900/80 backdrop-blur-xl border-b border-white/10 text-white px-6 lg:px-12 py-5 flex justify-between items-center sticky top-0 z-50'>
      <Link to="/" className='flex items-center gap-3 group'>
        <div className='w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300'>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className='text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'>Mi Tienda</h1>
      </Link>
      <nav className='flex gap-2 sm:gap-4 items-center'>
        <Link
          className='px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200'
          to="/"
        >
          Inicio
        </Link>
        <Link
          className='px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 relative'
          to="/cart"
        >
          <span className='hidden sm:inline'>Carrito</span>
          <span className='sm:hidden'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </span>
          {totalItems > 0 && (
            <span className='absolute -top-1 -right-1 sm:relative sm:top-auto sm:right-auto ml-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30'>
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}

export default Header