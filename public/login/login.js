import { login } from '../api-calls/db-api.js';
import { appState } from '../app-state.js';

export const handleLogin = async () => {

    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function(event) {

        event.preventDefault();
        
        const formData = new FormData(form);
        const userFormData = Object.fromEntries(formData.entries());
        
        if (!validateLoginData(userFormData)) return;
        
        const responseData = await login(userFormData);

        appState.newUser(responseData);

    })

}

const validateLoginData = (userFormData) => {

    if (userFormData.password.length < 6) {
        console.error('Password needs to be at least 6 letters long');
        displayErrorMessage('Password needs to be at least 6 letters long');
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