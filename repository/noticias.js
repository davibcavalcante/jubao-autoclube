class NoticiasRepository {
    // MÉTODOS DO CONTROLADOR => CONTROLLER METHODS

    // GET METHOD
    async getNews(connection, limitNews, pageSize) {
        let query, values;

        if (!isNaN(limitNews) && !isNaN(pageSize)) {
            query = 'SELECT * FROM `noticias` ORDER BY id DESC LIMIT ?, ?'
            values = [limitNews, pageSize]
        } else {
            query = 'SELECT * FROM `noticias` ORDER BY id DESC'
            values = []
        }

        try {
            const result = await connection.query(query, values);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getTotalNews(connection) {
        try {
            const result = await connection.query('SELECT COUNT(*) as total FROM noticias');
            return result;
        } catch (err) {
            throw err;
        }
    }

    // SEND METHOD
    async sendNews(connection, data) {
        console.log(data)
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

module.exports = NoticiasRepository;