const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

module.exports.authorizeUser = async (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            if (req.baseUrl === '/admin') return res.redirect('/login')
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err && req.baseUrl === '/admin') {
                    return res.redirect('/login')
                }
                req.userId = decoded.id;
            });
            console.log('Autenticado com sucesso!');
            next();
        }
    } catch (err) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Erro ao fazer login!';
        res.status(statusCode).json({ message, error: err });
    }
}