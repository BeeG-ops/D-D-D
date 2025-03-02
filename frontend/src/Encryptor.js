import CryptoJS from "crypto-js";

const SECRET_KEY = "supersecurekey"; // Use a securely shared key

// 🔐 Encrypt message before sending
export function encryptMessage(plainText) {
    const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
    const hmac = CryptoJS.HmacSHA256(encrypted, SECRET_KEY).toString();
    return { encrypted_data: encrypted, hmac_signature: hmac };
}

// 🔓 Decrypt received message
export function decryptMessage(encryptedText) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return "Decryption Failed";
    }
}