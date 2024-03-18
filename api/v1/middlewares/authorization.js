const Database = require('../../../config/db-connect-usuarios');
const UsersAuthController = require('../../../controllers/usuarios-controller');
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

module.exports.authorizeUser = async (req, res, next) => {
    const db = new Database();
    const usersAuthController = new UsersAuthController();
    const id = req.params.id;

    try {
        await db.connect();
        const userExist = await usersAuthController.getUser(db, id, 'id');

        if (userExist.length < 1) {
            const error = new Error('Esse usuário não existe ou não foi encontrado!');
            error.statusCode = 404;
            throw error;
        } else {
            // const token = req.headers['authorization'].split(' ')[1];
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
        }
    } catch (err) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Erro ao fazer login!';
        res.status(statusCode).json({ message, error: err });
    } finally {
        db.close();
    }
}