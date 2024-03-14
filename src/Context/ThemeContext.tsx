import React, { ReactNode, createContext, useContext, useState } from 'react'

// theme types
export interface ITheme {
    backgroundColor: string
    textColor: string
}

// Default theme
const lightTheme: ITheme = {
    backgroundColor: '#ffffff',
    textColor: '#000000',
}

const darkTheme: ITheme = {
    backgroundColor: "#333333",
    textColor: "#ffffff"
}

const ThemeContext = createContext<{
    theme: ITheme
    isDarkMode: boolean
    toggleTheme: () => void
}>({
    theme: lightTheme,
    toggleTheme: () => { },
    isDarkMode: false
})

// Custom hook to consume the theme
export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
    children: ReactNode
}

// Theme provider component
export const ThemeProvider = (props: ThemeProviderProps) => {

    const { children } = props

    const [theme, setTheme] = useState<ITheme>(lightTheme)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme))
        setIsDarkMode(prevState => (!prevState))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
