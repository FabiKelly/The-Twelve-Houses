let  cadastrarEl = document.querySelector('#cadastro');
let nomeEl  = document.querySelector('#username');
let emailEl = document.querySelector('#email');
let senhaEl = document.querySelector('#senha');

cadastrarEl.addEventListener('click', function(){
    localStorage.setItem('nome', nomeEl.value);
    localStorage.setItem('email', emailEl.value);
    localStorage.setItem('senha', senhaEl.value);
});