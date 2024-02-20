import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import './AddNewTaskModalForm.css'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { GenericConsts } from '../../Constants/GenericConts';
import { IButton } from '../Modal/Modal';

interface IInputProps {
    type: string
    label: string
    name: string
}

interface IModalFormProps {
    inputs: Array<IInputProps>
    buttons?: Array<IButton>
}

export const AddNewTaskModalForm = (props: IModalFormProps) => {
    const { inputs, buttons } = props

    const [form, setForm] = useState<{ [name: string]: ReactNode }>()
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prevState => ({ ...prevState, [name]: value }))
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date)
    }

    return (
        <form className='form--container' >
            {inputs.map(({ type, label, name }) => <div className='form--input'>
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
            <div className='modal--buttons'>{buttons?.map(button => <button className='modal--button' onClick={button.onClick}>{button.text}</button>)}</div>
        </form>
    )
}
