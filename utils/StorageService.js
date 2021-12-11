/* global localStorage */
// import User from '../model/user';

export default class StorageService {
    static setAuthToken(token) {
        localStorage.setItem('authToken', token);
    }

    static getAuthToken() {
        return localStorage.getItem('authToken');
    }
}
