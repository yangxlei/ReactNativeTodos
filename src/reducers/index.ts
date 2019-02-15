import {
    Action,
    State,
    ACTION_TYPE_ADD_TASK,
    ACTION_TYPE_INIT,
    ACTION_TYPE_EDIT_TASK,
} from './action';
import Task from '../models/Task';


const initialState = {
    tasks: [{ id: 1, name: 'Task1', startTime: 0, endTime: 10, desc: 'hahahah' }, { id: 2, name: 'Task2', startTime: 0, endTime: 10 }],
} as State;

function addTask(tasks: Array<Task>, action: Action) {

    const newTask = {
        id: Math.random() * 1000,
        name: action.name,
        startTime: action.startTime,
        endTime: action.endTime,
        desc: action.desc
    };
    return [newTask, ...tasks];
}

function changeTask(tasks: Array<Task>, action: Action) {
    const index = tasks.findIndex((task) => task.id === action.taskId);
    const task = tasks[index];

    tasks[index] = {
        ...task,
        ...action
    }
    return [...tasks];
}

export default (state = initialState, action: Action): State => {
    console.log(`actions ${action.type}`);
    switch (action.type) {
        case ACTION_TYPE_INIT:
            return initialState;
        case ACTION_TYPE_ADD_TASK:
            return {
                ...state,
                tasks: addTask(state.tasks, action)
            };
        case ACTION_TYPE_EDIT_TASK:
            return {
                ...state,
                tasks: changeTask(state.tasks, action)
            }
    }
    return state;
}