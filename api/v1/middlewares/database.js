const Database = require('../../../config/db-connect');
const UserController = require('../../../controllers/noticias-controller');

class DatabaseMiddleware {
    constructor() {
        this.userController = new UserController();
    }

    // GET DATA METHOD

    async getDatabaseData(req, res) {
        const db = new Database();
        try {
            await db.connect();
            const results = await this.userController.getNews(db);
            res.status(200).json({ message: 'Dados recebidos do Banco de Dados', results });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao obter dados do Banco de Dados', err });
        } finally {
            db.close();
        }
    }

    // SEND DATA METHOD

    async sendDatabaseData(req, res) {
        const db = new Database();
        try {
            await db.connect();
            const results = await this.userController.sendNews(db, req);
            res.status(200).json({ message: 'Dados enviados ao Banco de dados', results })
        } catch (err) {
            res.status(500).json({ message: 'Erro ao enviar dados ao Banco de Dados' });
        } finally {
            db.close();
        }
    }

    // OTHER METHODS
}

module.exports = new DatabaseMiddleware();
