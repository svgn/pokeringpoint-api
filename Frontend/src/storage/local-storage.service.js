class LocalStorageService {
    constuctor() {
        this.userKey = 'logged-user';
    }

    setLoggedUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getLoggedUser() {
        return JSON.parse(localStorage.getItem(this.userKey));
    }

    clearLoggedUser() {
        localStorage.removeItem(this.userKey);
    }
}

export const localStorageService = new LocalStorageService();
