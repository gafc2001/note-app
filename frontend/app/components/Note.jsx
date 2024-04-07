import {Dropdown,DropdownButton} from 'react-bootstrap';
import { FormNote } from './FormNote';
import { useContext, useState } from 'react';
import { archiveNoteById, deleteNoteById } from '../services/notes';
import { AppContext } from '../context/AppContext';
export const Note = ({note}) => {

    const {setModal,setNotes} = useContext(AppContext);

    const handleEdit = () => {
        setModal({
            title : "Edit note",
            body : <FormNote data={note}/>,
            show : true
        })
    }
    const handleArchive = async (id) => {
        await archiveNoteById(id);
        setNotes(prev => {
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
        setNotes(prev => {
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
        </div>
    )
}