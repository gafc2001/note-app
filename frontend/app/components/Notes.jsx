'use client';
import { useState } from "react";
import { ModalApp } from "./ModalApp";
import { AppContext, AppProvider } from "../context/AppContext";
import { ListNotes } from "./ListNotes";

export const Notes = ({serverData}) => {
   
    const [notes,setNotes] = useState(serverData.notes || []);
    const [tags,setTags] = useState(serverData.tags || []);
    const [modal,setModal] = useState({
        title : "",
        body : "",
        show : false,
    })

    return(
        <AppContext.Provider value={{
            notes,
            tags,
            modal,
            setModal,
            setNotes,
            setTags,
        }}>
            <div className="d-flex justify-content-center p-3">
                <ListNotes/>

                <ModalApp
                    title={modal.title}
                    body={modal.body}
                    show={modal.show}
                />
            </div>
        </AppContext.Provider>
    )
}