import { ServerError } from '../models/serverError';
import { makeAutoObservable, reaction, runInAction } from 'mobx';
import agent from '../api/agent';

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
        reaction(() => this.token, token => {
            if (token) {
                localStorage.setItem('jwt', token);
            } else {
                localStorage.removeItem('jwt');
            }

        });
    }

    setServerError = (error: ServerError): void => {
        this.error = error;
    };

    setToken = (token: string | null): void => {
        this.token = token;
    };

    setAppLoaded = (): void => {
        this.appLoaded = true;
    };
}
