// URL base de la API.
// En desarrollo: cadena vacía y el proxy de Vite (vite.config.js) redirige a Flask.
// En producción: definir VITE_API_URL en las variables de entorno del hosting.
const API_URL = import.meta.env.VITE_API_URL ?? ''

// Manejo de errores común para todas las peticiones
async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, options)

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || 'Error en la petición a la API')
  }

  return response.json()
}

// Obtener productos
export function getProducts() {
  return request('/products')
}

// Obtener categorías
export function getCategories() {
  return request('/categorias')
}

// Registrar producto
export function createProduct(product) {
  return request('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}

// Actualizar producto
export function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}

// Eliminar producto
export function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: 'DELETE',
  })
}
