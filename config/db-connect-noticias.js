const mysql = require('mysql2');
const config = require('../config.json').database.noticiasExternas;

// DATABASE CLASS
class Database {
    constructor() {
        // CONNECTION DATA
        this.connection = mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database
        });
    }

    // CONNECTION METHOD
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

    // CLOSING METHOD
    close() {
        this.connection.end();
        console.log("Conexão com o banco de dados fechada com sucesso!")
    }

    // QUERY METHOD
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
