import useCartStore from '../store/cartStore'

function Cart() {
  const cart = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const getTotalPrice = useCartStore(state => state.getTotalPrice)

  if (cart.length === 0) {
    return <h2 className="text-white text-center mt-10">Tu carrito está vacío</h2>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col gap-4">
      <h2 className="text-white text-2xl font-bold">Tu Carrito</h2>
      {cart.map(item => (
        <div key={item.id} className="bg-gray-800 rounded-xl p-4 flex gap-4 items-center">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-white font-semibold">{item.name}</h3>
            <p className="text-gray-400">{item.price} €</p>
            <div className="flex items-center gap-3">
              <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-700 text-white w-8 h-8 rounded-lg hover:bg-gray-600">-</button>
              <span className="text-white">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)} className="bg-gray-700 text-white w-8 h-8 rounded-lg hover:bg-gray-600">+</button>
            </div>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 text-sm">Eliminar</button>
        </div>
      ))}
      <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
        <span className="text-white font-bold text-lg">Total</span>
        <span className="text-white font-bold text-lg">{getTotalPrice().toFixed(2)} €</span>
      </div>
    </div>
  )
}

export default Cart