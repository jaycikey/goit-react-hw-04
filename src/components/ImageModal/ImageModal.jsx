import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';

Modal.setAppElement('#root');

export const ImageModal = ({ isOpen, onRequestClose, imageSrc }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        },
      }}
    >
      <div className={styles.modalOverlay} onClick={onRequestClose}>
        {!isImageLoaded && <Loader />}
        <img
          src={imageSrc}
          alt="Expanded view"
          className={styles.modalContent}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => onRequestClose()}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
      </div>
    </Modal>
  );
};
