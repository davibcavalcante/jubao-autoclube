const Database = require('../../../config/db-connect-noticias');
const NewsRepository = require('../../../repository/noticias');

class DatabaseNoticiasMiddleware {
    constructor() {
        this.NewsRepository = new NewsRepository();
    }

    // GET METHOD
    async getDatabaseNews(req, res) {
        const db = new Database();

        const limitNews = parseInt(req.query.limit);
        const pageSize = parseInt(req.query.pagesize);
        
        try {
            await db.connect();
            const news = await this.NewsRepository.getNews(db, limitNews, pageSize);
            const totalNews = !isNaN(limitNews) ? await this.NewsRepository.getTotalNews(db) : '';
            res.status(200).json({ message: 'Notícias recebidas do Banco de Dados', news, totalNews });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao obter notícias do Banco de Dados', err });
        } finally {
            db.close();
        }
    }

    async getDatabaseTotalNews(req, res) {
        const db = new Database();
        try {
            await db.connect();
            const results = await this.NewsRepository.getTotalNews(db);
            res.status(200).json({ message: 'Total de notícias recebidas com sucesso!', results });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao obter total de notícias!', err });
        } finally {
            db.close();
        }
    }

    // SEND METHOD
    async sendDatabaseNews(req, res) {
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
    async updateDatabaseNews(req, res) {
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
    async deleteDatabaseNews(req, res) {
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
