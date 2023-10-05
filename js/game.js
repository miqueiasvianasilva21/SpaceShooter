(function () {
  const TAMX = 600;
  const TAMY = 800;
  const FPS = 100;
  const PROB_ENEMY_SHIP = 0.3;
  const PROB_ASTEROIDE_GRANDE = 0.2;
  const PROB_ASTEROIDE_PEQUENO = 0.2;
  const PROB_DISCO = 0.2;

  let space, ship;
  let enemies = [];
  let tiros = [];
  let asteroidesG = [];
  let asteroidesP = [];
  let discos = [];
  let time = 0;
  let time_atual = 0;
  let playerDamaged = false;
  let playerMove = true;
  let velocidadeInimigo = 1;
  let minutos = 1;
  let velocidade_aleatoria = 0;
  let iniciou = false;
  let jogar = false;
  let interval = 0;
  let vida = 4;
  let travaMovimento = false;
  let pontos = 0;
  
  
  function init() {
    space = new Space();
    ship = new Ship();
    space.element.classList.add("movimento-fundo");
  }
  // Dentro da função init(), após a criação da instância "space":
  // space.element.classList.add("movimento-fundo");


  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && travaMovimento===false )  ship.mudaDirecao(-1);
    else if (e.key === "ArrowRight" && travaMovimento===false) ship.mudaDirecao(+1);
  });

  window.addEventListener("keydown", (e) => {
    if(e.keyCode == 32 && iniciou===true && travaMovimento===false) tiros.push(new Tiro());
  });

  window.addEventListener("keydown", (e) => {
    if(e.keyCode == 80 && travaMovimento===false )  {travaMovimento = true;
    clearInterval(interval);}
    else if(e.keyCode==80 && travaMovimento===true){
      travaMovimento = false;
     interval = window.setInterval(run,1000/FPS);
    }
  });
  
 // Dentro do evento de tecla para iniciar o jogo:
// Adicione isso à função init() para ocultar o texto quando o jogo começa
window.addEventListener("keydown", function iniciar(e) {
  if (e.keyCode == 32 && iniciou === false) {
    space.element.classList.remove("movimento-fundo");
    iniciou = true;
    interval = window.setInterval(run, 1000 / FPS);
    
    // Ocultar o texto quando o jogo começa
    const startText = document.getElementById("start-text");
    startText.style.display = "none";
  }
});



class Space {
  constructor() {
    this.element = document.getElementById("space");
    this.element.style.width = `${TAMX}px`;
    this.element.style.height = `${TAMY}px`;
    this.element.style.backgroundPositionY = "0px"; // Inicialmente, comece em 0px na posição vertical
  }

  move() {
    this.element.style.backgroundPositionY = `${
      parseInt(this.element.style.backgroundPositionY) + 1
    }px`;
  }
}


  class Ship {
    constructor() {
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "assets/playerLeft.png",
        "assets/player.png",
        "assets/playerRight.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.bottom = "20px";
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`;
    }
    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.src = this.AssetsDirecoes[this.direcao];
      }
    }
    move() {
      if (this.direcao === 0 && this.element.offsetLeft>0)
        this.element.style.left = `${parseInt(this.element.style.left) - 1}px`;
      if (this.direcao === 2 && this.element.offsetLeft<500)
        this.element.style.left = `${parseInt(this.element.style.left) + 1}px`;
     
    }
    
  }

  class EnemyShip {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "enemy-ship";
      this.element.src = "assets/enemyShip.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
      this.velocidade = velocidade_aleatoria;
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + this.velocidade+velocidadeInimigo}px`;
    }
    
  }
  class AsteroideGrande {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "asteroideG";
      this.element.src = "assets/meteorBig.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
      this.velocidade = velocidade_aleatoria;
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + this.velocidade+velocidadeInimigo}px`;
    }
    
  }

  class AsteroidePequeno {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "asteroideP";
      this.element.src = "assets/meteorSmall.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
      this.velocidade = velocidade_aleatoria;
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + this.velocidade+velocidadeInimigo}px`;
    }
  }

  class DiscoVoador {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "disco-voador";
      this.element.src = "assets/enemyUFO.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
      this.velocidade = velocidade_aleatoria;
    }
    move() {
      this.element.style.top = `${parseInt(this.element.style.top) + this.velocidade+velocidadeInimigo}px`;
    }
  }
  
  class Tiro{
   constructor(){
   this.element = document.createElement("img");
   this.element.className = "tiro";
   this.element.src = "assets/laserRed.png";
   this.element.style.bottom = `${parseInt(ship.element.style.bottom) + 70}px`;
   this.element.style.left = `${parseInt(ship.element.style.left) + 45}px`;
   space.element.appendChild(this.element);
  }
  move() {
    this.element.style.bottom = `${parseInt(this.element.style.bottom) + 2}px`;
  }
}

function controlaVida(){
  if(vida===0){
    travaMovimento = true;
    clearInterval(interval);
    let gameOver = document.createElement("h1");
    let reiniciar = document.createElement("button");
    reiniciar.innerHTML = "REINICIAR";
    reiniciar.className = "reiniciar";
    reiniciar.id = "reiniciar";
    gameOver.innerHTML = "GAME OVER";
    gameOver.className = "game-over";
    space.element.appendChild(gameOver);
    space.element.appendChild(reiniciar);
    document.getElementById("reiniciar").onclick = function(){
      window.location.reload(true);
    }
  }
}

function controleTiros(){
  let tiros = document.getElementsByClassName("tiro");
  let tam = tiros.length;
  for(let i=0;i<tam;i++){
    if(tiros[i]){
      let a = parseInt(tiros[i].style.bottom);
      colisaoTiroNave(tiros[i]);
      colisaoTiroAsteroideGrande(tiros[i]);
      colisaoTiroAsteroidePequeno(tiros[i]);
      colisaoTiroDisco(tiros[i]);
      if(a>=800){
        space.element.removeChild(tiros[i]);
      }
    }
  }
}

function controlaNavesInimigas(){
  let naves = document.getElementsByClassName("enemy-ship");
  let tam = naves.length;
  for(let i=0;i<tam;i++){
    if(naves[i]){
      let a = parseInt(naves[i].style.top);
      
      if(a>=800){
        space.element.removeChild(naves[i]);
      }
    }
  }
}

function controlaAsteroidesG(){
  let asteroidesG = document.getElementsByClassName("asteroideG");
  let tam = asteroidesG.length;
  for(let i=0;i<tam;i++){
    if(asteroidesG[i]){
      let a = parseInt(asteroidesG[i].style.top);
      if(a>=800){
        space.element.removeChild(asteroidesG[i]);
      }
    }
  }
}
function controlaAsteroidesP(){
  let asteroidesG = document.getElementsByClassName("asteroideG");
  let tam = asteroidesG.length;
  for(let i=0;i<tam;i++){
    if(asteroidesG[i]){
      let a = parseInt(asteroidesG[i].style.top);
      if(a>=800){
        space.element.removeChild(asteroidesG[i]);
      }
    }
  }
}



function colisaoTiroNave(tiro){
  let naves = document.getElementsByClassName("enemy-ship");
  let tam = naves.length;
  for(let i=0;i<tam;i++){
    if(naves[i] ){
      if((tiro.offsetTop<=naves[i].offsetTop+50) && (tiro.offsetTop+33>=naves[i].offsetTop)
      &&(tiro.offsetLeft<=naves[i].offsetLeft+98)&&(tiro.offsetLeft+9>=naves[i].offsetLeft)){
        space.element.removeChild(naves[i]);
        space.element.removeChild(tiro);
        let pontuacao = document.getElementById("pontuacao");
        pontos = pontos +50;
        space.element.removeChild(pontuacao);
        let pontu = document.createElement("h1");
        pontu.className = "pontuacao";
        pontu.id = "pontuacao";
        pontu.innerHTML = `${pontos}`;
        space.element.appendChild(pontu);
      }
    }
   } 
}

function colisaoTiroAsteroideGrande(tiro){
  let asteroidesGR = document.getElementsByClassName("asteroideG");
  let tam = asteroidesGR.length;
  for(let i=0;i<tam;i++){
    if(asteroidesGR[i] ){
      if((tiro.offsetTop<=asteroidesGR[i].offsetTop+111) && (tiro.offsetTop+33>=asteroidesGR[i].offsetTop)
       &&(tiro.offsetLeft<=asteroidesGR[i].offsetLeft+136)&&(tiro.offsetLeft+9>=asteroidesGR[i].offsetLeft)){
         space.element.removeChild(asteroidesGR[i]);
         space.element.removeChild(tiro);
         let pontuacao = document.getElementById("pontuacao");
         pontos = pontos +10;
         space.element.removeChild(pontuacao);
         let pontu = document.createElement("h1");
         pontu.className = "pontuacao";
         pontu.id = "pontuacao";
         pontu.innerHTML = `${pontos}`;
         space.element.appendChild(pontu);
      }
    }
  }
}
function colisaoTiroAsteroidePequeno(tiro){
  let asteroidesPE = document.getElementsByClassName("asteroideP");
  let tam = asteroidesPE.length;
    for(let i=0;i<tam;i++){
      if(asteroidesPE[i] ){
        if((tiro.offsetTop<=asteroidesPE[i].offsetTop+42) && (tiro.offsetTop+33>=asteroidesPE[i].offsetTop)
         &&(tiro.offsetLeft<=asteroidesPE[i].offsetLeft+44)&&(tiro.offsetLeft+9>=asteroidesPE[i].offsetLeft)){
           space.element.removeChild(asteroidesPE[i]);
           space.element.removeChild(tiro);
           let pontuacao = document.getElementById("pontuacao");
          
           pontos = pontos +100;
           space.element.removeChild(pontuacao);
           
           let pontu = document.createElement("h1");
           pontu.className = "pontuacao";
           pontu.id = "pontuacao";
           pontu.innerHTML = `${pontos}`;
           space.element.appendChild(pontu);
        }
      }
    }
}

function colisaoTiroDisco(tiro){
  let discosV = document.getElementsByClassName("disco-voador");
  let tam = discosV.length;
  for(let i=0;i<tam;i++){
    if(discosV[i] ){
      if((tiro.offsetTop<=discosV[i].offsetTop+91) && (tiro.offsetTop+33>=discosV[i].offsetTop)
        &&(tiro.offsetLeft<=discosV[i].offsetLeft+91)&&(tiro.offsetLeft+9>=discosV[i].offsetLeft)){
          space.element.removeChild(discosV[i]);
          space.element.removeChild(tiro);
          let pontuacao = document.getElementById("pontuacao");
          pontos = pontos +20;
          space.element.removeChild(pontuacao);
          let pontu = document.createElement("h1");
          pontu.className = "pontuacao";
          pontu.id = "pontuacao";
          pontu.innerHTML = `${pontos}`;
          space.element.appendChild(pontu);
      }
    }
  }
}

function colisaoNaveNaveInimiga(){
  let naves = document.getElementsByClassName("enemy-ship");
  let tam = naves.length;
  for(let i=0;i<tam;i++){
    if((ship.element.offsetTop<=naves[i].offsetTop+50) && (ship.element.offsetTop+75>=naves[i].offsetTop)
    &&(ship.element.offsetLeft<=naves[i].offsetLeft+98)&&(ship.element.offsetLeft+99>=naves[i].offsetLeft)&&(playerDamaged===false)){
    let vidas = document.getElementsByClassName("vidas");
    vida--;
     space.element.removeChild(naves[i]);
     space.element.removeChild(vidas[0]);
     time_atual = parseInt(time);

    }

  }

}

function colisaoNaveAsteroideG(){
  let asteroidesG = document.getElementsByClassName("asteroideG");
  let tam =  asteroidesG.length;
  for(let i=0;i<tam;i++){
    if((ship.element.offsetTop<= asteroidesG[i].offsetTop+111) && (ship.element.offsetTop+75>= asteroidesG[i].offsetTop)
    &&(ship.element.offsetLeft<= asteroidesG[i].offsetLeft+136)&&(ship.element.offsetLeft+99>= asteroidesG[i].offsetLeft)&&(playerDamaged===false)){
      
    let vidas = document.getElementsByClassName("vidas");
    vida--;
     space.element.removeChild( asteroidesG[i]);
     space.element.removeChild(vidas[0]);
     time_atual = parseInt(time);
    }
  }
}

function colisaoNaveAsteroideP(){
  let asteroidesPE = document.getElementsByClassName("asteroideP");
  let tam =  asteroidesPE.length;
  for(let i=0;i<tam;i++){
    if((ship.element.offsetTop<= asteroidesPE[i].offsetTop+42) && (ship.element.offsetTop+75>= asteroidesPE[i].offsetTop)
    &&(ship.element.offsetLeft<= asteroidesPE[i].offsetLeft+44)&&(ship.element.offsetLeft+99>= asteroidesPE[i].offsetLeft)&&(playerDamaged===false)){
    let vidas = document.getElementsByClassName("vidas");
    vida--;
     space.element.removeChild( asteroidesPE[i]);
     space.element.removeChild(vidas[0]);
     time_atual = parseInt(time);
    }
  }
}

function colisaoNaveDisco(){
  let discosV = document.getElementsByClassName("disco-voador");
  let tam =  discosV.length;
  for(let i=0;i<tam;i++){
    if((ship.element.offsetTop<= discosV[i].offsetTop+91) && (ship.element.offsetTop+75>= discosV[i].offsetTop)
    &&(ship.element.offsetLeft<= discosV[i].offsetLeft+91)&&(ship.element.offsetLeft+99>= discosV[i].offsetLeft)&&(playerDamaged===false)){
      
    let vidas = document.getElementsByClassName("vidas");
    vida--;
     space.element.removeChild( discosV[i]);
     space.element.removeChild(vidas[0]);
     time_atual = parseInt(time);

    }
  }
}
  function run() {
    const random_enemy_ship = Math.random() * 100;
    const random_asteroide_grande = Math.random()*100;
    const random_asteroide_pequeno = Math.random()*100;
    const random_disco_voador = Math.random()*100;
    velocidade_aleatoria = parseInt(Math.random()*3); 

    if (random_asteroide_grande <= PROB_ASTEROIDE_GRANDE) {
      asteroidesG.push(new AsteroideGrande());
    }
   
    if (random_enemy_ship <= PROB_ENEMY_SHIP) {
      enemies.push(new EnemyShip());
    }

    if (random_asteroide_pequeno <= PROB_ASTEROIDE_PEQUENO) {
      asteroidesP.push(new AsteroidePequeno());
    }

    if (random_disco_voador <= PROB_DISCO) {
      discos.push(new DiscoVoador());
    }

    controlaVida();
    controleTiros();
    controlaNavesInimigas();
    colisaoNaveNaveInimiga();
    colisaoNaveAsteroideG();
    colisaoNaveAsteroideP();
    controlaAsteroidesG();
    controlaAsteroidesP();
    colisaoNaveDisco();
    time++;

    asteroidesG.forEach((a)=>a.move());
    asteroidesP.forEach((a)=>a.move());
    discos.forEach((d)=>d.move());
    tiros.forEach((t) => t.move());
    enemies.forEach((e) => e.move());

    if(time-time_atual<500 && time>50 && time_atual>50){
      playerDamaged=true;
      ship.element.src = "assets/playerDamaged.png";
      console.log("time: "+time);
      console.log("time_atual: "+time_atual);
      playerMove = false;
    }
    else{
      if(playerMove===false){
        ship.element.src = "assets/player.png";
        playerMove = true;
        playerDamaged = false;
      }
      ship.move();
    }

    if(time>100*60*minutos){
      velocidadeInimigo = velocidadeInimigo + 1;
      minutos++;
    }
  space.move();
  }
  init();
})();
