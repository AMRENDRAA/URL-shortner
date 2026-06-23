// 1. read header
// 2. validate format ("Bearer <token>")
// 3. extract token
// 4. verify token
// 5. attach user + next()

// HEADER → VALIDATE → SPLIT → VERIFY → ATTACH → NEXT

const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    //get header 
    const authHeader = req.headers.authorization;
    // check if authheader is missing. 
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            status: "Failed",
            message: "No token provided "
        })
    }

    //Extract token 
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            status: "Failed",
            message: err.message
        })
    }
}

module.exports = { authMiddleware };
