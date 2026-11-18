import { Trash2 } from 'lucide-react'

function ConfirmModal({ productName, onConfirm, onCancel }) {
  return (
    <div className="modal active">
      <div className="modal-content modal-confirm">

        <div className="confirm-icon">
          <span>
            <Trash2 size={26} />
          </span>
        </div>

        <h3>Eliminar producto</h3>

        <p>
          ¿Estás seguro de eliminar{' '}
          {productName
            ? <strong>«{productName}»</strong>
            : 'este producto'}
          ? Esta acción no se puede deshacer.
        </p>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            Sí, eliminar
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal
