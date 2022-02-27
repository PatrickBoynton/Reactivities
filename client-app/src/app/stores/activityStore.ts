import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();

            activities.map(activity => {
                activity.date = activity.date.split("T")[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false;
        } catch (e) {
            console.log(e);
            this.loadingInitial = false;
        }
    };
}
