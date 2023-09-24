import { ToDo, toDoActionTypes } from "../Actions/toDoAction";
import { GenericConsts } from "../Constants/GenericConts";
import { getTodayOrTomorrowDate } from "../utils";

export interface toDoList {
    toDos: Array<ToDo>
}

const initialState: toDoList = {
    toDos:
        [
            {
                id: Math.random(),
                title: "Groceries",
                description: "Milk, Eggs, Snacks",
                dueDate: getTodayOrTomorrowDate(GenericConsts.TODAY),
                isCompleted: false
            },
            {
                id: Math.random(),
                title: "Cleaing the house",
                description: "Cleaning dishes, windows and floor",
                dueDate: getTodayOrTomorrowDate(GenericConsts.TOMORROW),
                isCompleted: false
            },
        ]
}


export const toDoReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case toDoActionTypes.ADD_TO_DO:
            const newToDo = action.payload
            const newStateArray = [...state.toDos]
            newStateArray.push(newToDo)
            return { ...state, toDos: newStateArray }
        case toDoActionTypes.CLEAR_ALL_TO_DOS:
            const newToDoArray = [...state.toDos]
            newToDoArray.length = 0
            return { ...state, toDos: newToDoArray }
        case toDoActionTypes.DELETE_ONE_TASK:
            const selectedTaskToDelete = action.payload
            const newArr = state.toDos.filter(task => task.id !== selectedTaskToDelete)
            return { ...state, toDos: newArr }
        case toDoActionTypes.COMPLETE_TASK:
            const completedTaskId = action.payload
            const updatedToDos = state.toDos.map(task => {
                if (task.id === completedTaskId) return { ...task, isCompleted: true }
                return task
            })
            return { ...state, toDos: updatedToDos }
        default:
            return state
    }
}