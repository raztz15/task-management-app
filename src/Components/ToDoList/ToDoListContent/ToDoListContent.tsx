import { toDoList } from '../../../Reducers/toDoReducer'
import { ReactComponent as Trash } from '../../../Assets/Icons/trash.svg'
import { ReactComponent as TaskIcon } from '../../../Assets/Icons/task-icon.svg'
import { ReactComponent as TaskCompletedIcon } from '../../../Assets/Icons/task-completed-icon.svg'
import { formattingService } from '../../../formattingService'

interface IToDoListContentProps {
    todoList: toDoList | undefined
    deleteOneTask: (taskId: number) => void
    handleCompleteTask: (taskId: number) => void
}
export const ToDoListContent = (props: IToDoListContentProps) => {

    const { todoList, deleteOneTask, handleCompleteTask } = props

    const service = new formattingService()

    return (
        <div>{todoList?.toDos.map((todo) => <div key={todo.id} className='todo-entity'>
            <div className='todo-entity--desc'>
                <div>{todo.title}</div>
                <div>{todo.description}</div>
            </div>
            <div>{`Due to - ${service.getFormattedDate(new Date(todo.dueDate))}`}</div>
            <div className='todo-entity--actions'>
                {/* TODO --- if not using css classname delete them */}
                <Trash className='todo-entity--actions__delete' onClick={() => deleteOneTask(todo.id)} />
                {todo.isCompleted ? <TaskCompletedIcon /> :
                    <TaskIcon className='todo-entity--actions__task-status' onClick={() => handleCompleteTask(todo.id)} />}
            </div>
        </div>)}</div>
    )
}
