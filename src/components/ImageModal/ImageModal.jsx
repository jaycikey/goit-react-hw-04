import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';

Modal.setAppElement('#root');

export const ImageModal = ({ isOpen, onRequestClose, imageSrc }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          inset: 0,
          border: 'none',
          background: 'transparent',
          overflow: 'auto',
          borderRadius: '0',
          padding: '0',
          margin: '0 auto',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000,
        },
      }}
    >
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        {!isImageLoaded && <Loader />}
        <img
          src={imageSrc}
          alt="Expanded view"
          className={styles.modalContent}
          onLoad={handleImageLoaded}
          onError={onRequestClose}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
      </div>
    </Modal>
  );
};
