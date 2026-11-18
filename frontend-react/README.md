# StockPastel — Frontend React

Interfaz de gestión de productos y categorías para la API Flask del proyecto.
Construida con React 19 + Vite y `lucide-react` para los iconos.

## Requisitos

- Node.js 18 o superior
- El backend Flask corriendo en `http://127.0.0.1:5000`

## Ejecución en desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev
```

Vite queda en `http://localhost:5173` y usa el proxy definido en
`vite.config.js` para redirigir `/products` y `/categorias` hacia Flask.

## Scripts disponibles

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo con HMR       |
| `npm run build`   | Build de producción en `dist/`       |
| `npm run preview` | Previsualizar el build localmente    |
| `npm run lint`    | Verificar el código con ESLint       |

## Variables de entorno

| Variable       | Descripción                              | Por defecto             |
| -------------- | ---------------------------------------- | ----------------------- |
| `VITE_API_URL` | URL base de la API. En desarrollo usa el | vacío (usa el proxy de  |
|                | proxy de Vite; en producción apunta a     | Vite)                   |
|                | tu backend desplegado                     |                         |

Ejemplo para producción (`.env.production`):

```
VITE_API_URL=https://tu-backend.onrender.com
```

## Estructura

```
src/
├── main.jsx              # Punto de entrada
├── App.jsx               # Estado global, navegación y CRUD
├── styles/styles.css     # Estilos de la aplicación
├── components/
│   ├── Products.jsx      # Tabla de productos
│   ├── Categories.jsx    # Grilla de categorías (filtra productos)
│   └── ProductModal.jsx  # Formulario crear/editar producto
└── services/
    └── api.js            # Cliente fetch de la API
```
