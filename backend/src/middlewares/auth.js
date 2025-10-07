const { verify } = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET; 

const protect = (req, res, next) => {
    const fail = { error: 'No autorizado, token fallido' };
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verify(token, SECRET);
            req.userId = decoded.id; 
            
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json(fail);
        }
    }

    if (!token) {
        return res.status(401).json(fail);
    }
};

module.exports = { protect };