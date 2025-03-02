import mysql.connector
from mysql.connector import Error

DB_CONFIG = {
    "host": "localhost",
    "user": "youruser",
    "password": "yourpassword",
    "database": "dead_drop_db"
}

# 🔌 Connect to Database
def get_db_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error:
        return None
