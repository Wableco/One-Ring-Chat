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

//Adicionar função para mostrar a seleção de emojis.
function emojiButton(){

}
