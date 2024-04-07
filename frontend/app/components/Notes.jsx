'use client';
import { useState } from "react";
import { ModalApp } from "./ModalApp";
import { AppContext } from "../context/AppContext";
import { TabNotes } from "./TabNotes";

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
                <TabNotes/>

                <ModalApp
                    title={modal.title}
                    body={modal.body}
                    show={modal.show}
                />
            </div>
        </AppContext.Provider>
    )
}