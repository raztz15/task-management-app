import './ToDoListContent.css'
import { toDoList } from '../../../Reducers/toDoReducer'
import { ReactComponent as Trash } from '../../../Assets/Icons/trash.svg'
import { ReactComponent as TaskIcon } from '../../../Assets/Icons/task-icon.svg'
import { ReactComponent as TaskCompletedIcon } from '../../../Assets/Icons/task-completed-icon.svg'
import { formattingService } from '../../../formattingService'
import { ModalTypesConsts } from '../../../Constants/ModalTypesConsts'
import { useDrag, useDrop } from 'react-dnd';
import { ToDo } from '../../../Actions/toDoAction'

interface IToDoListContentProps {
    todoList: toDoList | undefined
    handleCompleteTask: (taskId: number) => void
    handleInCompleteTask: (taskId: number) => void
    openModalByType: (modalType: string, taskId?: number) => void
    isShownCompletedTasks: boolean
}

export const ToDoListContent = (props: IToDoListContentProps) => {

    const { todoList, handleCompleteTask, handleInCompleteTask, openModalByType, isShownCompletedTasks } = props

    const service = new formattingService()

    const getFilteredTasks = () => {
        return isShownCompletedTasks ? todoList?.toDos.filter(task => task.isCompleted) : todoList?.toDos
    }

    return (
        <div>{getFilteredTasks()?.map((todo) => <div key={todo.id} className={`todo-entity`}>
            <div className='todo-entity--desc'>
                <div>{todo.title}</div>
                <div>{todo.description}</div>
            </div>
            <div>{`Due to - ${service.getFormattedDate(new Date(todo.dueDate))}`}</div>
            <div className='todo-entity--actions'>
                <Trash onClick={() => openModalByType(ModalTypesConsts.DELETE_TASK_MODAL, todo.id)} />
                {todo.isCompleted ? <TaskCompletedIcon onClick={() => handleInCompleteTask(todo.id)} /> :
                    <TaskIcon onClick={() => handleCompleteTask(todo.id)} />}
            </div>
        </div>
        )}</div>
    )
}
