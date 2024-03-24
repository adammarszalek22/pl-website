class AppState {

    constructor() {
        this.userDetails = {};
    }

    newUser(newUserData) {
        // TODO - add validation of data
        this.userDetails = newUserData;
    }

    deleteUserDetails() {
        this.userDetails = {};
    }

    userLoggedIn() {
        // Some code
    }
}

export const appState = new AppState();