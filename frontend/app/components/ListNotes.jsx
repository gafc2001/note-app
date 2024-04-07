import {Tabs,Tab} from 'react-bootstrap';
import { Note } from './Note';

import styles from '../page.module.css';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FormNote } from './FormNote';

export const ListNotes = () => {
 
    const {notes,setModal} = useContext(AppContext);

    const handleClickOpenForm = () => {
        setModal({
            title : "Create note",
            body : <FormNote/>,
            show : true,
        })

    }

    return (
        <div className={styles["main-container"]}>
            <Tabs
                defaultActiveKey="notes"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="notes" title="Notes">
                    <div className='p-4'>
                        {notes
                            .filter( n => n.isActive)
                            .map((note,ind) => 
                            <Note note={note} key={ind}/>
                        )}
                    </div>
                </Tab>
                <Tab eventKey="archive_notes" title="Archive">
                    <div className='p-4'>
                        {notes
                            .filter( n => !n.isActive)
                            .map((note,ind) => 
                            <Note note={note} key={ind}/>
                        )}
                    </div>
                </Tab>
            </Tabs>
            
            <span className={styles["btn-add"]} onClick={handleClickOpenForm}>+</span>
        </div>
    )

}