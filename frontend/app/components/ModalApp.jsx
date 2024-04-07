import { useContext } from 'react';
import {Modal,Button} from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

export const ModalApp = ({
    title,
    body,
    show,
}) => {
    
    const {setModal} = useContext(AppContext);


    const handleClose = () => {
        setModal( prev => {
            return {
                ...prev,
                show : false,
            }
        })
    }


    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    )

}