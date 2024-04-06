'use client';
import { useState } from "react";
import { FormNote } from "./FormNote";
import {Row,Col} from 'react-bootstrap';
import styles from '../page.module.css';
import { ModalApp } from "./ModalApp";
export async function getServerSideProps(){ 
    const response = getNotes();
    return {
      props : {
        serverData : response
      }
    }
}
export const Notes = ({serverData}) => {

    
    const [data,setData] = useState(serverData || [])
    const [isOpen,setIsOpen] = useState(false);


    const handleClickOpenForm = () => {
        setIsOpen(true);
    }

    const handleCloseModal = (newNote) => {
        console.log(newNote);
        setData([
            newNote,
            ...data,
        ]);
        setIsOpen(false);
    }
    return(
        <div className="d-flex justify-content-center p-3">
            
            <div className={styles["main-container"]}>
                <div className='p-4'>
                    {data.map((note,ind) => 
                        <div className='note-item mb-2' style={{backgroundColor : note.color}} key={ind}>
                            {note.text}
                        </div>
                    )}
                </div>
                <span className={styles["btn-add"]} onClick={handleClickOpenForm}>+</span>
            </div>

            <ModalApp
                title="Create note"
                body={<FormNote afterSend={handleCloseModal}/>}
                show={isOpen}
                setShow={setIsOpen}
            />
        </div>
    )
}