import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'test123';
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1. Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // 2. Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // 3. Create and return JWT
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log('Generated token:', token);
        return res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
    // TODO: If the user exists and the password is correct, return a JWT token
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
