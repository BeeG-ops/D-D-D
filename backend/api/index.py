from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import base64
import os
import hmac
import hashlib
from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import Error

# Configurations
SECRET_KEY = os.getenv("SECRET_KEY", "supersecurekey")
DB_CONFIG = {
    "host": "localhost",
    "user": "youruser",
    "password": "yourpassword",
    "database": "dead_drop_db"
}

# FastAPI Instance
app = FastAPI()

# Database Connection
def get_db_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error:
        raise HTTPException(status_code=500, detail="Database Connection Failed")

# Message Model
class Message(BaseModel):
    encrypted_data: str
    hmac_signature: str

# 🔐 HMAC Verification (Anti-Tamper)
def verify_hmac(message: str, received_hmac: str) -> bool:
    computed_hmac = hmac.new(SECRET_KEY.encode(), message.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed_hmac, received_hmac)

# 📩 Store Encrypted Message (Self-Destruct After Read)
@app.post("/store")
def store_message(data: Message):
    if not verify_hmac(data.encrypted_data, data.hmac_signature):
        raise HTTPException(status_code=403, detail="HMAC Verification Failed")

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        expiry = datetime.utcnow() + timedelta(hours=6)  # Auto-delete in 6 hours
        cursor.execute("INSERT INTO messages (encrypted_data, expiry) VALUES (%s, %s)", (data.encrypted_data, expiry))
        conn.commit()
        return {"message": "Stored successfully"}
    finally:
        cursor.close()
        conn.close()

# 📤 Retrieve & Auto-Delete Message
@app.get("/retrieve/{message_id}")
def retrieve_message(message_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT encrypted_data FROM messages WHERE id = %s", (message_id,))
        record = cursor.fetchone()
        if not record:
            raise HTTPException(status_code=404, detail="Message not found")

        cursor.execute("DELETE FROM messages WHERE id = %s", (message_id,))
        conn.commit()
        return {"encrypted_data": record["encrypted_data"]}
    finally:
        cursor.close()
        conn.close()
