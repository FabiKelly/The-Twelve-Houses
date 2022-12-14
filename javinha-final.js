const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: 'imgs-jogo/estatuaDeAtena.png'
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocidade: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: 'imgs-jogo/bronze/ShiParado.png',
  framesMax: 2,
  scale: 2.5,
  offset: {
    x: -50,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: 'imgs-jogo/bronze/ShiParado.png',
      framesMax: 2
    },
    run: {
      imageSrc: 'imgs-jogo/bronze/ShiCorre.png',
      framesMax: 8
    },
    jump: {
      imageSrc: 'imgs-jogo/bronze/ShiPula.png',
      framesMax: 2
    },
    fall: {
      imageSrc: 'imgs-jogo/bronze/ShiCai.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: 'imgs-jogo/bronze/ShiAtaque1.png',
      framesMax: 11
    },
    takeHit: {
      imageSrc: 'imgs-jogo/bronze/ShiAtacado.png',
      framesMax: 4
    },
    death: {
      imageSrc: 'imgs-jogo/bronze/ShiPerde.png',
      framesMax: 4
    }
  },
  ataqueBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const ini = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocidade: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: 'imgs-jogo/ouro/GParado.png',
  framesMax: 3,
  scale: 2.5,
  offset: {
    x: -50,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: 'imgs-jogo/ouro/GParado.png',
      framesMax: 3
    },
    run: {
      imageSrc: 'imgs-jogo/ouro/GCorre.png',
      framesMax: 8
    },
    jump: {
      imageSrc: 'imgs-jogo/ouro/20221129_195848_0000.png',
      framesMax: 2
    },
    fall: {
      imageSrc: 'imgs-jogo/ouro/GCai.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: 'imgs-jogo/ouro/GAtaque1.png',
      framesMax: 15
    },
    takeHit: {
      imageSrc: 'imgs-jogo/ouro/GAtacado.png',
      framesMax: 3
    },
    death: {
      imageSrc: 'imgs-jogo/ouro/GPerde.png',
      framesMax: 2
    }
  },
  ataqueBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
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
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function anima() {
  window.requestAnimationFrame(anima)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  ini.update()

  player.velocidade.x = 0
  ini.velocidade.x = 0

  // bronze - movimento
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocidade.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocidade.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // pulando
  if (player.velocidade.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocidade.y > 0) {
    player.switchSprite('fall')
  }

  // ouro - movimento
  if (keys.ArrowLeft.pressed && ini.lastKey === 'ArrowLeft') {
    ini.velocidade.x = -5
    ini.switchSprite('run')
  } else if (keys.ArrowRight.pressed && ini.lastKey === 'ArrowRight') {
    ini.velocidade.x = 5
    ini.switchSprite('run')
  } else {
    ini.switchSprite('idle')
  }

  // pulando
  if (ini.velocidade.y < 0) {
    ini.switchSprite('jump')
  } else if (ini.velocidade.y > 0) {
    ini.switchSprite('fall')
  }

  // detecta a colis??o e o inimigo ?? atingido
  if (
    retanguloColisao({
      retan1: player,
      retan2: ini
    }) &&
    player.atacando &&
    player.framesCurrent === 4
  ) {
    ini.takeHit()
    player.atacando = false

    gsap.to('#vida-ini', {
      width: ini.health + '%'
    })
  }

  // se o cav. de bronze errar
  if (player.atacando && player.framesCurrent === 4) {
    player.atacando = false
  }

  // this is where our player gets hit
  if (
    retanguloColisao({
      retan1: ini,
      retan2: player
    }) &&
    ini.atacando &&
    ini.framesCurrent === 2
  ) {
    player.takeHit()
    ini.atacando = false

    gsap.to('#vida-player', {
      width: player.health + '%'
    })
  }

  // se o cav. de ouro errar
  if (ini.atacando && ini.framesCurrent === 2) {
    ini.atacando = false
  }

  // fim de jogo com base na vida
  if (ini.health <= 0 || player.health <= 0) {
    determinarVencedor({ player, ini, timerId })
  }
}
anima()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
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
      case 's':
        player.attack()
        break
    }
  }

  if (!ini.dead) {
    switch (event.key) {
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
        ini.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
