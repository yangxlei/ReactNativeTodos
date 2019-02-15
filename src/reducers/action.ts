import Task from '../models/Task';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

export interface Action {
    type: string;
    [prop: string]: any;
}

export interface State {
    tasks: Array<Task>;
    [prop: string]: any;
}

export const ACTION_TYPE_ADD_TASK = 'action_type_add_task';
export const ACTION_TYPE_INIT = 'action_type_init';
export const ACTION_TYPE_EDIT_TASK = 'action_type_edit_task';

export function initTasks() {
    return {
        type: ACTION_TYPE_INIT
    } as Action;
}

export function addTask(name: string, startTime: number, endTime: number, desc?: string, ): Action {
    return {
        type: ACTION_TYPE_ADD_TASK,
        name,
        startTime,
        endTime,
        desc,
    } as Action;
}

export function changeTask(taskId: number, name: string, startTime: number, endTime: number, desc?: string, ): Action {
    return {
        type: ACTION_TYPE_EDIT_TASK,
        taskId,
        name,
        startTime,
        endTime,
        desc,
    } as Action;
}
