import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { KeyBoardEventsConsts } from '../../Constants/KeyBoardEventsConsts'

interface IModalProps {
    title: string
    component: ReactNode
    buttons: Array<IButton>
    isOpen?: boolean
    setIsOpen: (val: boolean) => void
}

interface IButton {
    text: string,
    onClick: () => void
    className?: string
}

export const Modal = (props: IModalProps) => {

    const { isOpen = false, setIsOpen, title, component, buttons } = props

    if (!props.title || !props.component || !props.buttons || !props.setIsOpen) {
        throw new Error('Required props are missing.');
    }

    const portalElement = document.getElementById('portal')

    const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === KeyBoardEventsConsts.ESCAPE) {
            setIsOpen(false)
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeKeyPress);
        return () => {
            window.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, []);

    return portalElement ? ReactDOM.createPortal(
        <div className='modal--container'>
            <div className='modal--wrapper'>
                <div className='modal--title'>{title}</div>
                <div className='modal--body'>{component}</div>
                <div className='modal--buttons'>{buttons.map(({ text, onClick, className }, idx) =>
                    <div key={idx} className={`modal--button ${className ?? ''}`} onClick={() => onClick()}>{text}</div>)}</div>
            </div>
        </div >, portalElement
    ) : null
}
