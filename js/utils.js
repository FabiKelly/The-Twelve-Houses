function retanguloColisao({ retan1, retan2 }) {
  return (
    retan1.ataqueBox.position.x + retan1.ataqueBox.width >=
      retan2.position.x &&
    retan1.ataqueBox.position.x <=
      retan2.position.x + retan2.width &&
    retan1.ataqueBox.position.y + retan1.ataqueBox.height >=
      retan2.position.y &&
    retan1.ataqueBox.position.y <= retan2.position.y + retan2.height
  )
}

function determinarVencedor({ player, ini, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#resultado').style.display = 'flex'
  if (player.health === ini.health) {
    document.querySelector('#resultado').innerHTML = '?'
  } else if (player.health > ini.health) {
    document.querySelector('#resultado').innerHTML = 'Vencedor: Cavaleiro de Bronze'
  } else if (player.health < ini.health) {
    document.querySelector('#resultado').innerHTML = 'Vencedor: Cavaleiro de Ouro'
  }
}

let timer = 61
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#tempo').innerHTML = timer
  }

  if (timer === 0) {
    determinarVencedor({ player, ini, timerId })
  }
}
