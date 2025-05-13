import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting format: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Add user info to request object
        req.user = user;
        return next();
    });
    return; // Ensure function always returns
};
