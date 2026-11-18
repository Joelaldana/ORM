import { Check, X } from 'lucide-react'

function Toast({ type, message, onClose }) {
  const Icon = type === 'error' ? X : Check

  return (
    <div className={`toast ${type}`} role="status">
      <span className="toast-icon">
        <Icon size={16} strokeWidth={3} />
      </span>

      <span className="toast-message">{message}</span>

      <button type="button" onClick={onClose} title="Cerrar notificación">
        <X size={16} />
      </button>
    </div>
  )
}

export default Toast
