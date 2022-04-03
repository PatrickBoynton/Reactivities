import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../../index";
import { Activity } from "../models/Activity";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

// Adds a fake delay to the api call.
const sleep = (delay: number) => {
	return new Promise((resolve => {
		setTimeout(resolve, delay);
	}));
};


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
	await sleep(1000);
	return response;
}, (error: AxiosError) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const {data, status, config} = error.response!;
	switch (status) {
	case 400:
		if (typeof data === "string") {
			toast.error(data);
		}
		// eslint-disable-next-line no-prototype-builtins
		if (config.method === "get" && data.errors.hasOwnProperty("id")) {
			history.push("/not-found");
		}
		if (data.errors) {
			const modelStateErrors = [];
			for (const key in data.errors) {
				if (data.errors[key]) {
					modelStateErrors.push(data.errors[key]);
				}
			}
			throw modelStateErrors.flat();
		}
		break;
	case 401:
		toast.error("unauthorised");
		break;
	case 404:
		history.push("/not-found");
		toast.error("Not found");
		break;
	case 500:
		store.commonStore.setServerError(data);
		history.push("/server-error");
		break;
	}
	return Promise.reject(error);
});

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	// eslint-disable-next-line @typescript-eslint/ban-types
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	// eslint-disable-next-line @typescript-eslint/ban-types
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Activities = {
	list: () => requests.get<Activity[]>("/activities"),
	details: (id: string) => requests.get<Activity>(`/activities/${id}`),
	create: (activity: Activity) => axios.post("/activities", activity),
	update: (activity: Activity) => axios.put(`/activities/${activity.id}`, activity),
	delete: (id: string) => axios.delete(`/activities/${id}`)
};

const agent = {
	Activities
};

export default agent;