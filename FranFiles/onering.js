// Eventos que iniciam com o carregar da página 
document.addEventListener("DOMContentLoaded", function () {
    // Obtém o botão pelo ID
    const nextButton = document.getElementById("nextbutton");
    const placeholder = document.getElementById("text");
    
    // Troca o texto do botão para "Connect"
    nextButton.textContent = "Connect";
    // Define o placeholder do campo de entrada
    placeholder.placeholder = "Conecte-se para iniciar o chat";
  
    // Adiciona um evento de clique no botão
    nextButton.addEventListener("click", function () {
      // Restaura o texto do botão para "Next" quando o botão for clicado
      nextButton.textContent = "Next";
    });
  
    // Adiciona um evento de clique no campo de entrada
    nextButton.addEventListener("click", function () {
      // Altera o texto do placeholder para "Diga Olá" quando o botão connect for clicado
      placeholder.placeholder = "Diga Olá!";
    });


  });
  

function send() {
  // Obtém o texto digitado no campo de entrada (text)
  let texto = document.getElementById("text").value;

  // Obtém o campo onde ficará o texto (chatbox)
  let chatbox = document.getElementById("chatbox");

  //Se o texto que foi digitado não estiver vazio, então roda
  if (texto !== "") {
    // Cria um novo elemento de mensagem com o texto digitado
    let newMessage = document.createElement("p"); // Usando "p" para criar um parágrafo
    newMessage.innerText = texto;

    // Adiciona a nova mensagem ao chatbox
    chatbox.appendChild(newMessage);

    // Limpa o campo de entrada após o envio
    document.getElementById("text").value = "";
  }
}

// A variável recebe uma string chamada 'nextRoom' quando o botão "next" for clicado
function next() {
    let nextRoom = 'nextRoom';  // A string 'nextRoom' é atribuída à variável nextRoom
}


document.addEventListener("DOMContentLoaded", function () {
  // Obtendo os elementos pelo ID
  const emojiButton = document.getElementById("emoji-button");
  const emojiBox = document.getElementById("emoji-box");
  const textInput = document.getElementById("text");

  // Verificação de existência dos elementos
  if (!emojiButton || !emojiBox || !textInput) {
      console.error("Um ou mais elementos não foram encontrados no DOM.");
      return;
  }

  // Alternar visibilidade do emojiBox ao clicar no emojiButton
  emojiButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Impede que o clique no botão feche o emojiBox
      emojiBox.classList.toggle("hidden");
  });

  // Fechar o emojiBox ao clicar fora dele
  document.addEventListener("click", () => {
      emojiBox.classList.add("hidden");
  });

  // Evitar que cliques dentro do emojiBox fechem a caixa
  emojiBox.addEventListener("click", (event) => {
      event.stopPropagation(); // Impede o clique na caixa de fechar
  });

  // Adicionar emoji ao campo de texto ao clicar nele
  emojiBox.addEventListener("click", (event) => {
      if (event.target.classList.contains("emoji")) {
          const emoji = event.target.textContent; // Captura o texto do emoji clicado
          textInput.value += emoji; // Adiciona o emoji ao campo de texto
      }
  });
});
