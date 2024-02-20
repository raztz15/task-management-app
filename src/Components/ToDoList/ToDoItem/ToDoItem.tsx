import React from 'react'
import './ToDoItem.css'
import { ToDo } from '../../../Actions/toDoAction'
import { formattingService } from '../../../formattingService'
import { ReactComponent as Trash } from '../../../Assets/Icons/trash.svg'
import { ReactComponent as TaskIcon } from '../../../Assets/Icons/task-icon.svg'
import { ReactComponent as TaskCompletedIcon } from '../../../Assets/Icons/task-completed-icon.svg'
import { ModalTypesConsts } from '../../../Constants/ModalTypesConsts'
import { useDrag } from 'react-dnd';
import { Tooltip } from '../../Tooltip/Tooltip'

interface IToDoItemProps {
    todo: ToDo
    openModalByType: (val: string, taskId: number) => void
    handleInCompleteTask: (val: number) => void,
    handleCompleteTask: (val: number) => void
}
export const ToDoItem = (props: IToDoItemProps) => {
    const { todo, openModalByType, handleInCompleteTask, handleCompleteTask } = props

    const service = new formattingService()

    const [{ isDragging }, drag,] = useDrag(() => ({
        type: "TODO",
        item: { id: todo.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div id={`todo-item-${todo.id}`} ref={drag} key={todo.id} className={`todo-entity`}>
            <div className='todo-entity--desc'>
                <div>{todo.title}</div>
                <div>{todo.description}</div>
            </div>
            <div>{`Due to - ${service.getFormattedDate(new Date(todo.dueDate))}`}</div>
            <div className='todo-entity--actions'>
                <Tooltip text='Delete TODO'>
                    <Trash onClick={() => openModalByType(ModalTypesConsts.DELETE_TASK_MODAL, todo.id)} />
                </Tooltip>
                {todo?.isCompleted ? <Tooltip text='Mark TODO as incomplete'><TaskCompletedIcon onClick={() => handleInCompleteTask(todo.id)} /></Tooltip> :
                    <Tooltip text='Mark TODO as complete'><TaskIcon onClick={() => handleCompleteTask(todo?.id)} /></Tooltip>}
            </div>
        </div>
    )
}
