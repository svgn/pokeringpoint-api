class LocationHash {
    static get() {
        return Number(window.location.hash.substring(1));
    }

    static set(value) {
        window.location.hash = `#${value}`;
    }

    static clear() {
        window.location.hash = '';
    }

    static has() {
        return !!window.location.hash;
    }
}

export default LocationHash;
