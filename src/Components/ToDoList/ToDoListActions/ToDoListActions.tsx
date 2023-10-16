import './ToDoListActions.css'
import { useState, useEffect, useContext } from 'react'
import { ModalTypesConsts } from '../../../Constants/ModalTypesConsts'
import { toDoList } from '../../../Reducers/toDoReducer'
import { ThemeContext, useTheme } from '../ToDoList'

interface IToDoListActionsProps {
    openModalByType: (val: string) => void
    setIsShownCompletedTasks: (val: boolean) => void
}

export const ToDoListActions = (props: IToDoListActionsProps) => {

    const { todoList, setTodoList, isShownCompletedTasks } = useTheme()

    const { openModalByType, setIsShownCompletedTasks } = props

    const [isSortListShown, setisSortListShown] = useState<boolean>(false)

    const getFilteredTasks = () => {
        setIsShownCompletedTasks(!isShownCompletedTasks);
        const filteredList = isShownCompletedTasks ? todoList?.toDos.filter(task => task.isCompleted) : todoList?.toDos;
        if (filteredList) setTodoList({
            ...todoList,
            toDos: filteredList,
        });
    };

    const sortOptionsList = [{ id: 1, desc: "Date" }, { id: 2, desc: "Name" }]

    return <div className='todo-list--actions'>
        <div className='add-new-todo--button'>
            <button onClick={() => openModalByType(ModalTypesConsts.ADD_ONE_TASK_MODAL)}>Add new TODO</button>
        </div>
        <div className='todo-list--sorting-button'>
            <button onClick={() => setisSortListShown(!isSortListShown)}>Sort By</button>
            {isSortListShown && <div className='todo-list--sorting-options'>
                {sortOptionsList.map(({ desc }, idx) =>
                    <div key={idx} className='todo-list--sorting-option' onClick={() => setisSortListShown(false)}>
                        {desc}</div>)}
            </div>}
        </div>
        <div className='filter-todo--button'>
            <button onClick={() => setIsShownCompletedTasks(!isShownCompletedTasks)}>{`${isShownCompletedTasks ? 'All Tasks' : 'Completed Tasks'}`}</button>
        </div>
    </div>
}
