const downloadFile = async (e) => {
    const fileName = e.target.innerText;

    try {
        const response = await fetch(`/api/v1/download/${fileName}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Error downloading file:', err);
    }
}


const createFiles = (files) => {
    const filesContainer = document.querySelector('#files-list');

    files.forEach((file) => {
        const liElement = document.createElement('li');
        liElement.innerText = file.split('/')[1];

        liElement.addEventListener('click', downloadFile);
        filesContainer.appendChild(liElement);
    });

}

const loadFiles = async () => {
    try {
        const results = await fetch('/api/v1/files');
        const files = await results.json();

        if (!results.ok) {
            throw new Error('Erro ao buscar arquivos');
        }

        createFiles(files);
    } catch (err) {
        console.error('Erro ao baixar os arquivos:', err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadFiles();
})