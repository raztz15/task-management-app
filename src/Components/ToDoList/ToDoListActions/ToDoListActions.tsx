import './ToDoListActions.css'
import { useState, useEffect } from 'react'
import { ModalTypesConsts } from '../../../Constants/ModalTypesConsts'
import { useDispatch } from 'react-redux'
import { filterTodoListAction, sortDataByAction } from '../../../Actions/toDoAction'
import { Tooltip } from '../../Tooltip/Tooltip'
import React from 'react'
import { ITheme, useTheme } from '../../../Context/ThemeContext'

interface IToDoListActionsProps {
    openModalByType: (val: string) => void
    setIsShownCompletedTasks: (val: boolean) => void
    isShownCompletedTasks: boolean
}

export const ToDoListActions = (props: IToDoListActionsProps) => {

    const { openModalByType, setIsShownCompletedTasks, isShownCompletedTasks } = props

    const { theme, isDarkMode } = useTheme()

    const [isSortListShown, setisSortListShown] = useState<boolean>(false)
    const [chosenSort, setChosenSort] = useState<string>()

    const dispatch = useDispatch()

    useEffect(() => {
        chosenSort && dispatch(sortDataByAction(chosenSort))
    }, [chosenSort])


    const sortOptionsList = [
        { id: 1, desc: "Date" },
        { id: 2, desc: "Name" }
    ]


    const filterData = () => {
        if (isShownCompletedTasks) dispatch(filterTodoListAction((todo) => !todo.isCompleted))
        else dispatch(filterTodoListAction((todo) => todo.isCompleted))
        setIsShownCompletedTasks(!isShownCompletedTasks)
    }

    const handleOpenMenu = () => {
        setisSortListShown(!isSortListShown)
    }

    const handleDataSort = (chosenSort: string) => {
        setChosenSort(chosenSort)
        setisSortListShown(false)
    }

    return <div className='todo-list--actions' >
        <div className='add-new-todo--button' >
            <button style={{ color: theme.textColor, backgroundColor: isDarkMode ? theme.backgroundColor : undefined }} onClick={() => openModalByType(ModalTypesConsts.ADD_ONE_TASK_MODAL)} >Add new TODO</button>
        </div>
        <div className='todo-list--sorting-button'>
            <button style={{ color: theme.textColor, backgroundColor: isDarkMode ? theme.backgroundColor : undefined }} onClick={handleOpenMenu}>Sort By</button>
            {isSortListShown && <div className='todo-list--sorting-options'>
                {sortOptionsList.map(({ desc }, idx) =>
                    <div key={idx} className='todo-list--sorting-option' onClick={() => handleDataSort(desc)}>
                        {desc}</div>)}
            </div>}
        </div>
        <div className='filter-todo--button'>
            <button style={{ color: theme.textColor }} onClick={filterData}>{`${isShownCompletedTasks ? 'Incompleted Tasks' : 'Completed Tasks'}`}</button>
        </div>
    </div>
}
