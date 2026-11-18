import { useState } from 'react'
import { X } from 'lucide-react'

function ProductModal({
  product,
  categories,
  onClose,
  onSave
}) {
  // Estado inicial derivado de las props: al montarse, React lo reinicia solo
  const [form, setForm] = useState({
    nombre: product?.nombre || '',
    descripcion: product?.descripcion || '',
    categoria_id: product?.categoria_id ?? '',
    precio: product?.precio ?? '',
    stock_min: product?.stock_min ?? ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSave({
      nombre: form.nombre,
      descripcion: form.descripcion,
      categoria_id: Number(form.categoria_id),
      precio: Number(form.precio),
      stock_min: Number(form.stock_min),
      disponible: true
    })
  }

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            {product ? 'Editar Producto' : 'Agregar Producto'}
          </h3>

          <button type="button" onClick={onClose} title="Cerrar">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del producto</label>

            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>

            <input
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>

            <select
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Precio ($)</label>

            <input
              type="number"
              name="precio"
              min="0"
              step="0.01"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock mínimo</label>

            <input
              type="number"
              name="stock_min"
              min="0"
              step="1"
              value={form.stock_min}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="btn btn-primary">
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
