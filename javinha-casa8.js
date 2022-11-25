const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7

class Sprite {
  constructor({position, velocidade, color = 'red', offset}){
    this.position = position
    this.velocidade = velocidade
    this.height = 150
    this.width = 50
    this.lastKey
    this.ataqueBox ={
      position: {
          x: this.position.x,
          y: this.position.y
      },
      offset,
      width: 100,
      height: 50,
    }
    this.color = color
    this.atacando 
    this.health = 100
  }


  draw(){
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    if(this.atacando){
    c.fillStyle = 'green'
    c.fillRect(this.ataqueBox.position.x, this.ataqueBox.position.y, this.ataqueBox.width, this.ataqueBox.height)
  }
}


  update(){
    this.draw()
    this.ataqueBox.position.x = this.position.x + this.ataqueBox.offset.x
    this.ataqueBox.position.y = this.position.y

    this.position.x += this.velocidade.x
    this.position.y += this.velocidade.y
    if(this.position.y + this.height + this.velocidade.y >= canvas.height){
        this.velocidade.y = 0
    }else
     this.velocidade.y += gravidade

  }
  attack() {
    this.atacando = true
    setTimeout(() =>{
        this.atacando = false
    }, 100)
  }
  
}




const player = new Sprite({
  position: {
  x : 200,
  y : 0
  },
  velocidade: {
    x : 0,
    y : 0
  },
  offset: {
    x : 0,
    y : 0
  }
})

const ini = new Sprite({
  position: {
  x : 700,
  y : 0
  },
  velocidade: {
    x : 0,
    y : 0
  },
  color: 'blue',
  offset: {
    x : -50,
    y : 0
  }
})

console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false 
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
 
}
 
function retanguloColisao({retan1,retan2}){
      return(retan1.ataqueBox.position.x + retan1.ataqueBox.width >= retan2.position.x && retan1.ataqueBox.position.x <= retan2.position.x + retan2.width &&
        retan1.ataqueBox.position.y + retan1.ataqueBox.height >= retan2.position.y && retan1.ataqueBox.position.y <= retan2.position.y + retan2.height)
}

function determinarVencedor({player, ini, timerId}){
  clearTimeout(timerId)
  document.querySelector('#resultado').style.display = 'flex'
  if(player.health > ini.health){
    document.querySelector('#resultado').innerHTML = 'Vencedor: Cavaleiro de Bronze'
  }   
  else  if(player.health < ini.health){
    document.querySelector('#resultado').innerHTML = 'Vencedor: Cavaleiro de Ouro'
  }   
}
 
let timer = 100
let timerId 
function decreaseTimer(){
  if(timer > 0){
   timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#tempo').innerHTML = timer
  }
  if(timer === 0){
    determinarVencedor({player, ini, timerId})
  }
}
decreaseTimer()

function anima(){
  window.requestAnimationFrame(anima)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  ini.update()

  player.velocidade.x = 0
  ini.velocidade.x = 0

  if(keys.a.pressed && player.lastKey === 'a'){
    player.velocidade.x = -8
  }
  else if(keys.d.pressed  && player.lastKey === 'd'){
    player.velocidade.x = 8
  }
  if(keys.ArrowLeft.pressed && ini.lastKey === 'ArrowLeft'){
    ini.velocidade.x = -8
  }
  else if(keys.ArrowRight.pressed  && ini.lastKey === 'ArrowRight'){
    ini.velocidade.x = 8
  }

  if(retanguloColisao({retan1:player, retan2:ini}) && player.atacando){
    player.atacando = false
    ini.health -= 20
    document.querySelector('#vida-ini').style.width = ini.health + '%'
  }

  if(retanguloColisao({retan1:ini, retan2:player}) && ini.atacando){
    ini.atacando = false
    player.health -= 20
    document.querySelector('#vida-player').style.width = player.health + '%'

  }
  if(ini.health <= 0 || player.health <= 0){
    determinarVencedor({player, ini, timerId})
  }
}
anima()

window.addEventListener('keydown', (event) =>{
      switch (event.key){
        case 'd':
          keys.d.pressed = true
          player.lastKey = 'd'
          break
        case 'a':
          keys.a.pressed = true
          player.lastKey = 'a'
          break
        case 'w':
          player.velocidade.y = -20
            break
        case ' ':
        player.attack()
        break
       case 'ArrowRight':
          keys.ArrowRight.pressed = true
          ini.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
            ini.lastKey = 'ArrowLeft'
              break
         case 'ArrowUp':
          ini.velocidade.y = -20
            break
          case 'ArrowDown':
            ini.atacando = true
                break
        }
})
window.addEventListener('keyup', (event) =>{
  switch (event.key){
  case 'd':
    keys.d.pressed = false
      break
  case 'a':
    keys.a.pressed = false
      break
  case 'w':
    keys.w.pressed = false
      break
 }
switch (event.key){
  case 'ArrowRight':
    keys.ArrowRight.pressed = false
      break
  case 'ArrowLeft':
    keys.ArrowLeft.pressed = false
      break
  case 'ArrowUp':
    keys.ArrowUp.pressed = false
      break
  }
})
