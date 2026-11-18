import { Boxes, Folder, Layers, Store, Tag } from 'lucide-react'

const icons = [Layers, Tag, Boxes, Folder, Store]

function Categories({ categories, onSelect }) {
  if (categories.length === 0) {
    return (
      <div className="empty-state">
        No hay categorías registradas.
      </div>
    )
  }

  return (
    <div className="categories-grid">
      {categories.map((category, index) => {
        const Icon = icons[index % icons.length]

        return (
          <button
            type="button"
            className="cat-card"
            key={category.id}
            onClick={() => onSelect(category)}
          >
            <span className="cat-icon">
              <Icon size={25} />
            </span>

            <span className="cat-info">
              <strong>{category.nombre}</strong>

              <span className="cat-desc">
                {category.descripcion || 'Sin descripción'}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default Categories
