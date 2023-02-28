
const titulo = document.querySelector('.mult-text');
const texto = titulo.innerHTML.split('');
function typewriter(titulo){
    titulo.innerHTML = '';
    texto.forEach((letra, i) => {
        setTimeout(() => {
            titulo.innerHTML += letra;
        },350 * i);
    });
}
typewriter(titulo);

/* var efeitoEscrever  = new Typed('.mult-text', {
    strings: ['Desenvolvedor', 'Acadêmico', 'Programador'],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1500
}) */