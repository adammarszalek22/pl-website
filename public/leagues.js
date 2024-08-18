document
.getElementById('create-league')
.addEventListener('click', function(event) {

    event.preventDefault();

    document
    .getElementById('popup-message')
    .textContent = 'Enter the name of the league you are about to create';

    document
    .getElementById('popup-input')
    .name = "createLeague";

    document
    .getElementById('popup-input')
    .classList
    .remove('hide');

    document
    .getElementById('popup')
    .classList
    .remove('hide');

    document
    .getElementById('league-form')
    .action = '/my-leagues';

    document
    .getElementById('league-form')
    .method = 'post';

    document
    .getElementById('okay-button')
    .type = 'submit';

});

document
.getElementById('join-league')
.addEventListener('click', function(event) {

    event.preventDefault();

    document
    .getElementById('popup-message')
    .textContent = 'Enter the id of the league you would like to join';

    document
    .getElementById('popup-input')
    .name = "joinLeague";

    document
    .getElementById('popup-input')
    .classList
    .remove('hide');

    document
    .getElementById('popup')
    .classList
    .remove('hide');

    document
    .getElementById('league-form')
    .action = '/my-leagues';

    document
    .getElementById('league-form')
    .method = 'post';

    document
    .getElementById('okay-button')
    .type = 'submit';

});

document
.getElementById('cancel-button')
.addEventListener('click', function(event) {

    event.preventDefault();

    document
    .getElementById('popup')
    .classList
    .add('hide');

});