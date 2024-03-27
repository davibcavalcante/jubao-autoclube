const getParam = (data, method) => {
    if (method === 'user') {
        return { usuario: data };
    } else if (method === 'id') {
        return { id: data };
    }
}

class UsersRepository {
    // MÉTODOS DO CONTROLADOR => CONTROLLER METHODS

    // GET METHOD
    async getUser(connection, data, method) {
        const param = getParam(data, method);

        try {
            const results = await connection.query('SELECT * FROM `usuarios` WHERE ?', param);
            return results;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UsersRepository;