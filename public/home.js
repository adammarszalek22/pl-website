const buttonRight = document.querySelector('.carousel-button-right');

buttonRight.addEventListener('click', (event) => {
    const carousel = document.querySelector('.carousel');
    let children = carousel.children;

    const theDiv = document.querySelector('.carousel-item.show')
    for (let i = 0; i < 39; i++) {
        if (children[i] == theDiv) {
            // theDiv.classList.remove('show')
            // theDiv.classList.add('hide')

            children[i+1].classList.add('show')
            children[i+1].classList.remove('hide')
            break;
        }
    }
})

const buttonLeft = document.querySelector('.carousel-button-left');

buttonLeft.addEventListener('click', (event) => {
    const carousel = document.querySelector('.carousel');
    let children = carousel.children;

    const theDiv = document.querySelector('.carousel-item.show')
    for (let i = 38; i > 0; i--) {
        if (children[i] == theDiv) {
            theDiv.classList.remove('show')
            theDiv.classList.add('hide')

            children[i-1].classList.add('show')
            children[i-1].classList.remove('hide')
            break;
        }
    }
})