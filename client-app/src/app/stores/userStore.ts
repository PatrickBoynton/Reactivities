import { User, UserFormValues } from '../models/user';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { store } from './store';
import { history } from '../../index';

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn(): boolean {
        return !!this.user;
    }

    login = async (creds: UserFormValues): Promise<void> => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            history.push('/activities');
            runInAction(() => this.user = user);
        } catch (e) {
            throw e;
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    };
}
