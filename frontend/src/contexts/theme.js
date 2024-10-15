import React from "react";

import { useContext } from "react";

//creating theme context
export const ThemeContext = React.createContext({
    themeMode : "light",
    lightTheme : () => {},
    darkTheme : () => {}
    }
)

//exporting provider (no need of creating in other file)
export const ThemeProvider = ThemeContext.Provider

//exporting custom hook
export default function useTheme(){
    return useContext(ThemeContext)
}