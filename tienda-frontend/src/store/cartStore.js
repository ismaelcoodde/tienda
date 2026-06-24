import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existing = get().cart.find(item => item.id === product.id)

    if (existing) {
      set({
        cart: get().cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      set({ cart: [...get().cart, { ...product, quantity: 1 }] })
    }
  },

  increaseQuantity: (id) => {
  set({
    cart: get().cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  })
},

decreaseQuantity: (id) => {
  const item = get().cart.find(item => item.id === id)
  if (item.quantity === 1) {
  set({ cart: get().cart.filter(item => item.id !== id) })
  } else {
  set({
    cart: get().cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  })
}
},
  removeFromCart: (id) => {
    set({ cart: get().cart.filter(item => item.id !== id) })
  },


  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
}))

export default useCartStore