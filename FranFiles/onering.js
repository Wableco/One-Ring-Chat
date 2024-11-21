document.addEventListener("DOMContentLoaded", function () {
  // Obtém elementos do DOM
  const nextButton = document.getElementById("nextbutton");
  const sendButton = document.getElementById("send");
  const textInput = document.getElementById("text");
  const chatbox = document.getElementById("chatbox");
  const emojiButton = document.getElementById("emoji-button");
  const emojiBox = document.getElementById("emoji-box");

  // Lista de cores 
  const colors = ["red", "blue", "purple", "green", "orange", "brown", "cian", "grey21", "MediumBlue", "Teal","DarkOliveGreen", "DarkMagenta", "DeepPink", "Crimson"];

  // Variáveis
  let userName = null;
  let userColor = null; // Cor do usuário (um valor será selecionado a cada novo nome de usuário)

  // Configuração inicial do botão "Next" e placeholder
  nextButton.textContent = "Connect";
  textInput.placeholder = "Conecte-se para iniciar o chat.";

  // Inicialmente, desabilita o campo de texto
  textInput.disabled = true;
  emojiButton.disabled = true; // Desabilita o botão de emoji até o "Next" ser clicado

  // Evento ao clicar no botão "Next" para gerar o nome de usuário e habilitar o campo de texto
  nextButton.addEventListener("click", function () {
    if (!userName) {
      userName = `user${Math.floor(1000 + Math.random() * 9000)}`; // Gera o nome de usuário
      userColor = colors[Math.floor(Math.random() * colors.length)]; // Seleciona uma cor aleatória da lista
      textInput.placeholder = "Diga Olá!";
      nextButton.textContent = "Next";
      textInput.disabled = false; // Habilita o campo de texto após clicar em Next
    }

  });

  // Função para enviar mensagens
  sendButton.addEventListener("click", function () {
    const texto = textInput.value.trim(); // Obtém o texto sem espaços extras

    if (texto) {
      // Cria um novo elemento de mensagem
      const newMessage = document.createElement("p");
      newMessage.innerText = `${userName}: ${texto}`;

      // Altera a cor do texto da mensagem
      newMessage.style.color = userColor;

      // Adiciona a mensagem ao chatbox
      chatbox.appendChild(newMessage);

      // Limpa o campo de texto
      textInput.value = "";
      emojiButton.disabled = false;
    }
  });

  // Alternar visibilidade do emojiBox ao clicar no emojiButton
  emojiButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede que o clique no botão feche o emojiBox
    emojiBox.classList.toggle("hidden");
  });

  // Fechar o emojiBox ao clicar fora dele
  document.addEventListener("click", () => {
    emojiBox.classList.add("hidden");
  });

  // Adicionar emoji ao campo de texto ao clicar nele
  emojiBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("emoji")) {
      const emoji = event.target.textContent; // Captura o texto do emoji clicado
      textInput.value += emoji; // Adiciona o emoji ao campo de texto
    }
  });
});
