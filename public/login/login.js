import { appState } from '../app-state.js';
import { baseUrl } from '../base-url.js';

// move this to another file and import
const login = async (loginData) => {

    try {

        const response = await fetch(`${baseUrl}/api/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        return await response.json();

    } catch (err) {
        console.error(err.message);
    }

}

export const handleLogin = async () => {

    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function(event) {

        event.preventDefault();
        
        const formData = new FormData(form);
        const userFormData = Object.fromEntries(formData.entries());
        
        if (!validateLoginData(userFormData)) return;
        
        const responseData = await login(userFormData);

        appState.newUser(responseData.data);
        console.error(appState.getUserDetails())
        window.location.href = '/main';

    })

}

const validateLoginData = (userFormData) => {

    // if (userFormData.password.length < 6) {
    //     console.error('Password needs to be at least 6 letters long');
    //     displayErrorMessage('Password needs to be at least 6 letters long');
    //     return;
    // }

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