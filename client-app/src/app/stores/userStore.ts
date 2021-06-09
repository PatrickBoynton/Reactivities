import { User, UserFormValues } from '../models/user';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';

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
            console.log(user);
        } catch (e) {
            throw e;
        }
    }
}
