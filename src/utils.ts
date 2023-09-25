import { GenericConsts } from "./Constants/GenericConts"
import { ModalTypesConsts } from "./Constants/ModalTypesConsts"
import { toDoList } from "./Reducers/toDoReducer"

export const getTodayOrTomorrowDate = (isToday: string) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return isToday === GenericConsts.TODAY ? today : tomorrow
}

export const getNumberOfCompletedTasks = (tasks: toDoList | undefined) => {
    const completedTasksArr = tasks?.toDos.filter(task => task.isCompleted)
    return completedTasksArr?.length
}

export const getNumberOfLeftTasks = (tasks: toDoList | undefined) => {
    const completedTasksArr = tasks?.toDos.filter(task => !task.isCompleted)
    return completedTasksArr?.length
}