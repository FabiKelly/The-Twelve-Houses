let jogadorEl = document.createElement('img');
let divEl = document.querySelector('#personadiv')
let personagensEl = document.querySelector('#personagens');

jogadorEl.src = 'https://pngimage.net/wp-content/uploads/2018/06/shun-de-andromeda-png-3.png';
jogadorEl.classList.add('persona');
personagensEl.appendChild(jogadorEl);

personagensEl.addEventListener('mousemove', function(e){
    personagensEL = e.currentTarget;
    personagensEl.innerHTML = "hahaha";
});