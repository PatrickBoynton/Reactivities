import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

axios.defaults.baseURL = "http://localhost:5000/api";

// Adds a fake delay to the api call.
const sleep = (delay: number) => {
	return new Promise((resolve => {
		setTimeout(resolve, delay);
	}));
};


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
	try {
		await sleep(1000);
		return response;
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
});

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	// eslint-disable-next-line @typescript-eslint/ban-types
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	// eslint-disable-next-line @typescript-eslint/ban-types
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
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