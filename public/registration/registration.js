import { createUser } from '../api-calls/db-api.js';
import { appState } from '../app-state.js';

export const handleRegistration = async () => {

    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async function(event) {

        event.preventDefault();
        
        const formData = new FormData(form);
        const userFormData = Object.fromEntries(formData.entries());
        
        if (!validateRegistrationData(userFormData)) return;

        const responseData = await createUser(userFormData);

        appState.newUser(responseData);

    })

}

const validateRegistrationData = (userFormData) => {

    if (userFormData.password !== userFormData.password2) {
        console.error('Passwords do not match');
        displayErrorMessage('Passwords do not match');
        return;
    }

    cleanErroMessageField();
    return true;

}

const displayErrorMessage = (message) => {

    const warningMessage = document.getElementById('warningMessage');

    warningMessage.textContent = message;
    warningMessage.style.display = 'block';

}

const cleanErroMessageField = () => {

    const warningMessage = document.getElementById('warningMessage');
    warningMessage.style.display = 'none';

}