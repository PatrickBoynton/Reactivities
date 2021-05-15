import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async (): Promise<void> => {
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.setLoadingInitial(false);
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        }
    };

    loadActivity = async (id: string): Promise<void> => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        } else {
            this.loadingInitial = true;

            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.setLoadingInitial(false);
            }catch (e) {
                console.log(e);
                this.setLoadingInitial(false);
            }
        }
    };

    private setActivity = (activity: Activity): void => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string): Activity | undefined => {
        return this.activityRegistry.get(id);
    };

    setLoadingInitial = (state: boolean): void => {
        this.loadingInitial = state;
    };

    createActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };


    updateActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteActivity = async (id: string): Promise<void> => {
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    get activitiesByDate(): Activity[] {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }
}
