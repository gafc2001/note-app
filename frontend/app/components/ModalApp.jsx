import {Modal,Button} from 'react-bootstrap';

export const ModalApp = ({
    title,
    body,
    footer,
    show,
    setShow,
}) => {
    
    const handleClose = () => {
        setShow(false)
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