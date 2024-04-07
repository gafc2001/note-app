const { createContext, useState } = require("react");


export const AppContext = createContext();


export const AppProvider = ({children}) => {

    const [notes,setNotes] = useState([])
    const [tags,setTags] = useState([])

    return <AppContext.Provider
        value = {{
            notes,
            tags,
            setNotes,
            setTags
        }}
    >
        {children}
    </AppContext.Provider>
}