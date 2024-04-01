const buttonRight = document.querySelector('.carousel-button-right');

buttonRight.addEventListener('click', () => {

    const carousel = document.querySelector('.carousel');
    let children = carousel.children;

    const theDiv = document.querySelector('.carousel-item.current')
    
    for (let i = 0; i < 39; i++) {
        
        if (children[i] == theDiv) {

            theDiv.classList.add('slide-exit-to-left');
            children[i+1].classList.remove('hide');
            children[i+1].classList.add('current');
            children[i+1].classList.add('slide-enter-from-right');

            children[i+1].addEventListener('animationend', function animationEnd() {
                theDiv.classList.remove('current');
                theDiv.classList.remove('slide-exit-to-left');
                theDiv.classList.add('hide');
                children[i+1].classList.remove('slide-enter-from-right');
                children[i+1].removeEventListener('animationend', animationEnd)
            })
            break;
        }
    }

})

const buttonLeft = document.querySelector('.carousel-button-left');

buttonLeft.addEventListener('click', () => {

    const carousel = document.querySelector('.carousel');
    let children = carousel.children;

    const theDiv = document.querySelector('.carousel-item.current')
    for (let i = 38; i > 0; i--) {
        if (children[i] == theDiv) {

            theDiv.classList.add('slide-exit-to-right');
            children[i-1].classList.remove('hide');
            children[i-1].classList.add('current');
            children[i-1].classList.add('slide-enter-from-left');

            children[i-1].addEventListener('animationend', function animationEnd() {
                theDiv.classList.remove('current');
                theDiv.classList.remove('slide-exit-to-right');
                theDiv.classList.add('hide');
                children[i-1].classList.remove('slide-enter-from-left');
                children[i-1].removeEventListener('animationend', animationEnd)
            })
            break;
        }
    }
})