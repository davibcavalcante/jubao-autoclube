const FileRepository = require('../../../repository/arquivos');

class Arquivos {
    constructor() {
        this.filesRepository = new FileRepository();
    }

    async upload(req, res) {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Sem arquivos para enviar.' });
        }

        try {
            for (const file of files) {
                const uploadFile = {
                    buffer: file.buffer,
                    destination: `uploads/${file.originalname}`
                };
                await this.filesRepository.upload(uploadFile.buffer, uploadFile.destination);
            }
            res.status(200).json({ message: 'Arquivos enviados com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: 'Falha ao enviar os arquivos!' });
        }
    }

    async download(req, res) {
        const fileName = req.params.fileName;

        try {
            const file = await this.filesRepository.download(`uploads/${fileName}`);

            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Length', file.length);

            res.send(file);
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error);
            res.status(500).send({ error: 'Erro ao baixar o arquivo' });
        }
    }

    async getFiles(req, res) {
        try {
            const files = await this.filesRepository.getFiles();
            res.status(200).json(files);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os arquivos' });
        }
    }
}

module.exports = new Arquivos();