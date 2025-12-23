const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const ivLength = 16;

const getSecretKey = () => {
    const key = process.env.AES_SECRET_KEY;
    if (!key) throw new Error("AES_SECRET_KEY missing in .env");
    return Buffer.from(key, "utf8");
};

const encrypt = (text) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, getSecretKey(), iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (encryptedText) => {
    const [ivHex, encryptedData] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(algorithm, getSecretKey(), iv);

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};

module.exports = { encrypt, decrypt };
