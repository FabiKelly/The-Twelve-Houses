let imagemDois = document.querySelector('.cena2');
let imagemTres = document.querySelector('.cena3');
let imagemQuatro = document.querySelector('.cena4');
let imagemCinco = document.querySelector('.cena5');
let imagemSeis = document.querySelector('.cena6');
let imagemSete = document.querySelector('.cena7');
let imagemOito = document.querySelector('.cena8');
let imagemNove = document.querySelector('.cena9');
let imagemdez = document.querySelector('.cena10');
let imagemOnze = document.querySelector('.cena11');
let proxEl = document.querySelector('#prox');
let seguir = 1;


proxEl.addEventListener('click', function(){
    seguir++;
    switch(seguir.value){
        case(seguir.value ===2):
            imagemDois.classList.remove('.cena2');
            imagemDois.classList.add('.apre2');

        case(seguir.value ===3):
            imagemDois.classList.remove('.apre2');
            imagemUm.classList.remove('.cena1');
            imagemTres.classList.remove('.cena3');
            imagemTres.classList.add('.apre3');

        case(seguir.value ===4):
            imagemQuatro.classList.remove('.cena4');
            imagemQuatro.classList.add('.apre4');

        case(seguir.value ===5):
            imagemQuatro.classList.remove('.apre4');
            imagemTres.classList.remove('.apre3');
            imagemDois.classList.remove('.cena5');
            imagemDois.classList.add('.apre5');

        case(seguir.value ===6):
            imagemDois.classList.remove('.cen6');
            imagemDois.classList.add('.');

        case(seguir.value ===7):
            imagemDois.classList.remove('');
            imagemDois.classList.remove('');
            imagemDois.classList.remove('');
            imagemDois.classList.add('');

        case(seguir.value ===8):
            imagemDois.classList.remove('');
            imagemDois.classList.add('');

        case(seguir.value ===9):
            imagemDois.classList.remove('');
            imagemDois.classList.remove('');
            imagemDois.classList.remove('');
            imagemDois.classList.add('');

        case(seguir.value ===10):
            imagemDois.classList.remove('');
            imagemDois.classList.add('');

        case(seguir.value ===11):
            imagemDois.classList.remove('');
            imagemDois.classList.remove('');
            imagemDois.classList.remove('');
            imagemDois.classList.add('');
    }
});
