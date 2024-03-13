const mysql = require('mysql2');
const config = require('../config.json').database.noticiasExternas;

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database
        });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("Conexão com o banco de dados feita com sucesso!")
                resolve();
            });
        });
    }

    close() {
        this.connection.end();
        console.log("Conexão com o banco de dados fechada com sucesso!")
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results, fields) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }
}

module.exports = Database;
