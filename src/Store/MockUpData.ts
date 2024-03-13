import { GenericConsts } from "../Constants/GenericConts";
import { getTodayOrTomorrowDate } from "../utils";

export const mockData = [
    {
        id: Math.random(),
        title: "Groceries",
        description: "Milk, Eggs, Snacks",
        dueDate: getTodayOrTomorrowDate(GenericConsts.TODAY).toLocaleDateString(),
        isCompleted: false
    },
    {
        id: Math.random(),
        title: "Cleaing the house",
        description: "Cleaning dishes, windows and floor",
        dueDate: getTodayOrTomorrowDate(GenericConsts.TOMORROW).toLocaleDateString(),
        isCompleted: false
    },
]