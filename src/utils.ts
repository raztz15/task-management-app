import { ToDo } from "./Actions/toDoAction"
import { GenericConsts } from "./Constants/GenericConts"
import { ModalTypesConsts } from "./Constants/ModalTypesConsts"
import { toDoList } from "./Reducers/toDoReducer"

export const getTodayOrTomorrowDate = (isToday: string) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return isToday === GenericConsts.TODAY ? today : tomorrow
}

export const getNumberOfCompletedTasks = (tasks: Array<ToDo> | undefined) => {
    const completedTasksArr = tasks?.filter(task => task.isCompleted)
    return completedTasksArr?.length
}

export const getNumberOfLeftTasks = (tasks: Array<ToDo> | undefined) => {
    const completedTasksArr = tasks?.filter(task => !task.isCompleted)
    return completedTasksArr?.length
}