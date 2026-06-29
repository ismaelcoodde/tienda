import useCartStore from '../store/cartStore'

function Cart() {
  const cart = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const increaseQuantity = useCartStore(state => state.increaseQuantity)
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
  const getTotalPrice = useCartStore(state => state.getTotalPrice)

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <svg className="w-20 h-20 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <p className="text-slate-400 text-lg">Tu carrito está vacío</p>
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
          Seguir comprando
        </a>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mt-10 px-4 sm:px-6 flex flex-col gap-4">
      <h2 className="text-white text-3xl font-bold">
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Tu Carrito</span>
      </h2>
      {cart.map(item => (
        <div key={item.id} className="group bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center hover:border-indigo-500/20 transition-all duration-300">
          <div className="relative overflow-hidden rounded-xl flex-shrink-0 self-center sm:self-auto">
            <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-20 sm:h-20 object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-white font-semibold">{item.name}</h3>
            <p className="text-indigo-400 font-bold">{item.price} €</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="bg-slate-700/80 text-white w-9 h-9 rounded-xl hover:bg-slate-600 flex items-center justify-center font-medium transition-colors duration-200"
              >
                -
              </button>
              <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="bg-slate-700/80 text-white w-9 h-9 rounded-xl hover:bg-slate-600 flex items-center justify-center font-medium transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="self-end sm:self-center text-slate-500 hover:text-red-400 transition-colors duration-200 p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex justify-between items-center mt-2">
        <span className="text-slate-300 font-semibold text-lg">Total</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {getTotalPrice().toFixed(2)} €
        </span>
      </div>
    </div>
  )
}

export default Cart