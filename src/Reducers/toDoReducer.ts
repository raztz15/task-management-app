import { ToDo, toDoActionTypes } from "../Actions/toDoAction";
import { mockData } from "../Store/MockUpData";

export interface toDoList {
    toDos: Array<ToDo>
    copyData: Array<ToDo>
}


const initialState: toDoList = {
    toDos: mockData,
    copyData: mockData
}


export const toDoReducer = (state = initialState, action: { type: string, payload: any }) => {
    let updatedToDos: Array<ToDo>
    switch (action.type) {
        case toDoActionTypes.ADD_TO_DO:
            const newToDo = { ...action.payload }
            updatedToDos = [...state.toDos]
            updatedToDos.push(newToDo)
            return { ...state, toDos: updatedToDos, copyData: updatedToDos }
        case toDoActionTypes.CLEAR_ALL_TO_DOS:
            return { ...state, toDos: [], copyData: [] }
        case toDoActionTypes.DELETE_ONE_TASK:
            const selectedTaskToDelete = action.payload
            const newArr = state.toDos.filter(task => task.id !== selectedTaskToDelete)
            return { ...state, toDos: newArr, copyData: newArr }
        case toDoActionTypes.COMPLETE_TASK:
            const completedTaskId = action.payload;
            updatedToDos = state.toDos.map(task => {
                if (task.id === completedTaskId) return { ...task, isCompleted: true };
                return task;
            });
            state.toDos.map(task => {
                if (task.id === completedTaskId) return { ...task, isCompleted: true }
                return task
            })
            return { ...state, toDos: updatedToDos, copyData: updatedToDos };
        case toDoActionTypes.IN_COMPLETE_TASK:
            const taskId = action.payload;
            updatedToDos = state.toDos.map(task => {
                if (task.id === taskId) return { ...task, isCompleted: false };
                return task;
            });
            return { ...state, toDos: updatedToDos, copyData: updatedToDos };
        case toDoActionTypes.FILTER_LIST:
            const filterBy = action.payload
            if (filterBy) updatedToDos = state.copyData.filter(filterBy)
            else updatedToDos = state.copyData
            return { ...state, toDos: updatedToDos };
        case toDoActionTypes.SORT_LIST:
            const sortBy = action.payload
            switch (sortBy) {
                case "Date":
                    updatedToDos = [...state.toDos].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    break
                case "Name":
                    updatedToDos = [...state.toDos].sort((a, b) => a.title.localeCompare(b.title))
                    break
                default:
                    updatedToDos = [...state.toDos]
                    break;
            }
            return { ...state, toDos: updatedToDos, copyData: updatedToDos }
        default:
            return state
    }

}