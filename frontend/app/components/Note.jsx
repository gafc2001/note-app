import {Dropdown,DropdownButton} from 'react-bootstrap';
import { ModalApp } from './ModalApp';
import { FormNote } from './FormNote';
import { useState } from 'react';
import { httpClient } from '../services/httpClient';
import { archiveNoteById, deleteNoteById } from '../services/notes';
export const Note = ({note,afterSend,setData}) => {

    const [isOpen,setIsOpen] = useState(false);


    const handleClickOpenForm = () => {
        setIsOpen(true);
    }

    const handleEdit = () => {
        setIsOpen(true);
    }
    const handleArchive = async (id) => {
        await archiveNoteById(id);
        setData(prev => {
            const index = prev.findIndex( n => n.id === id);
            prev[index] = {
                ...prev[index],
                isActive : !prev[index].isActive
            }
            return [
                ...prev
            ]
        });

    }
    const handleDelete = async (id) => {
        await deleteNoteById(id);
        setData(prev => {
            return prev.filter( n => n.id !== id)
        })
    }

    return(
        <div>
            <div className='note-item mb-2 position-relative' style={{backgroundColor : note.color}}>
                <DropdownButton id="dropdown-basic-button" title="" size="sm" className="note-options" variant="dark">
                    {note.isActive 
                    ?<>
                    <Dropdown.Item onClick={handleEdit}>🖊️Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleArchive(note.id)}>📥Archive</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(note.id)}>🗑️Delete</Dropdown.Item>
                    </>
                    :<Dropdown.Item onClick={() => handleArchive(note.id)}>📤Unarchive</Dropdown.Item>}
                </DropdownButton>
                {note.text}
            </div>
            <ModalApp
                title="Create note"
                body={<FormNote afterSend={afterSend} data={note}/>}
                show={isOpen}
                setShow={setIsOpen}
            />
        </div>
    )
}