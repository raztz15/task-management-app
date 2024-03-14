import './ToDoList.css'
import { useState, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IncompleteTaskAction, ToDo, addToDoAction, completeTaskAction, deleteAllToDosAction, deleteOneTaskAction } from '../../Actions/toDoAction'
import { RootState } from '../../Store/store'
import { getNumberOfCompletedTasks, getNumberOfLeftTasks, getTodayOrTomorrowDate } from '../../utils'
import { ToDoListContent } from './ToDoListContent/ToDoListContent'
import { Modal } from '../Modal/Modal'
import { ModalTypesConsts } from '../../Constants/ModalTypesConsts'
import { getAddOneTaskModalProps, getClearAllTasksModalProps, getDeleteTaskModalProps, getInitModalProps } from './ToDoListContent/ToDoProps'
import { ToDoListActions } from './ToDoListActions/ToDoListActions'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTheme } from '../../Context/ThemeContext'
import React from 'react'

interface ThemeContextType {
    isShownCompletedTasks: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ToDoList = () => {

    const { theme, toggleTheme, isDarkMode } = useTheme()

    const dispatch = useDispatch()

    const { toDos } = useSelector((state: RootState) => state.toDoReducer)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<string>("")
    const [taskId, setTaskId] = useState<number>(0)
    const [isShownCompletedTasks, setIsShownCompletedTasks] = useState(false)
    const [newTask, setNewTask] = useState<ToDo | null>()

    const addNewToDo = (e: any) => {
        e.preventDefault()
        newTask && dispatch(addToDoAction(newTask))
        setIsModalOpen(false)
    }

    const openModalByType = (modalType: string, taskId?: number) => {
        if (taskId) setTaskId(taskId)
        setIsModalOpen(true)
        setModalType(modalType)
    }

    const clearAllTask = () => {
        dispatch(deleteAllToDosAction())
        setIsModalOpen(false)
    }

    const deleteOneTask = (taskId: number) => {
        setIsModalOpen(false)
        dispatch(deleteOneTaskAction(taskId))
    }

    const handleCompleteTask = (taskId: number) => {
        dispatch(completeTaskAction(taskId))
    }

    const handleInCompleteTask = (taskId: number) => {
        dispatch(IncompleteTaskAction(taskId))
    }

    const getToDoListActionProps = () => {
        return {
            openModalByType,
            setIsShownCompletedTasks,
            isShownCompletedTasks
        }
    }

    const getToDoListContentProps = () => {
        return {
            deleteOneTask,
            handleCompleteTask,
            handleInCompleteTask,
            openModalByType,
            isShownCompletedTasks
        }
    }

    const getDynamicModalProps = (modalType: string) => {
        switch (modalType) {
            case ModalTypesConsts.CLEAR_ALL_TASKS_MODAL:
                return getClearAllTasksModalProps(setIsModalOpen, clearAllTask, isModalOpen)
            case ModalTypesConsts.DELETE_TASK_MODAL:
                return getDeleteTaskModalProps(setIsModalOpen, deleteOneTask, isModalOpen, taskId)
            case ModalTypesConsts.ADD_ONE_TASK_MODAL:
                return getAddOneTaskModalProps(setIsModalOpen, isModalOpen, addNewToDo, setNewTask)
            default:
                return getInitModalProps(setIsModalOpen)
        }
    }

    return <div className='todo-list--container'>
        <div className='todo-list--header'>
            <h1>My Tasks</h1>
            <button style={{ color: theme.textColor }} onClick={toggleTheme}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
        </div>
        <ToDoListActions {...getToDoListActionProps()} />
        <div className='todo-list--list' style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
            <div className='todo-list--list__header'>
                <div className='number-of-tasks-left'>
                    {`${getNumberOfLeftTasks(toDos)} tasks left (${getNumberOfCompletedTasks(toDos)} tasks completed)`}
                </div>
                <div className='clear-all-tasks-button'
                    onClick={() => openModalByType(ModalTypesConsts.CLEAR_ALL_TASKS_MODAL)}>Clear all tasks</div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <ToDoListContent {...getToDoListContentProps()} />
            </DndProvider>
            {isModalOpen && <Modal {...getDynamicModalProps(modalType)} />}
        </div>
    </div>
}

