import { Pencil, Trash2 } from 'lucide-react'
function Products({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        No se encontraron productos en la base de datos.
      </div>
    )
  }

  return (
    <div className="card table-responsive">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock mín.</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>#{product.id}</td>

              <td>
                <strong>{product.nombre}</strong>
              </td>

              <td>{product.descripcion || '-'}</td>

              <td>{product.categoria_nombre || '-'}</td>

              <td>
                ${Number(product.precio ?? 0).toFixed(2)}
              </td>

              <td>{product.stock_min} u.</td>

              <td className="actions">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(product)}
                  title="Editar producto"
                  type="button"
                >
                  <Pencil size={16} strokeWidth={2.5} />
                </button>

                <button
                  className="btn-delete"
                  onClick={() => onDelete(product.id)}
                  title="Eliminar producto"
                  type="button"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products
