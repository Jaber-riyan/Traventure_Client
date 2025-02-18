import React, { useContext } from 'react'
import { ThemeContext } from '../../ThemeProvider/ThemeProvider'

function UseTheme() {
    const context = useContext(ThemeContext);
    return context;
}

export default UseTheme