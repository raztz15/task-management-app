export const toDoActionTypes = {
    ADD_TO_DO: "ADD_TO_DO",
    CLEAR_ALL_TO_DOS: "CLEAR_ALL_TO_DOS",
    DELETE_ONE_TASK: "DELETE_ONE_TASK",
    COMPLETE_TASK: "COMPLETE_TASK"
}

export interface ToDo {
    id: number
    title: string
    description: string
    dueDate: Date
    isCompleted: boolean
}

export const addToDoAction = (todo: ToDo) => {
    const newToDo = { ...todo, dueDate: todo.dueDate.toString() }
    return {
        type: toDoActionTypes.ADD_TO_DO,
        payload: newToDo
    }
}

export const deleteAllToDosAction = () => {
    return {
        type: toDoActionTypes.CLEAR_ALL_TO_DOS
    }
}

export const deleteOneTaskAction = (taskId: number) => {
    return {
        type: toDoActionTypes.DELETE_ONE_TASK,
        payload: taskId
    }
}

export const completeTaskAction = (taskId: number) => {
    return {
        type: toDoActionTypes.COMPLETE_TASK,
        payload: taskId
    }
}