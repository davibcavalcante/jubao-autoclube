const statusFiles = () => {
    let files;

    const getFiles = () => {
        return files;
    }

    const setFiles = (newFiles) => {
        files = newFiles;
    }

    return { getFiles, setFiles }
}

const statusFilesManager = statusFiles();

const setMessage = (message) => {    
    const body = document.querySelector('body');
    const messageContainer = document.querySelector('#message-container');
    const messageTitle = document.querySelector('#message');
    messageTitle.innerText = message;

    messageContainer.classList.remove('hidden');
    body.classList.add('low-light');
}

const deleteFile = (e) => {
    const fileElement = e.target.parentNode;
    const fileName = fileElement.id;

    const oldFiles = statusFilesManager.getFiles();
    statusFilesManager.setFiles(oldFiles.filter((file) => file.name !== fileName));

    fileElement.remove();
}

const createFileDiv = (file) => {
    const divElement = document.createElement('div');
    divElement.classList.add('file');
    divElement.id = file.name

    const h1Element = document.createElement('h1');
    h1Element.innerText = file.name;

    const pElement = document.createElement('p');
    pElement.innerText = 'Pronto para ser enviado';

    const buttonElement = document.createElement('button');
    buttonElement.innerText = 'X';
    buttonElement.addEventListener('click', (e) => {
        deleteFile(e);
    });

    divElement.appendChild(h1Element);
    divElement.appendChild(pElement);
    divElement.appendChild(buttonElement);

    return divElement;
}

const sendData = async (filesContainer) => {
    const files = statusFilesManager.getFiles();
    const formData = new FormData();

    files.forEach(file => formData.append('files', file))

    try {
        filesContainer.classList.add('loading');
        filesContainer.innerHTML = `
            <section class="loading-animation"></section>
        `
        const response = await fetch('/api/v1/upload-arquivos', {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar arquivos: ${response.status}`);
        }

        const data = await response.json();
        const message = data.message;
        setMessage(message);
    } catch (error) {
        console.error('Erro ao enviar arquivos:', error);
    }
}

const setEvents = () => {
    const form = document.querySelector('#form');
    const uploadFilesInput = document.querySelector('#upload-files-input');
    const confirmMessageButton = document.querySelector('#confirm-btn');
    const filesContainer = document.querySelector('#files-container');

    uploadFilesInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        statusFilesManager.setFiles(files);

        files.forEach((file) => {
            const div = createFileDiv(file);
            filesContainer.appendChild(div);
        });

        e.target.value = '';
    });

    confirmMessageButton.addEventListener('click', () => {
        window.location.reload();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendData(filesContainer);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setEvents();
});