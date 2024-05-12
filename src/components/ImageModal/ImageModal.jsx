import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({image, isOpen, onClose}) {

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none'
  }
};

const modalOverlayStyles = {
  base: css.imageModalOverlay,
  afterOpen: css.imageModalOverlayAfterOpen,
  beforeClose: css.imageModalOverlayBeforeClose
}  

    return (
        <Modal
        style={modalStyles}
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={onClose}
        overlayClassName={modalOverlayStyles}
        closeTimeoutMS={500}
        >
            {image &&  <img src={image.urls.regular} />}
        </Modal>
    );
};