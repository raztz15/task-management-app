import './ToDoList.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToDoAction, completeTaskAction, deleteAllToDosAction, deleteOneTaskAction } from '../../Actions/toDoAction'
import { RootState } from '../../Store/store'
import { getTodayOrTomorrowDate } from '../../utils'
import { GenericConsts } from '../../Constants/GenericConts'
import { toDoList } from '../../Reducers/toDoReducer'
import { ToDoListContent } from './ToDoListContent/ToDoListContent'


export const ToDoList = () => {

    const dispatch = useDispatch()

    const { toDos } = useSelector((state: RootState) => state.toDoReducer)

    const [todoList, setTodoList] = useState<toDoList>()

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

    const clearAllTask = () => {
        dispatch(deleteAllToDosAction())
    }

    const deleteOneTask = (taskId: number) => {
        dispatch(deleteOneTaskAction(taskId))
    }

    const handleCompleteTask = (taskId: number) => {
        dispatch(completeTaskAction(taskId))
    }

    const getToDoListContentProps = () => {
        return {
            todoList,
            deleteOneTask,
            handleCompleteTask
        }
    }

    return <div className='todo-list--container'>
        <div className='todo-list--title'>
            <h1>My Tasks</h1>
        </div>
        <div className='add-new-todo--button'>
            <button onClick={() => addNewToDo()}>Add new TODO</button>
        </div>
        <div className='todo-list--list'>
            <div className='todo-list--list__header'>
                <div className='number-of-tasks-left'>{`${todoList?.toDos.length} tasks left`}</div>
                <div className='clear-all-tasks-button' onClick={() => clearAllTask()}>Clear all tasks</div>
            </div>
            <ToDoListContent {...getToDoListContentProps()} />
        </div>
    </div>

}
