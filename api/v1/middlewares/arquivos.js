const FileRepository = require('../../../repository/arquivos');
const multer = require('multer');

// Configuração do multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class Arquivos {
    constructor() {
        this.filesRepository = new FileRepository();
    }

    async upload(req, res) {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).send({ error: 'Sem arquivos para enviar.' });
        }

        try {
            for (const file of files) {
                const uploadFile = {
                    buffer: file.buffer,
                    destination: `uploads/${file.originalname}`
                };
                await this.filesRepository.upload(uploadFile.buffer, uploadFile.destination);
            }
            res.status(200).send({ message: 'Arquivos enviados com sucesso!' });
        } catch (error) {
            res.status(500).send({ error: 'Falha ao enviar os arquivos!' });
        }
    }

    async download(req, res) {
        const fileName = req.params.fileName;

        try {
            const data = await this.filesRepository.download(`uploads/${fileName}`);
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.send(data[0]);
        } catch (error) {
            res.status(500).send({ error: 'Error downloading file' });
        }
    }

    async getFiles(req, res) {
        try {
            const files = await this.filesRepository.getFiles();
            res.status(200).send(files);
        } catch (error) {
            res.status(500).send({ error: 'Error listing files' });
        }
    }
}

module.exports = new Arquivos();