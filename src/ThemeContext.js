import React, { createContext, useReducer, useState } from 'react'
import { TOGGLE_THEME } from './redux/ActionTypes';
import { ThemeReducer } from './redux/reducers/theme.reducer';

const ThemeContext = createContext()

const initialState = {
    theme: 'light'
}

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    const toggleTheme = (theme) => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        dispatch({ type: TOGGLE_THEME, payload:newTheme})
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext