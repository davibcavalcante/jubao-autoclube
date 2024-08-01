const admin = require('firebase-admin');
const Firebase = require('../config/firebase');

const firebase = new Firebase();
firebase.connect();

const bucket = admin.storage().bucket();

class FileRepository {

    async upload(fileBuffer, destination) {
        const file = bucket.file(destination);
        const stream = file.createWriteStream({
            metadata: {
                contentType: file.mimetype,
                cacheControl: 'public, max-age=31536000',
            }
        });

        return new Promise((resolve, reject) => {
            stream.on('error', (err) => {
                console.error('Erro ao enviar o arquivo:', err);
                reject(err);
            });

            stream.on('finish', () => {
                console.log(`${destination} enviado com sucesso.`);
                resolve();
            });

            stream.end(fileBuffer);
        });
    }

    async download(fileName) {
        const file = bucket.file(fileName);
        const [buffer] = await file.download();
        return buffer;
    }

    async getFiles() {
        const [files] = await bucket.getFiles();
        return files.map(file => file.name);
    }
}

module.exports = FileRepository;