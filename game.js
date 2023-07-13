
//armazena a div com ID kart na variável kart
var kart = document.getElementById("kart");
// Posição inicial do kart
var posiX = 45;
// Função para mover o kart
function moveKart(event) {
  var key = event.keyCode;
  // Movimento para a esquerda
  if (key == 37) {
    posiX -= 1;
    kart.style.left = posiX + "%";
  }
  // Movimento para a direita
  else if (key == 39) {
    posiX += 1;
    kart.style.left = posiX + "%";
  }
}

// Adiciona um listener para as teclas pressionadas
document.addEventListener("keydown", moveKart);

function novoElemento(tagName, className) {
  const elemento = document.createElement(tagName)
  elemento.className = className
  return elemento
}


function QuantEstrelas(){
  this.quantEstrela = estrelas =>{
    document.getElementById('estrelas').innerHTML = estrelas;
  }
}
function QuantPontos(){
  this.quantPontos = ponto =>{
    document.getElementById('pontuacao').innerHTML = ponto;
  }
}



function MoveEstrela(x, y, velocidade) {
  this.star = novoElemento('img','combust-estrela')
  this.star.src = 'img/estrela.png'
  this.star.style.position = "absolute"
  this.star.style.left = x + "%"
  this.star.style.bottom = y + "%"
  this.getX = () => parseInt(this.star.style.left.split('%')[0])
  this.setX = x => this.star.style.left = `${x}%`
  this.getY = () => parseInt(this.star.style.bottom.split('%')[0])
  this.setY = y => this.star.style.bottom = `${y}%`
  this.velocidade = velocidade;
  var gameBoard = document.getElementById("game-board")
  gameBoard.appendChild(this.star)
  this.mover = function() {
    var self = this
    setInterval(function() {
      var novaPosicaoY = self.getY() - self.velocidade;
      if (self.getY() == -20) {
        self.setY(y)
        self.setX(Math.floor(Math.random() * (45 - 30 + 1)) + 30)
      }else{
      self.setY(novaPosicaoY)}
      
    }, 200);
  };
}

function MoveInimigo(x, y, velocidade) {
  this.inim = document.createElement("img")
  this.inim.style.width = 40+'px'
  this.inim.src = "img/luid.png"
  this.inim.className = 'inimigo'
  this.inim.style.left = x + "%"
  this.inim.style.bottom = y + "%"
  this.getX = () => parseInt(this.inim.style.left.split('%')[0])
  this.setX = x => this.inim.style.left = `${x}%`
  this.getY = () => parseInt(this.inim.style.bottom.split('%')[0])
  this.setY = y => this.inim.style.bottom = `${y}%`
  this.velocidade = velocidade
  var gameBoard = document.getElementById("game-board");
  gameBoard.appendChild(this.inim)
  this.mover = function() {
    var self = this
    setInterval(function() {
      var novaPosicaoY = self.getY() - self.velocidade;
      if (self.getY() == -20) {
        self.setY(y)
        self.setX(Math.floor(Math.random() * (62 - 50 + 1)) + 50)

      }else{
      self.setY(novaPosicaoY)}
      
    }, 200)
  }
}


//sobreposição
function colisao(Elemento1, Elemento2) {

  const a = Elemento1.getBoundingClientRect()
  const b = Elemento2.getBoundingClientRect()

  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

  return horizontal && vertical
}



function Iniciar(){
  var kart = document.getElementById("kart")
  var pontos = document.getElementById("pontuacao")
  var quntEstrelas = document.getElementById("estrelas")
  var moveInimigo = new MoveInimigo(40, 100, 5)
  moveInimigo.mover()
  var moveEstrela = new MoveEstrela(33, 100, 5)
  moveEstrela.mover()
  // armazena a quantidade de estrtelas que servirão de combustível
  var estrelaRestante = 10;
  //armazena o numero de estrelas capturadas para exibir no fim do jogo
  var quantEstrelas = 0;
  //armazena quantidade de segundos passados para atualizar a pontuação
  var segundos = 0;

  var atualizaEstrela = setInterval(() => { 
    quntEstrelas.innerHTML= estrelaRestante
  }, 10)

  var atualizaPontos = setInterval(() => {    
    pontos.innerHTML = segundos
  }, 10)

  var aumentaPontos = setInterval(() => {    
    segundos++
  }, 1000)

  var decrementaEstrela = setInterval(() => {   
    estrelaRestante --;  
   
  }, 1000)

  function alerta(){

    alert('Acabaram as estrelas---Pontuaão: '+segundos+' ----Quantidade de estrelas '+quantEstrelas)
    location.reload()      
  }
  const alteraEstrela3=  setInterval(() => {

    if (estrelaRestante == 0) {
      clearInterval(colisaoEstrela)
      clearInterval(colidiuCarro)
      clearInterval(aumentaPontos)
      clearInterval(atualizaEstrela)
      pontos.innerHTML = segundos
      quntEstrelas.innerHTML = estrelaRestante
      setTimeout( () => { alerta() }, 10)
     
    }
  }, 1000)

  

  var colisaoEstrela = setInterval(() => {    
    if(colisao(kart, moveEstrela.star)){
      estrelaRestante +=5
      quantEstrelas++
    }
  }, 1500)

  var colidiuCarro= setInterval(() => {    
    var x=0
    if(colisao(kart, moveInimigo.inim)){
      segundos -=5    
      x=1
    }
    if( (moveInimigo.getY() <= 0)   && x == 0){
      segundos += 5
    }
  }, 1500)
}
new Iniciar()

