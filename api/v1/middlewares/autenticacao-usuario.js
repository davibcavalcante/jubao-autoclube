const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

module.exports.authorizeUser = async (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            res.redirect('/login')
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) return res.status(401).json({ message: 'Não autorizado'});
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