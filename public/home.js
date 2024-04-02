const buttonRight = document.querySelector('.carousel-button-right');

buttonRight.addEventListener('click', () => {

    const children = document.querySelector('.carousel').children;
    const theDiv = document.querySelector('.carousel-item.current');
    
    for (let i = 0; i < 39; i++) {
        
        if (children[i] == theDiv) {

            theDiv.classList.add('slide-right-to-left');
            children[i+1].classList.remove('hide');
            children[i+1].classList.add('current');
            children[i+1].classList.add('slide-right-to-left');

            children[i+1].addEventListener('animationend', function animationEnd() {
                theDiv.classList.remove('current');
                theDiv.classList.remove('slide-right-to-left');
                theDiv.classList.add('hide');
                children[i+1].classList.remove('slide-right-to-left');
                children[i+1].removeEventListener('animationend', animationEnd);
            })
            return;
        }
    }

})

const buttonLeft = document.querySelector('.carousel-button-left');

buttonLeft.addEventListener('click', () => {

    const children = document.querySelector('.carousel').children;
    const theDiv = document.querySelector('.carousel-item.current');

    for (let i = 38; i >= 0; i--) {

        if (children[i] == theDiv) {

            children[i-1].classList.remove('hide');
            children[i-1].classList.add('current');
            children[i-1].classList.add('slide-left-to-right');
            theDiv.classList.add('slide-left-to-right');

            children[i-1].addEventListener('animationend', function animationEnd() {
                theDiv.classList.remove('current');
                theDiv.classList.remove('slide-left-to-right');
                theDiv.classList.add('hide');
                children[i-1].classList.remove('slide-left-to-right');
                children[i-1].removeEventListener('animationend', animationEnd);
            })
            return;
        }
    }
})