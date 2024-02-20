import './ToDoListActions.css'
import { useState, useEffect, useContext } from 'react'
import { ModalTypesConsts } from '../../../Constants/ModalTypesConsts'
import { toDoList } from '../../../Reducers/toDoReducer'
import { ThemeContext, useTheme } from '../ToDoList'
import { useDispatch } from 'react-redux'
import { filterTodoListAction, sortDataByAction } from '../../../Actions/toDoAction'
import { Tooltip } from '../../Tooltip/Tooltip'

interface IToDoListActionsProps {
    openModalByType: (val: string) => void
    setIsShownCompletedTasks: (val: boolean) => void
}

export const ToDoListActions = (props: IToDoListActionsProps) => {

    const { isShownCompletedTasks } = useTheme()

    const { openModalByType, setIsShownCompletedTasks } = props

    const [isSortListShown, setisSortListShown] = useState<boolean>(false)

    const dispatch = useDispatch()


    const sortOptionsList = [{ id: 1, desc: "Date" }, { id: 2, desc: "Name" }]


    const filterData = () => {
        if (isShownCompletedTasks) {
            dispatch(filterTodoListAction(
                (todo) => !todo.isCompleted
            ))
        } else {
            dispatch(filterTodoListAction(
                (todo) => todo.isCompleted
            ))
        }
        setIsShownCompletedTasks(!isShownCompletedTasks)
    }

    const sortData = () => {
        dispatch(sortDataByAction("Name"))
    }

    return <div className='todo-list--actions'>
        <div className='add-new-todo--button'>
            <Tooltip text="Add new TODO">
                <button onClick={() => openModalByType(ModalTypesConsts.ADD_ONE_TASK_MODAL)}>Add new TODO</button>
            </Tooltip>
        </div>
        <div className='todo-list--sorting-button'>
            <button onClick={sortData}>Sort By</button>
            {isSortListShown && <div className='todo-list--sorting-options'>
                {sortOptionsList.map(({ desc }, idx) =>
                    <div key={idx} className='todo-list--sorting-option' onClick={() => setisSortListShown(false)}>
                        {desc}</div>)}
            </div>}
        </div>
        <div className='filter-todo--button'>
            <button onClick={filterData}>{`${isShownCompletedTasks ? 'All Tasks' : 'Completed Tasks'}`}</button>
        </div>
    </div>
}
