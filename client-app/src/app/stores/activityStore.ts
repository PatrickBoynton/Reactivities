import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);

        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
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

    setLoadingInitial = (state: boolean): void => {
        this.loadingInitial = state;
    };

    selectActivity = (id: string): void => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    };

    cancelSelectedActivity = (): void => {
        this.selectedActivity = undefined;
    };

    openForm = (id?: string): void => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    };

    closeForm = (): void => {
        this.editMode = false;
    };

    createActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
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
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    };
}
