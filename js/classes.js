class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 }
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = offset
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animaFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animaFrames()
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocidade,
    color = 'red',
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    ataqueBox = { offset: {}, width: undefined, height: undefined }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })

    this.velocidade = velocidade
    this.width = 50
    this.height = 150
    this.lastKey
    this.ataqueBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: ataqueBox.offset,
      width: ataqueBox.width,
      height: ataqueBox.height
    }
    this.color = color
    this.atacando
    this.health = 100
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.sprites = sprites
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    this.draw()
    if (!this.dead) 
      this.animaFrames()

    // caixas de ataque
    this.ataqueBox.position.x = this.position.x + this.ataqueBox.offset.x
    this.ataqueBox.position.y = this.position.y + this.ataqueBox.offset.y

    this.position.x += this.velocidade.x
    this.position.y += this.velocidade.y

    // função gravidade
    if (this.position.y + this.height + this.velocidade.y >= canvas.height - 96) {
      this.velocidade.y = 0
      this.position.y = 330
    } else this.velocidade.y += gravidade
  }

  attack() {
    this.switchSprite('attack1')
    this.atacando = true
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {
      this.switchSprite('death')
    } else this.switchSprite('takeHit')
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true
      return
    }

    // substituindo todas as outras animações pela animação de ataque
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.framesMax - 1
    )
      return

    // substituir quando o lutador é atingido
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break

      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break

      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break

      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
    }
  }
}
