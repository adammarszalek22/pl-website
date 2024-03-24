import { handleRegistration } from './login/login.js';

const main = async (userData) => {

    await handleRegistration();

}

main();