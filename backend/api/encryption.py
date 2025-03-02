from cryptography.fernet import Fernet
import os

# 🔑 Generate a secure encryption key (Run once)
def generate_key():
    return Fernet.generate_key()

# Load encryption key from environment (Prevent Hardcoding)
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", generate_key())

# 🛡️ Encrypt Message
def encrypt_message(plaintext: str) -> str:
    cipher = Fernet(ENCRYPTION_KEY)
    return cipher.encrypt(plaintext.encode()).decode()

# 🔓 Decrypt Message
def decrypt_message(ciphertext: str) -> str:
    cipher = Fernet(ENCRYPTION_KEY)
    return cipher.decrypt(ciphertext.encode()).decode()
