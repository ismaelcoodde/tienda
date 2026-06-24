import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Header() {
  const cart = useCartStore(state => state.cart)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className='bg-gray-700 text-white px-6 py-6 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>Mi Tienda</h1>
      <nav className='flex gap-6'>
        <Link className='hover:text-gray-300' to="/">Inicio</Link>
        <Link className='hover:text-gray-300' to="/cart">Carrito ({totalItems})</Link>
      </nav>
    </header>
  )
}

export default Header