const getParam = (data, method) => {
    if (method === 'user') {
        return { usuario: data };
    } else if (method === 'id') {
        return { id: data };
    }
}

class UsersController {
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

    // SEND METHOD
    async sendNews(connection, data) {
        try {
            const result = await connection.query('INSERT INTO `noticias` SET ?', data);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // UPDATE METHOD
    async updateNews(connection, {newData, searchData}) {
        try {
            const result = await connection.query('UPDATE `noticias` SET ? WHERE ?', [newData, searchData]);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // DELETE METHOD
    async deleteNews(connection, id) {
        try {
            const result = await connection.query('DELETE FROM `noticias` WHERE noticias.id = ?', id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UsersController;