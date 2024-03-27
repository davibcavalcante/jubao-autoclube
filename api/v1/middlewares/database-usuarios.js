const Database = require('../../../config/db-connect-usuarios');
const UsersController = require('../../../repository/usuarios');
const config = require('../../../config.json')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const openUserSession = (id, user) => {
    try {
        const token = jwt.sign({id, user}, config.secret, { expiresIn: 86400 })

        return token
    } catch (err) {
        const error = new Error('Erro interno do servidor, tente novamente mais tarde!');
        error.statusCode = 500;
        throw error
    }
}

const checkLogin = async (user, pass, hash) => {
    if (user.length > 0) {
        const checkPassword = await bcrypt.compare(pass, hash);
        if (checkPassword) {
            return true;
        } else {
            const error = new Error('Usuário ou senha incorreto!');
            error.statusCode = 401;
            throw error;
        }
    } else {
        const error = new Error('Esse usuário não existe ou não foi encontrado!');
        error.statusCode = 404;
        throw error;
    }
}

class DatabaseUsuariosMiddlewares {
    constructor() {
        this.usersController = new UsersController();
    }

    async userLogin(req, res) {
        const data = req.body;
        const db = new Database();

        try {
            await db.connect();
            const userData = await this.usersController.getUser(db, data.user, 'user');

            const user = userData.length > 0 ? {
                name: await userData[0].usuario,
                hash: await userData[0].senha,
                senha: data.pass
            } : {};

            const { id, usuario } = userData.length > 0 ? userData[0] : {}

            await checkLogin(userData, user.senha, user.hash);

            const token = openUserSession(id, usuario);

            res.cookie('userToken', token);
            console.log('Usuário logado com sucesso!')
            res.status(200).json({ message: `Usuário ${user.name} logado com sucesso!`, user: {id, usuario}});
        } catch (err) {
            const statusCode = err.statusCode || 500;
            const message = err.message || 'Erro ao fazer login!';
            console.log(message)
            res.status(statusCode).json({ message, error: err });
        } finally {
            db.close();
        }
    }
}

module.exports = new DatabaseUsuariosMiddlewares();