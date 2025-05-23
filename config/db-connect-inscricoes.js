const mysql = require('mysql2/promise');
const config = require('../config.json').database.inscricoes;

class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            });
            console.log("Conexão com o banco de dados feita com sucesso!");
        } catch (err) {
            throw new Error("Erro ao conectar ao banco de dados: " + err.message);
        }
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
            console.log("Conexão com o banco de dados fechada com sucesso!");
        }
    }

    async query(sql, values) {
        const [results] = await this.connection.query(sql, values);
        return [results];
    }
}

module.exports = Database;
