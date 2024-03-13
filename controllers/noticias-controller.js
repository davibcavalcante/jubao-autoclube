class NoticiasController {
    // MÉTODOS DO CONTROLADOR
    async getNews(connection) {
        try {
            const results = await connection.query('SELECT * FROM `noticias` WHERE 1');
            return results;
        } catch (error) {
            throw error;
        }
    }

    async sendNews(connection, data) {
        try {
            const result = await connection.query('INSERT INTO `noticias` SET ?', data);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NoticiasController;