class AppState {

    #userDetails;

    constructor() {
        this.#userDetails = {};
    }

    newUser(newUserData) {

        const validatedData = this.validate(newUserData);
        this.#userDetails = validatedData;

    }

    validate(newUserData) {
        const { access_token, refresh_token, user_id } = newUserData;
        return { access_token, refresh_token, user_id };
    }

    deleteUserDetails() {
        this.#userDetails = {};
    }

    userLoggedIn() {
        // Some code
    }

    getUserDetails() {
        return this.#userDetails;
    }
}

export const appState = new AppState();