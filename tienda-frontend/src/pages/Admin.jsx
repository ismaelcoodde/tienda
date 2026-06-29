import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
  title: '',
  price: '',
  image: '',
  description: ''
})

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.log('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  function handleLogout() {
    localStorage.removeItem('isAdmin')
    navigate('/login')
  }


  async function handleDelete(id) {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
      method: 'DELETE'
    })
    setProducts(products.filter(product => product.id !== id))
  } catch (error) {
    console.log('Error:', error)
  }
}
 

  async function handleCreate() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    const data = await response.json()
    setProducts([...products, data])
    setNewProduct({ title: '', price: '', image: '', description: '' })
    setShowForm(false)
  } catch (error) {
    console.log('Error:', error)
  }
}

async function handleUpdate() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingProduct)
    })
    const data = await response.json()
    setProducts(products.map(p => p.id === data.id ? data : p))
    setEditingProduct(null)
  } catch (error) {
    console.log('Error:', error)
  }
}

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mt-10 px-4 sm:px-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-white text-3xl font-bold">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Panel de Administración</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 text-sm"
          >
            {showForm ? 'Cancelar' : '+ Nuevo producto'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-slate-700/80 text-slate-300 px-5 py-2.5 rounded-xl font-medium hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 border border-white/10 transition-all duration-300 text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-white font-semibold text-lg">Nuevo producto</h3>
          <input
            type="text"
            placeholder="Título"
            value={newProduct.title}
            onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="URL de imagen"
            value={newProduct.image}
            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
          >
            Crear producto
          </button>
        </div>
      )}

      
      <div className="flex flex-col gap-3">
  {products.map(product => (
    <div key={product.id} className="group bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-500/20 transition-all duration-300">
      {editingProduct && editingProduct.id === product.id ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editingProduct.title}
            onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <input
            type="text"
            value={editingProduct.image}
            onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <input
            type="text"
            value={editingProduct.description}
            onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-white/10 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl hover:from-indigo-500 hover:to-purple-500 font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300 text-sm"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-slate-700/80 text-slate-300 px-5 py-2 rounded-xl hover:bg-slate-600 border border-white/10 transition-all duration-300 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-4">
            {product.image && (
              <img src={product.image} alt={product.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            )}
            <div>
              <h3 className="text-white font-semibold">{product.title}</h3>
              <p className="text-indigo-400 font-bold">{product.price} €</p>
            </div>
          </div>
          <div className="flex gap-2 sm:flex-shrink-0">
            <button
              onClick={() => setEditingProduct(product)}
              className="bg-slate-700/80 text-slate-300 px-4 py-2 rounded-xl hover:bg-slate-600 border border-white/10 transition-all duration-300 text-sm font-medium"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500/10 text-red-300 px-4 py-2 rounded-xl hover:bg-red-500/20 border border-red-500/20 transition-all duration-300 text-sm font-medium"
            >
              Borrar
            </button>
          </div>
        </div>
      )}
    </div>
  ))}
</div>
    </div>
  )
}

export default Admin