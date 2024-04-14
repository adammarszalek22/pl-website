const buttonRight = document.querySelector('.carousel-button-right');
const buttonLeft = document.querySelector('.carousel-button-left');

buttonRight.addEventListener('click', () => {

    const carouselChildren = document.querySelector('.carousel').children;
    const theDiv = document.querySelector('.carousel-item.current');
    
    for (let i = 0; i <= 36; i++) {
        
        if (carouselChildren[i] == theDiv) {

            theDiv.classList.add('slide-right-to-left');
            carouselChildren[i+1].classList.remove('hide');
            carouselChildren[i+1].classList.add('current');
            carouselChildren[i+1].classList.add('slide-right-to-left');

            document.querySelector('.current-gameweek').textContent = `Gameweek ${carouselChildren[i+1].id}`;

            carouselChildren[i+1].addEventListener('animationend', function animationEnd() {
                theDiv.classList.remove('current');
                theDiv.classList.remove('slide-right-to-left');
                theDiv.classList.add('hide');
                carouselChildren[i+1].classList.remove('slide-right-to-left');
                carouselChildren[i+1].removeEventListener('animationend', animationEnd);
            })
            return;
        }
    }

})

buttonLeft.addEventListener('click', () => {

    const carouselChildren = document.querySelector('.carousel').children;
    const theDiv = document.querySelector('.carousel-item.current');

    for (let i = 37; i >= 1; i--) {

        if (carouselChildren[i] == theDiv) {

            theDiv.classList.add('slide-left-to-right');
            carouselChildren[i-1].classList.remove('hide');
            carouselChildren[i-1].classList.add('current');
            carouselChildren[i-1].classList.add('slide-left-to-right');
            
            document.querySelector('.current-gameweek').textContent = `Gameweek ${carouselChildren[i-1].id}`;

            carouselChildren[i-1].addEventListener('animationend', function animationEnd() {
                theDiv.classList.remove('current');
                theDiv.classList.remove('slide-left-to-right');
                theDiv.classList.add('hide');
                carouselChildren[i-1].classList.remove('slide-left-to-right');
                carouselChildren[i-1].removeEventListener('animationend', animationEnd);
            })
            return;
        }
    }
})