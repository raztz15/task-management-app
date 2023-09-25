import './ToDoList.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToDo, addToDoAction, completeTaskAction, deleteAllToDosAction, deleteOneTaskAction } from '../../Actions/toDoAction'
import { RootState } from '../../Store/store'
import { getNumberOfCompletedTasks, getNumberOfLeftTasks, getTodayOrTomorrowDate } from '../../utils'
import { GenericConsts } from '../../Constants/GenericConts'
import { toDoList } from '../../Reducers/toDoReducer'
import { ToDoListContent } from './ToDoListContent/ToDoListContent'
import { Modal } from '../Modal/Modal'
import { ModalTypesConsts } from '../../Constants/ModalTypesConsts'
import { getAddOneTaskModalProps, getClearAllTasksModalProps, getDeleteTaskModalProps, getInitModalProps } from './ToDoListContent/ToDoProps'

export const ToDoList = () => {

    const dispatch = useDispatch()

    const { toDos } = useSelector((state: RootState) => state.toDoReducer)

    const [todoList, setTodoList] = useState<toDoList>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<string>("")
    const [taskId, setTaskId] = useState<number>(0)
    const [isShownCompletedTasks, setIsShownCompletedTasks] = useState(false)

    useEffect(() => {
        if (toDos) setTodoList(prevState => ({ ...prevState, toDos }))
    }, [toDos])


    const addNewToDo = () => {
        dispatch(addToDoAction({
            id: Math.random(),
            title: "Programming",
            description: "Making new assignment",
            dueDate: getTodayOrTomorrowDate(GenericConsts.TOMORROW),
            isCompleted: false
        }))
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

    const getToDoListContentProps = () => {
        return {
            todoList,
            deleteOneTask,
            handleCompleteTask,
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
                return getAddOneTaskModalProps(setIsModalOpen, isModalOpen)
            default:
                return getInitModalProps(setIsModalOpen)
        }
    }

    return <div className='todo-list--container'>
        <div className='todo-list--title'>
            <h1>My Tasks</h1>
        </div>
        <div className='todo-list--actions'>
            <div className='add-new-todo--button'>
                <button onClick={() => openModalByType(ModalTypesConsts.ADD_ONE_TASK_MODAL)}>Add new TODO</button>
            </div>
            <div className='filter-todo--button'>
                <button onClick={() => setIsShownCompletedTasks(!isShownCompletedTasks)}>Completed Tasks</button>
            </div>
        </div>
        <div className='todo-list--list'>
            <div className='todo-list--list__header'>
                <div className='number-of-tasks-left'>
                    {`${getNumberOfLeftTasks(todoList)} tasks left (${getNumberOfCompletedTasks(todoList)} tasks completed)`}
                </div>
                <div className='clear-all-tasks-button' onClick={() => openModalByType(ModalTypesConsts.CLEAR_ALL_TASKS_MODAL)}>Clear all tasks</div>
            </div>
            <ToDoListContent {...getToDoListContentProps()} />
            {isModalOpen && <Modal {...getDynamicModalProps(modalType)} />}
        </div>
    </div>
}
