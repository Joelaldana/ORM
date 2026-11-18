import { useEffect, useRef, useState } from 'react'
import { Box, Boxes, Plus, Tags, X } from 'lucide-react'

import Products from './components/Products'
import Categories from './components/Categories'
import ProductModal from './components/ProductModal'
import ConfirmModal from './components/ConfirmModal'
import Toast from './components/Toast'

import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from './services/api'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [section, setSection] = useState('productos')
  const [filterCategory, setFilterCategory] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const toastTimer = useRef(null)

  // Cargar datos iniciales
  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setError('')

    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ])

      setProducts(productsData)
      setCategories(categoriesData)

    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al conectar con Flask')
    } finally {
      setLoading(false)
    }
  }

  // Abrir formulario
  function openModal(product = null) {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  // Cerrar formulario
  function closeModal() {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Notificación flotante (éxito o error)
  function showToast(type, message) {
    setToast({ type, message, id: Date.now() })

    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4000)
  }

  // Registrar o actualizar
  async function handleSave(productData) {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData)
        showToast('success', 'Producto actualizado correctamente')
      } else {
        await createProduct(productData)
        showToast('success', 'Producto registrado correctamente')
      }

      closeModal()
      await loadData()

    } catch (err) {
      console.error(err)
      showToast('error', err.message || 'Error al guardar el producto')
    }
  }

  // Eliminar producto (abre confirmación estilizada)
  function handleDelete(id) {
    setDeleteTarget(
      products.find((product) => product.id === id) || { id }
    )
  }

  // Confirmar eliminación
  async function confirmDelete() {
    if (!deleteTarget) return

    try {
      await deleteProduct(deleteTarget.id)
      setDeleteTarget(null)
      showToast('success', `Producto "${deleteTarget.nombre}" eliminado correctamente`)
      await loadData()

    } catch (err) {
      console.error(err)
      setDeleteTarget(null)
      showToast('error', 'No se pudo eliminar el producto')
    }
  }

  // Filtrar productos por categoría
  const filteredProducts = products
    .filter((product) => {
      if (filterCategory === null) return true

      return Number(product.categoria_id) === Number(filterCategory)
    })
    .map((product) => {
      const category = categories.find(
        (cat) => Number(cat.id) === Number(product.categoria_id)
      )

      return {
        ...product,
        categoria_nombre:
          product.categoria_nombre || category?.nombre
      }
    })

  // Seleccionar categoría
  function handleCategorySelect(category) {
    setFilterCategory(category.id)
    setSection('productos')
  }

  return (
    <div className="app-container">

      {/* Menú lateral */}
      <aside className="sidebar">

        <div className="brand">
          <Boxes size={24} />
          <span>StockPastel</span>
        </div>

        <ul className="nav-list">

          <li>
            <button
              className={section === 'productos' ? 'active' : ''}
              onClick={() => setSection('productos')}
            >
              <Box size={18} />
              Productos
            </button>
          </li>

          <li>
            <button
              className={section === 'categorias' ? 'active' : ''}
              onClick={() => setSection('categorias')}
            >
              <Tags size={18} />
              Categorías
            </button>
          </li>

        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">

        {section === 'productos' && (
          <>
            <div className="header-bar">

              <h1>Gestión de Productos</h1>

              <button
                className="btn btn-primary"
                onClick={() => openModal()}
              >
                <Plus size={16} />
                Agregar Producto
              </button>

            </div>

            {filterCategory !== null && (
              <div className="filter-indicator">
                <span>
                  Filtrado por: <strong>
                    {categories.find(
                      (cat) => Number(cat.id) === Number(filterCategory)
                    )?.nombre}
                  </strong>
                </span>

                <button
                  onClick={() => setFilterCategory(null)}
                  title="Quitar filtro"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <div className="error-message">
                {error}
              </div>
            ) : (
              <Products
                products={filteredProducts}
                onEdit={openModal}
                onDelete={handleDelete}
              />
            )}
          </>
        )}

        {section === 'categorias' && (
          <>
            <div className="header-bar">
              <h1>Categorías Registradas</h1>
            </div>

            {loading ? (
              <p>Cargando categorías...</p>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <Categories
                categories={categories}
                onSelect={handleCategorySelect}
              />
            )}
          </>
        )}

      </main>

      {/* Notificaciones flotantes */}
      {toast && (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirmación de eliminación */}
      {deleteTarget && (
        <ConfirmModal
          productName={deleteTarget.nombre}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Modal de productos (solo se monta cuando está abierto) */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          categories={categories}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

    </div>
  )
}

export default App
