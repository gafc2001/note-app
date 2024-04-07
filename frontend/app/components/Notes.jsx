'use client';
import { useState } from "react";
import { FormNote } from "./FormNote";
import { Note } from "./Note";
import styles from '../page.module.css';
import { ModalApp } from "./ModalApp";
import { Tabs, Tab} from 'react-bootstrap';
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
        setData([
            newNote,
            ...data,
        ]);
        setIsOpen(false);
    }
    return(
        <div className="d-flex justify-content-center p-3">
            
            <div className={styles["main-container"]}>
                <Tabs
                    defaultActiveKey="notes"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="notes" title="Notes">
                        <div className='p-4'>
                            {data
                                .filter( n => n.isActive)
                                .map((note,ind) => 
                                <Note note={note} key={ind} afterSend={handleCloseModal} setData={setData}/>
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="archive_notes" title="Archive">
                        <div className='p-4'>
                            {data
                                .filter( n => !n.isActive)
                                .map((note,ind) => 
                                <Note note={note} key={ind} afterSend={handleCloseModal} setData={setData}/>
                            )}
                        </div>
                    </Tab>
                </Tabs>
                
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