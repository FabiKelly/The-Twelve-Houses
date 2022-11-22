let shunEl = document.querySelector('#shun');
let imagemEl = document.querySelector('.shun');
let loiroEl = document.querySelector('#loiro');
let nomeEl = document.querySelector('#nome');
let shiryuEl = document.querySelector('#shiryu');
let hyogaEl = document.querySelector('#hyoga');
let ikkiEl = document.querySelector('#ikki');
let seiyaEl = document.querySelector('#seiya');
let buttonEl = document.querySelector('#botao');
let personagensEl = document.querySelectorAll('.personagens');
let clicou = false;

shunEl.addEventListener('mouseover', function(){
  shunEl.addEventListener('click', function(){
    clicou = true;
   imagemEl.src = 'https://pngimage.net/wp-content/uploads/2018/06/shun-de-andromeda-png-3.png';
   nomeEl.innerHTML = 'Shun de Andrômeda';}
)});

shiryuEl.addEventListener('mouseover', function(){
  shiryuEl.addEventListener('click', function(){
    clicou = true;
    imagemEl.src = 'https://th.bing.com/th/id/R.997f7bf942ed09979fdbfcd5358d1432?rik=E%2b6SRwqcDfBTGA&pid=ImgRaw&r=0';
    nomeEl.innerHTML = 'Shiryu de Dragão';  
  })});

  hyogaEl.addEventListener('mouseover', function(){
    hyogaEl.addEventListener('click', function(){
      clicou = true;
    imagemEl.src = 'https://th.bing.com/th/id/R.f4bf157dbaa490fa2cdee45bc1fbf3c9?rik=jqDfRWW1px2%2f0g&riu=http%3a%2f%2f1.bp.blogspot.com%2f-eQlA_IRZNu4%2fUdqCiyhPzWI%2fAAAAAAAAA1I%2fUduaVdEX9Vc%2fs1600%2fCygnus_hyoga_by_ikkispartan-d5n5p38.png&ehk=GXSsIhapU6SYxJ152XwHbowCpEGjdcDdu31D2BYlIWw%3d&risl=&pid=ImgRaw&r=0';
    nomeEl.innerHTML = 'Hyoga de Cisne';  
  })});
  
  ikkiEl.addEventListener('mouseover', function(){
    ikkiEl.addEventListener('click', function(){
      clicou = true;
     imagemEl.src = 'https://vignette.wikia.nocookie.net/doblaje/images/a/ab/IkkiFenixSaintSeiya02.png/revision/latest?cb=20190728200313&path-prefix=es';
     nomeEl.innerHTML = 'Ikki de Fênix'; })});
  

  seiyaEl.addEventListener('mouseover', function(){
    seiyaEl.addEventListener('click', function(){
      clicou = true;
    imagemEl.src = 'https://2.bp.blogspot.com/_hFLq0zR_I8g/TPv-leSLhyI/AAAAAAAAD4Y/EFHBeP_000E/s1600/Seiya_III.png';
    nomeEl.innerHTML = 'Seiya de Pégaso'; 
})});
