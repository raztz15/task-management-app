import React, { ReactNode, useState } from 'react'
import './Tooltip.css'

interface ITooltipProps {
    text: string
    children: ReactNode
}

export const Tooltip = (props: ITooltipProps) => {

    const { text, children } = props

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const handleMouseEnter = () => {
        setIsVisible(true)
    }

    const handleMouseLeave = () => {
        setIsVisible(false)
    }

    return (
        <div className='tooltip--container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isVisible && <div className='tooltip'>{text}</div>}
            {children}
        </div>
    )
}
