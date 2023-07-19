const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const asyncHandeler = require('express-async-handler')

const registerUser = asyncHandeler(async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validate input data
        // ...

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ username, password: hashedPassword, email });

        // Save the user to the database
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        const user = {
            newUser: {
                username: newUser.username,
                email: newUser.email,
                admin: newUser.admin,
                _id: newUser._id,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                __v: newUser.__v
            },
            token
        };
        res.json({ user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const loginUser = asyncHandeler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });


        const loguser = {
            newUser: {
                username: user.username,
                email: user.email,
                admin: user.admin,
                _id: user._id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                __v: user.__v
            },
            token
        };
        res.json({ loguser });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    registerUser,
    loginUser
}