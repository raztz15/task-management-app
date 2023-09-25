import { useState } from 'react'
import { ModalTypesConsts } from '../../../Constants/ModalTypesConsts'

interface IToDoListActionsProps {
    openModalByType: (val: string) => void
    setIsShownCompletedTasks: (val: boolean) => void
    isShownCompletedTasks: boolean
}

export const ToDoListActions = (props: IToDoListActionsProps) => {

    const { openModalByType, setIsShownCompletedTasks, isShownCompletedTasks } = props

    const [isSortListShown, setisSortListShown] = useState<boolean>(false)

    return <div className='todo-list--actions'>
        <div className='add-new-todo--button'>
            <button onClick={() => openModalByType(ModalTypesConsts.ADD_ONE_TASK_MODAL)}>Add new TODO</button>
        </div>
        <div className='todo-list--sorting-input'>
            <button>Sort By</button>
            {isSortListShown && <div className='todo-list--sorting-options'>
                <div>Date</div>
                <div>Name</div>
            </div>}
        </div>
        <div className='filter-todo--button'>
            <button onClick={() => setIsShownCompletedTasks(!isShownCompletedTasks)}>Completed Tasks</button>
        </div>
    </div>
}
