import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import './AddNewTaskModalForm.css'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { GenericConsts } from '../../Constants/GenericConts';
import { IButton } from '../Modal/Modal';
import { ToDo } from '../../Actions/toDoAction';

interface IInputProps {
    type: string
    label: string
    name: string
}

interface IModalFormProps {
    inputs: Array<IInputProps>
    buttons?: Array<IButton>
    setNewTask: (task: ToDo | any) => void
}

export const AddNewTaskModalForm = (props: IModalFormProps) => {
    const { inputs, buttons, setNewTask } = props

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewTask((prevState: ToDo) => ({ ...prevState, [name]: value, dueDate: selectedDate }))
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
        setNewTask((prevState: ToDo) => ({ ...prevState, dueDate: date }))
    }

    return (
        <form className='form--container' >
            {inputs.map(({ type, label, name }, idx) => <div key={idx} className='form--input'>
                <label>{label}</label>
                {type === GenericConsts.DATE ?
                    <ReactDatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        showPopperArrow={false}
                    >
                    </ReactDatePicker> :
                    <input type={type} onChange={(e) => handleChange(e)} name={name} />}
            </div>)}
            <div className='modal--buttons'>{buttons?.map(button => <button key={button.text} className='modal--button' onClick={button.onClick}>{button.text}</button>)}</div>
        </form>
    )
}
