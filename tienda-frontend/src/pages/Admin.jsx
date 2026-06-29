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
    return <p className="text-white text-center mt-10">Cargando...</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-6 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">Panel de Administración</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
          >
            {showForm ? 'Cancelar' : 'Nuevo producto'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col gap-3">
          <h3 className="text-white font-semibold text-lg">Nuevo producto</h3>
          <input
            type="text"
            placeholder="Título"
            value={newProduct.title}
            onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="text"
            placeholder="URL de imagen"
            value={newProduct.image}
            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <button
            onClick={handleCreate}
            className="bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-200"
          >
            Crear producto
          </button>
        </div>
      )}

      
      <div className="flex flex-col gap-3">
  {products.map(product => (
    <div key={product.id} className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3">
      {editingProduct && editingProduct.id === product.id ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editingProduct.title}
            onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="text"
            value={editingProduct.image}
            onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="text"
            value={editingProduct.description}
            onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-white text-gray-900 px-3 py-1 rounded-lg hover:bg-gray-200 font-medium"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-white font-semibold">{product.title}</h3>
            <p className="text-gray-400">{product.price} €</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingProduct(product)}
              className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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