import { login } from '../api-calls/db-api.js';
import { appState } from '../app-state.js';

export const handleLogin = async () => {

    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function(event) {

        event.preventDefault();
        
        const formData = new FormData(form);
        const userFormData = Object.fromEntries(formData.entries());
        
        await validateLoginData(userFormData);

        const responseData = await login(userFormData);

        appState.newUser(responseData);

    })

}

const validateLoginData = async (userFormData) => {

    if (userFormData.password !== userFormData.password2) {
        console.error('Passwords do not match');
        await displayErroMessage('Passwords do not match');
        return;
    }

    await cleanErroMessageField();
    return true;

}