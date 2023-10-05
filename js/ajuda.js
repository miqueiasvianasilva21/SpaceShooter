var astronauta = document.getElementById("astronauta");
var movimento = document.getElementById("imagem-movimento");
var iniciar = document.getElementById("imagem-iniciar");
var tiro = document.getElementById("imagem-tiro");
var alienigena = document.getElementById("alienigena");
var p_ajuda = document.getElementById("p-ajuda");

// Função para restaurar o estado original
function restaurarEstadoOriginal() {
    astronauta.src = "assets/astronauta-duvida.png";
    alienigena.src = "assets/alienigena.png";
    p_ajuda.innerHTML = "Dúvidas de por onde começar?</br>Passe o mouse sobre as</br>imagens abaixo!";
    p_ajuda.style.left = "600px";
     // Volte à posição original (se necessário)
}

document.addEventListener("DOMContentLoaded", function () {
    iniciar.addEventListener("mouseover", function(){
        astronauta.src = "assets/astronauta-ideia.png";
        alienigena.src = "assets/astronauta-et.png";
        p_ajuda.innerHTML = "Clique (Espaço) para</br> iniciar o game";
        p_ajuda.style.left = "660px";
    });

    iniciar.addEventListener("mouseout", restaurarEstadoOriginal);

    tiro.addEventListener("mouseover", function(){
        astronauta.src = "assets/astronauta-ideia.png";
        alienigena.src = "assets/astronauta-et.png";
        p_ajuda.innerHTML = "Clique (Espaço) para </br>disparar lasers";
        p_ajuda.style.left = "660px";
    });

    tiro.addEventListener("mouseout", restaurarEstadoOriginal);

    movimento.addEventListener("mouseover", function(){
        astronauta.src = "assets/astronauta-ideia.png";
        alienigena.src = "assets/astronauta-et.png";
        p_ajuda.innerHTML = "Clique nas setas para </br>movimentar a nave";
        p_ajuda.style.left = "660px";
    });

    movimento.addEventListener("mouseout", restaurarEstadoOriginal);
});
