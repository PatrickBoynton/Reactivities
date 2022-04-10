import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";

export default class UserStore {
	user: User | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get isLoggedIn() {
		return !!this.user;
	}

	login = async (credentials: UserFormValues) => {
		try {
			const user = await agent.Account.login(credentials);
			console.log(user);
		} catch (error) {
			throw error;
		}
	};
}