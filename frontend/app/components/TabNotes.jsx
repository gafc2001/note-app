import {Tabs,Tab,Badge} from 'react-bootstrap';
import { Note } from './Note';

import styles from '../page.module.css';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FormNote } from './FormNote';
import { ListNotes } from './ListNotes';

export const TabNotes = () => {
 
    const {setModal} = useContext(AppContext);

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
                    <ListNotes active={true}/>
                </Tab>
                <Tab eventKey="archive_notes" title="Archive">
                    <ListNotes active={false}/>
                </Tab>
            </Tabs>
            
            <span className={styles["btn-add"]} onClick={handleClickOpenForm}>+</span>
        </div>
    )

}