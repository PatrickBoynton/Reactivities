import { ServerError } from '../models/serverError';
import { makeAutoObservable } from 'mobx';

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError = (error: ServerError): void => {
        this.error = error;
    };

    setToken = (token: string | null): void => {
        if(token) localStorage.setItem('jwt', token);
        this.token = token;
    }

    setAppLoaded = (): void => {
        this.appLoaded = true;
    }
}
