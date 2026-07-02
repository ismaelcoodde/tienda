import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Header() {
  const cart = useCartStore(state => state.cart)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const userEmail = localStorage.getItem('userEmail')
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mi Tienda</h1>
      <nav className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-300">Inicio</Link>
        <Link to="/cart" className="hover:text-gray-300">Carrito ({totalItems})</Link>
        {userEmail ? (
          <div className="flex gap-4 items-center">
            <span className="text-gray-400 text-sm">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="hover:text-gray-300">Iniciar sesión</Link>
            <Link to="/register" className="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm hover:bg-gray-200">Registrarse</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header