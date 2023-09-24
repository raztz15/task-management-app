import { GenericConsts } from "./Constants/GenericConts"

export const getTodayOrTomorrowDate = (isToday: string) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return isToday === GenericConsts.TODAY ? today : tomorrow
}