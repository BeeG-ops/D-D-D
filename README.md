# 🕵️‍♂️ Digital Dead Drop - Anonymous Encrypted Messaging

**Digital Dead Drop** is a highly secure, anonymous messaging platform designed for darknet-level privacy. Messages are encrypted client-side, stored with integrity verification, and self-destruct after reading.

## 🚀 Features
✔ **End-to-End AES-256 Encryption** (Client & Server-side)  
✔ **Anonymous Authentication** (No accounts, no tracking)  
✔ **Self-Destructing Messages** (Auto-delete after read/expiry)  
✔ **Tamper-Proof HMAC-SHA256 Message Integrity**  
✔ **Serverless Deployment on Vercel**  

---

## 📂 File Structure
my-darknet-app/
│
├── backend/              
│   ├── api/              
│   │   ├── index.py      # Main API (FastAPI)
│   │   ├── encryption.py # Server-side crypto functions
│   │   ├── auth.py       # Ephemeral authentication
│   │   ├── db.py         # Database operations
│   │   ├── utils.py      # Misc helper functions
│   ├── requirements.txt  # Dependencies
│   ├── vercel.json       # Backend config
│
├── frontend/             
│   ├── public/           
│   ├── src/              
│   │   ├── App.js        # Main React component
│   │   ├── Encryptor.js  # Client-side AES encryption
│   │   ├── API.js        # API requests
│   │   ├── styles.css    # Styling
│   ├── package.json      
│   ├── next.config.js    
│   ├── vercel.json       
│
├── .gitignore            
└── README.md             

---

## 🛠️ **Installation & Setup**

### 🔹 **1. Backend Setup**
1. **Clone the repository:**
   ```sh
   git clone https://github.com/BeeG-ops/D-D-D.git
   cd 
