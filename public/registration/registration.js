import { createUser } from '../api-calls/db-api.js';
import { appState } from '../app-state.js';

export const handleRegistration = async () => {

    const form = document.getElementById('registerForm');

    form.addEventListener('submit', async function(event) {

        event.preventDefault();
        
        const formData = new FormData(form);
        const userFormData = Object.fromEntries(formData.entries());

        await validateRegistrationData(userFormData);

        const responseData = await createUser(userFormData);

        appState.newUser(responseData);

    })

}

const validateRegistrationData = async (userFormData) => {

    if (userFormData.password !== userFormData.password2) {
        console.error('Passwords do not match');
        await displayErroMessage('Passwords do not match');
        return;
    }

    await cleanErroMessageField();
    return true;

}

const displayErroMessage = async (message) => {

    const warningMessage = document.getElementById('warningMessage');

    warningMessage.textContent = message;
    warningMessage.style.display = 'block';

}

const cleanErroMessageField = async () => {

    const warningMessage = document.getElementById('warningMessage');
    warningMessage.style.display = 'none';

}