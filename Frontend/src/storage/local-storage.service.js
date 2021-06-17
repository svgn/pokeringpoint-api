const USERKEY = 'logged-user';

class LocalStorageService {
    setLoggedUser(user) {
        localStorage.setItem(USERKEY, JSON.stringify(user));
    }

    getLoggedUser() {
        return JSON.parse(localStorage.getItem(USERKEY));
    }

    clearLoggedUser() {
        localStorage.removeItem(USERKEY);
    }
}

export const localStorageService = new LocalStorageService();
