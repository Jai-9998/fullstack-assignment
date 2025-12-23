const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {encrypt, decrypt } = require("../utils/crypto");

// Login controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                aadhaar: decrypt(user.aadhaar),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Profile controller
const getProfile = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        aadhaar: decrypt(req.user.aadhaar),
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, aadhaar } = req.body;

        if (!name || !email || !password || !aadhaar) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedAadhaar = encrypt(aadhaar);

        await User.create({
            name,
            email,
            password: hashedPassword,
            aadhaar: encryptedAadhaar,
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ EXPORT BOTH TOGETHER
module.exports = {
    loginUser,
    getProfile,
    registerUser,
};
