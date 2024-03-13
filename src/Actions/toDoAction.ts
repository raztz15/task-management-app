export const toDoActionTypes = {
    ADD_TO_DO: "ADD_TO_DO",
    CLEAR_ALL_TO_DOS: "CLEAR_ALL_TO_DOS",
    DELETE_ONE_TASK: "DELETE_ONE_TASK",
    COMPLETE_TASK: "COMPLETE_TASK",
    IN_COMPLETE_TASK: "IN_COMPLETE_TASK",
    FILTER_LIST: "FILTER_LIST",
    SORT_LIST: "SORT_LIST"
}

export interface ToDo {
    id: number
    title: string
    description: string
    dueDate: Date | string
    isCompleted: boolean
}

export const addToDoAction = (todo: ToDo) => {
    const newToDo = { ...todo, dueDate: todo.dueDate?.toLocaleString(), id: Math.random() }
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

export const IncompleteTaskAction = (taskId: number) => {
    return {
        type: toDoActionTypes.IN_COMPLETE_TASK,
        payload: taskId
    }
}

export const filterTodoListAction = (filterBy?: (todo: ToDo) => boolean) => {
    return {
        type: toDoActionTypes.FILTER_LIST,
        payload: filterBy
    }
}

export const sortDataByAction = (sortBy: string) => {
    return {
        type: toDoActionTypes.SORT_LIST,
        payload: sortBy
    }
}