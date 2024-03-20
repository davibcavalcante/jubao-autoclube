const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

module.exports.authorizeUser = async (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            const error = new Error('Usuário ou senha incorreto!');
            error.statusCode = 401;
            throw error;
        } else {
            jwt.verify(token, config.secret);
            console.log('Autenticado com sucesso!');
            next();
        }
    } catch (err) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Erro ao fazer login!';
        res.status(statusCode).json({ message, error: err });
    }
}