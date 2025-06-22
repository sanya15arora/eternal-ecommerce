const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error("Error while verifying token", error);
        res.status(401).json({ message: 'Error while verifying token.' });
    }
}

module.exports = verifyToken;
