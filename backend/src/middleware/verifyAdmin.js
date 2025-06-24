const verifyAdmin = async (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).send({ success: false, message: 'Access denied. Only Admins are authorized.' });
    }
    next();
}

module.exports = verifyAdmin;