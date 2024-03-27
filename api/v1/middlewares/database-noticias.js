const Database = require('../../../config/db-connect-noticias');
const NewsRepository = require('../../../repository/noticias');

class DatabaseNoticiasMiddleware {
    constructor() {
        this.NewsRepository = new NewsRepository();
    }

    // GET METHOD
    async getDatabaseData(req, res) {
        const db = new Database();
        try {
            await db.connect();
            const results = await this.NewsRepository.getNews(db);
            res.status(200).json({ message: 'Notícias recebidas do Banco de Dados', results });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao obter notícias do Banco de Dados', err });
        } finally {
            db.close();
        }
    }

    // SEND METHOD
    async sendDatabaseData(req, res) {
        const db = new Database();
        try {
            await db.connect();
            await this.NewsRepository.sendNews(db, req);
            res.status(200).json({ message: 'Notícia enviada ao Banco de dados'})
        } catch (err) {
            res.status(500).json({ message: 'Erro ao enviar notícia ao Banco de Dados', err });
        } finally {
            db.close();
        }
    }

    // UPDATE METHOD
    async updateDatabaseData(req, res) {
        const db = new Database();
        const newData = req.newData;
        const searchData = req.searchData;
        try {
            await db.connect();
            await this.NewsRepository.updateNews(db, {newData, searchData});
            res.status(200).json({ message: "Notícia alterada com sucesso!"});
        } catch (err) {
            res.status(500).json({ message: "Erro ao alterar dados do Banco de Dados!", err});
        } finally {
            db.close();
        }
    }


    // DELETE METHOD
    async deleteDatabaseData(req, res) {
        const db = new Database();
        const id = req.params.id;
        try {
            await db.connect();
            await this.NewsRepository.deleteNews(db, id);
            res.status(200).json({ message: 'Notícia excluída com sucesso!' });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao excluir notícia!', err })
        } finally {
            db.close();
        }
    }

    // OTHER METHODS
}

module.exports = new DatabaseNoticiasMiddleware();
