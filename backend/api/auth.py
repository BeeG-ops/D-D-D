import secrets
from fastapi import HTTPException

# 🔑 Generate Anonymous Authentication Token
def generate_anon_token():
    return secrets.token_hex(16)  # 32-character hex token

# 🛡️ Verify Token (Ensures Stateless Anonymity)
def verify_token(token: str):
    if not token or len(token) != 32:
        raise HTTPException(status_code=403, detail="Invalid Authentication Token")
    return True
