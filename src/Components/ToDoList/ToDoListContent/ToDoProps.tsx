import { ToDo } from "../../../Actions/toDoAction"
import { GenericConsts } from "../../../Constants/GenericConts"
import { ModalTitlesConsts } from "../../../Constants/ModalTitlesConsts"
import { AddNewTaskModalForm } from "../../AddNewTaskModalForm/AddNewTaskModalForm"

export const getClearAllTasksModalProps = (setIsOpen: (val: boolean) => void, clearAllTask: () => void, isOpen: boolean) => {
    return {
        title: ModalTitlesConsts.DELETE_ALL_TASKS,
        component: "Are you sure you want to delete all the tasks?",
        buttons: [
            { text: GenericConsts.CANCEL, onClick: () => setIsOpen(false) },
            { text: GenericConsts.YES, onClick: clearAllTask, className: GenericConsts.APPROVE_LOWER_CASE },
        ],
        isOpen,
        setIsOpen
    }
}

export const getDeleteTaskModalProps = (setIsOpen: (val: boolean) => void, deleteOneTask: (taskId: number) => void, isOpen: boolean, taskId: number) => {
    return {
        title: ModalTitlesConsts.DELETE_TASK,
        component: "Are you sure you want to delete this task?",
        buttons: [
            { text: GenericConsts.CANCEL, onClick: () => setIsOpen(false) },
            { text: GenericConsts.YES, onClick: () => deleteOneTask(taskId), className: GenericConsts.APPROVE_LOWER_CASE },
        ],
        isOpen,
        setIsOpen
    }
}

export const getAddOneTaskModalProps = (setIsOpen: (val: boolean) => void, isOpen: boolean, saveNewTodo: (e: any) => void, setNewTask: (task: ToDo) => void) => {

    const addOneModalInputs = [
        { type: "text", label: "Title", name: "title" },
        { type: "text", label: "Description", name: "description" },
        { type: "date", label: "Due Date", name: "dueDate" },
    ]

    return {
        title: ModalTitlesConsts.ADD_NEW_TASK,
        component: <AddNewTaskModalForm inputs={addOneModalInputs}
            buttons={[
                { text: GenericConsts.CANCEL, onClick: () => setIsOpen(false) },
                { text: GenericConsts.YES, onClick: (e: any) => saveNewTodo(e) },
            ]}
            setNewTask={setNewTask}
        />,
        isOpen,
        setIsOpen
    }
}

export const getInitModalProps = (setIsOpen: (val: boolean) => void) => {
    return {
        title: "",
        component: "",
        buttons: [],
        isOpen: false,
        setIsOpen
    }
}

