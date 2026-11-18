import os
from urllib.parse import quote_plus


class Config:
    # En local usa los valores por defecto (XAMPP);
    # en producción se leen desde las variables de entorno del hosting
    USER = os.environ.get("MYSQL_USER", "root")
    PASSWORD = os.environ.get("MYSQL_PASSWORD", "")
    HOST = os.environ.get("MYSQL_HOST", "localhost")
    PORT = os.environ.get("MYSQL_PORT", "3306")
    DATABASE = os.environ.get("MYSQL_DATABASE", "productos")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{USER}:{quote_plus(PASSWORD)}"
        f"@{HOST}:{PORT}/{DATABASE}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
