from flask import jsonify, request, abort
from app.Models import Producto, Categoria, db


# ============================================================
# LISTAR PRODUCTOS
# ============================================================
def product_list():

    productos = db.session.execute(
        db.select(Producto)
    ).scalars().all()

    return jsonify([
        producto.to_dict()
        for producto in productos
    ]), 200


# ============================================================
# DETALLE DE PRODUCTO
# ============================================================
def product_detail(producto_id):

    producto = db.session.get(
        Producto,
        producto_id
    )

    if not producto:
        abort(
            404,
            description="Producto no encontrado"
        )

    return jsonify(
        producto.to_dict()
    ), 200


# ============================================================
# CREAR PRODUCTO
# ============================================================
def product_add():

    data = request.get_json()

    if not data:
        abort(
            400,
            description="No se recibió información en formato JSON"
        )

    required_fields = [
        "nombre",
        "precio",
        "categoria_id"
    ]

    for field in required_fields:

        if field not in data:
            abort(
                400,
                description=f"Falta el campo obligatorio: {field}"
            )

    # --------------------------------------------------------
    # Validar precio
    # --------------------------------------------------------

    if (
        not isinstance(data["precio"], (int, float))
        or data["precio"] <= 0
    ):
        abort(
            422,
            description="El precio debe ser un número mayor a cero"
        )

    # --------------------------------------------------------
    # Verificar categoría
    # --------------------------------------------------------

    categoria = db.session.get(
        Categoria,
        data["categoria_id"]
    )

    if not categoria:
        abort(
            400,
            description="La categoría no existe"
        )

    # --------------------------------------------------------
    # Crear producto
    # --------------------------------------------------------

    nuevo_producto = Producto(
        nombre=data["nombre"],
        descripcion=data.get("descripcion"),
        precio=data["precio"],
        categoria_id=data["categoria_id"],
        disponible=data.get("disponible", True),
        stock_min=data.get("stock_min")
    )

    db.session.add(nuevo_producto)
    db.session.commit()

    return jsonify(
        nuevo_producto.to_dict()
    ), 201


# ============================================================
# ACTUALIZAR PRODUCTO
# ============================================================
def product_update(producto_id):

    data = request.get_json()

    if not data:
        abort(
            400,
            description="No se recibió información en formato JSON"
        )

    producto = db.session.get(
        Producto,
        producto_id
    )

    if not producto:
        abort(
            404,
            description="Producto no encontrado"
        )

    # --------------------------------------------------------
    # Validar precio
    # --------------------------------------------------------

    if "precio" in data:

        if (
            not isinstance(data["precio"], (int, float))
            or data["precio"] <= 0
        ):
            abort(
                422,
                description="El precio debe ser mayor a cero"
            )

        producto.precio = data["precio"]

    # --------------------------------------------------------
    # Actualizar nombre
    # --------------------------------------------------------

    if "nombre" in data:
        producto.nombre = data["nombre"]

    # --------------------------------------------------------
    # Actualizar descripción
    # --------------------------------------------------------

    if "descripcion" in data:
        producto.descripcion = data["descripcion"]

    # --------------------------------------------------------
    # Actualizar disponibilidad
    # --------------------------------------------------------

    if "disponible" in data:
        producto.disponible = data["disponible"]

    # --------------------------------------------------------
    # Actualizar stock mínimo
    # --------------------------------------------------------

    if "stock_min" in data:
        producto.stock_min = data["stock_min"]

    # --------------------------------------------------------
    # Actualizar categoría
    # --------------------------------------------------------

    if "categoria_id" in data:

        categoria = db.session.get(
            Categoria,
            data["categoria_id"]
        )

        if not categoria:
            abort(
                400,
                description="La categoría no existe"
            )

        producto.categoria_id = data["categoria_id"]

    # --------------------------------------------------------
    # Guardar cambios
    # --------------------------------------------------------

    db.session.commit()

    return jsonify(
        producto.to_dict()
    ), 200


# ============================================================
# ELIMINAR PRODUCTO
# ============================================================
def product_delete(producto_id):

    producto = db.session.get(
        Producto,
        producto_id
    )

    if not producto:
        abort(
            404,
            description="Producto no encontrado"
        )

    db.session.delete(producto)
    db.session.commit()

    return jsonify({
        "mensaje": "Producto eliminado exitosamente"
    }), 200