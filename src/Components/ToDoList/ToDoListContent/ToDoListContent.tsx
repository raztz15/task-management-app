import './ToDoListContent.css'
import { toDoList } from '../../../Reducers/toDoReducer'
import { DndProvider, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { ToDo } from '../../../Actions/toDoAction'
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducers/reducers';
import React from 'react';

interface IToDoListContentProps {
    handleCompleteTask: (taskId: number) => void
    handleInCompleteTask: (taskId: number) => void
    openModalByType: (modalType: string, taskId?: number) => void
    isShownCompletedTasks: boolean
}

export const ToDoListContent = (props: IToDoListContentProps) => {

    const { handleCompleteTask, handleInCompleteTask, openModalByType, isShownCompletedTasks } = props

    const { toDos } = useSelector((state: RootState) => state.toDoReducer)

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TODO",
        drop: (item: ToDo, monitor) => { replaceItems(item.id, monitor) },
        collect: (monitor) => {
            return { isOver: !!monitor.isOver() }
        },
    }));

    const replaceItems = (draggedTodoId: number, monitor: DropTargetMonitor) => {
        const draggedIndex = toDos.findIndex((task) => task.id === draggedTodoId);
        const clientOffset = monitor.getClientOffset();
        if (draggedIndex === -1) return;
        const droppedPosition = {
            x: clientOffset?.x,
            y: clientOffset?.y,
        };
        const droppedIndex = toDos.findIndex((task, index) => {
            if (index === draggedIndex) {
                return false;
            }

            const element = document.getElementById(`todo-item-${task.id}`);
            if (!element) return false;

            const rect = element.getBoundingClientRect();
            const middleY = (rect.bottom - rect.top) / 2 + rect.top;

            // Check if the dropped position is above or below the middle of the task item.
            if (droppedPosition.y! < middleY) {

                return true; // Drop before this task.
            }

            return false; // Drop after this task.
        });
        console.log("droppedIndex ===> ", droppedIndex);

        const updatedTodoList: any = []
        if (toDos) {
            const updatedTodoList = [...toDos];
        }
        const [draggedTask] = updatedTodoList.splice(draggedIndex, 1);

        if (droppedIndex !== -1) {
            updatedTodoList.splice(droppedIndex, 0, draggedTask);
        } else {
            updatedTodoList.push(draggedTask);
        }
        console.log("updatedList ===> ", updatedTodoList);

    }

    const getToDoItemProps = () => {
        return {
            openModalByType,
            handleInCompleteTask,
            handleCompleteTask
        }
    }

    return (
        <div ref={drop}>{toDos.map(
            (todo: ToDo, idx: number) => <div key={idx}><ToDoItem todo={todo} {...getToDoItemProps()} /></div>
        )}</div>
    )
}
