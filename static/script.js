// frontend/static/script.js
let currentSide = 1;

document.addEventListener('DOMContentLoaded', function () {
    const yellowPetLabelLeft = document.querySelector('.yellow-pet-label-left');
    yellowPetLabelLeft.addEventListener('click', toggleLabelSide);

    // Ao carregar a página, exibir o conteúdo associado ao "side1"
    updateLabelData();
    // Rotacionar o rótulo com base no lado inicial
    rotateLabel();
});

function toggleLabelSide() {
    // Alternar entre os lados
    currentSide = (currentSide === 1) ? 2 : 1;

    // Atualizar os dados do rótulo com base no lado atual
    updateLabelData();

    // Girar o rótulo
    rotateLabel();
}

function updateLabelData() {
    if (currentSide === 1) {
        // Exibir o conteúdo associado ao "side1"
        document.getElementById('side1').style.display = 'block';
        document.getElementById('side2').style.display = 'none';
        
        // Atualizar dados do Lado 1 (Foto e Nome)
        const petName = document.getElementById('pet-name-side1');
        // Atualize petName com os dados relevantes
        petName.textContent = "Nome do Pet Lado 1"; // Substitua pelo dado real
    } else {
        // Exibir o conteúdo associado ao "side2"
        document.getElementById('side1').style.display = 'none';
        document.getElementById('side2').style.display = 'block';

        // Atualizar dados do Lado 2 (Detalhes do Pet)
        const petNameSide2 = document.getElementById('pet-name-side2');
        // Atualize petNameSide2 com os dados relevantes
        petNameSide2.textContent = "Nome do Pet Lado 2"; // Substitua pelo dado real
    }
}

function performLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Fazer a solicitação HTTP para a rota de login
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email: email,
            Senha: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Manipular a resposta do servidor
        if (data.access_token) {
            // Login bem-sucedido, redirecionar ou exibir mensagem
            
console.log('Login bem-sucedido:', data);
            
            // Salvar o token de autenticação no local storage
            localStorage.setItem('access_token', data.access_token);
   
// Redirecionar para a página principal ou fazer outras ações necessárias
            redirectToMain();
        } else {
            // Login falhou, exibir mensagem de erro
            console.error('Falha no login:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // Manipular outros erros, se necessário
    });
}

function performRegistration(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Fazer a solicitação HTTP para a rota de registro
    fetch('/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Nome: nome,
            Email: email,
            Senha: senha,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Manipular a resposta do servidor
        if (data.ID) {
            // Registro bem-sucedido, redirecionar para a tela de login
            console.log('Registro bem-sucedido:', data);
            redirectToLogin();
        } else {
            // Registro falhou, exibir mensagem de erro
            console.error('Falha no registro:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // Manipular outros erros, se necessário
    });
}

function createUserPet(user_id, petData) {
    // Fazer a solicitação HTTP para a rota de criar pet para usuário
    fetch(`/api/users/${user_id}/create-pet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,  // Adicione o token de autenticação, se necessário
        },
        body: JSON.stringify(petData),
    })
    .then(response => response.json())
    .then(data => {
        // Manipular a resposta do servidor
        if (data.ID) {
            // Pet criado com sucesso, faça o que for necessário
            console.log('Pet criado com sucesso:', data);
        } else {
            // Falha ao criar o pet, exibir mensagem de erro
            console.error('Erro ao criar pet:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // Manipular outros erros, se necessário
    });
}

function redirectToLogin() {
    window.location.href = '/login';  // Atualizado para a rota correta
}

function redirectToMain() {
    window.location.href = '/main';  // Atualize para a rota principal ou página inicial
}

// Função auxiliar para obter o token de autenticação do local storage
function getToken() {
    // Retorna o token de autenticação do local storage
    return localStorage.getItem('access_token');
}

function redirectToCadastro() {
    window.location.href = '/cadastro';
}

document.addEventListener('DOMContentLoaded', function () {
    const yellowLabelLeft = document.querySelector('.yellow-label-left');
    yellowLabelLeft.addEventListener('click', openPopup);
});

function openPopup() {
    // Criar o pop-up (novo label amarelo)
    const popup = document.createElement('div');
    popup.className = 'yellow-popup';

    // Adicionar a imagem "FotoPet.png" na parte superior do pop-up
    const popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header';

    // Adicionar o botão de fechar à direita
    const closeButton = document.createElement('div');
    closeButton.className = 'popup-close-button';
    closeButton.addEventListener('click', closePopup);
    popupHeader.appendChild(closeButton);

    const headerImage = document.createElement('img');
    headerImage.src = 'static/Img/FotoPet.png'; // Caminho relativo direto
    headerImage.alt = 'Foto do Pet';
    popupHeader.appendChild(headerImage);
    popup.appendChild(popupHeader);

    // Adicionar os textos e campos para preenchimento
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    const textLabels = ['Nome', 'Raça', 'Peso', 'Idade', 'Data de Nasc.', 'Cor'];

    textLabels.forEach(label => {
        const labelText = document.createElement('div');
        labelText.textContent = label;
        popupContent.appendChild(labelText);

        const inputField = document.createElement('input');
        inputField.type = 'text';
        // Adicione classes, IDs ou outros atributos conforme necessário
        popupContent.appendChild(inputField);
    });

    popup.appendChild(popupContent);

    // Adicionar o botão "Salvar" abaixo da última caixa de texto
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar';
    saveButton.className = 'popup-save-button';
    saveButton.addEventListener('click', saveData); // Adicione a função de salvar dados
    popupContent.appendChild(saveButton);

    // Adicionar o pop-up à página
    document.body.appendChild(popup);
}

function closePopup() {
    // Implemente a lógica para fechar o pop-up aqui
    const popup = document.querySelector('.yellow-popup');
    document.body.removeChild(popup);
}

function saveData() {
    // Implemente a lógica para salvar os dados conforme necessário
    console.log('Dados salvos!');
    closePopup(); // Feche o pop-up após salvar os dados, se desejado
}
