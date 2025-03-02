from datetime import datetime, timedelta
import hmac
import hashlib
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecurekey")

# 🕒 Set Expiry (Auto-delete messages)
def get_expiry(hours=6):
    return datetime.utcnow() + timedelta(hours=hours)

# 🔐 Verify HMAC (Tamper-proof Messages)
def verify_hmac(message: str, received_hmac: str) -> bool:
    computed_hmac = hmac.new(SECRET_KEY.encode(), message.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed_hmac, received_hmac)
