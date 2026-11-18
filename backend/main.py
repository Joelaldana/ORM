import os

from flask import Flask, jsonify
from flask_cors import CORS
from flasgger import Swagger

from app.Models import db, Producto, Categoria, Entrada
from app.Cammon import error_bp
from app.Cammon.config import Config
from app.Controller import productos_bp, categoria_bp, entrada_bp

# Crear aplicación 
app = Flask(__name__) 

# Configuración 
app.config.from_object(Config)

CORS(app)
swagger = Swagger(app) 
db.init_app(app) 

# Crear tablas automáticamente 
with app.app_context():     
    db.create_all()

# Ruta raíz 
@app.route("/", methods=["GET"]) 
def home():

    """
     Ruta de prueba para verificar que la API esté 
     funcionando
    """  
    return jsonify({"mensaje": "API funcionando correctamente"}), 200
# Registrar blueprints 
app.register_blueprint(error_bp) 
app.register_blueprint(productos_bp) 
app.register_blueprint(categoria_bp) 
app.register_blueprint(entrada_bp)

if __name__ == "__main__":    
    # Puerto: en producción lo asigna el hosting (Render, Railway, etc.)
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug)